import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { setItemsCount, updatePagination } from '../table/table.actions';

import {
  setMaterials,
  setMaterial,
  setMaterialError,
  setMaterialLoading,
  removeMaterialFromStore,
  clearColors,
  setMaterialColors,
  setMaterialColor,
  getMaterialColors,
  removeMaterialColorFromStore
} from './material.actions';
// eslint-disable-next-line import/no-cycle
import {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterialColorsById,
  getMaterialColorByCode,
  createMaterialColor,
  deleteMaterialColor
} from './material.operations';

import {
  GET_MATERIAL,
  GET_MATERIALS,
  DELETE_MATERIAL,
  ADD_MATERIAL,
  UPDATE_MATERIAL,
  GET_MATERIALS_COLORS,
  GET_MATERIALS_COLOR,
  ADD_MATERIAL_COLOR,
  DELETE_MATERIAL_COLOR
} from './material.types';

import { config } from '../../configs';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = config.statuses;

export function* handleMaterialsLoad({ payload: { skip, limit } }) {
  try {
    yield put(setMaterialLoading(true));
    const materials = yield call(getAllMaterials, skip, limit);
    yield put(setItemsCount(materials.count));
    yield put(setMaterials(materials.items));
    yield put(setMaterialLoading(false));
  } catch (error) {
    yield call(handleMaterialError, error);
  }
}

export function* handleMaterialLoad({ payload }) {
  try {
    yield put(setMaterialLoading(true));
    const material = yield call(getMaterialById, payload);
    yield put(setMaterial(material));
    yield put(setMaterialLoading(false));
  } catch (error) {
    yield call(handleMaterialError, error);
  }
}

export function* handleMaterialColorsLoad({ payload }) {
  try {
    yield put(setMaterialLoading(true));
    const colors = yield call(getMaterialColorsById, payload);
    yield put(setMaterialColors(colors));
    yield put(setMaterialLoading(false));
  } catch (error) {
    yield call(handleMaterialError, error);
  }
}
export function* handleMaterialColorLoad({ payload }) {
  try {
    yield put(setMaterialLoading(true));
    const color = yield call(getMaterialColorByCode, payload);
    yield put(setMaterialColor(color));
    yield put(setMaterialLoading(false));
  } catch (error) {
    yield call(handleMaterialError, error);
  }
}
export function* handleAddMaterial({ payload }) {
  try {
    yield put(setMaterialLoading(true));
    yield call(createMaterial, payload);
    yield put(clearColors());
    yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
    yield put(push(config.routes.pathToMaterials));
  } catch (error) {
    yield call(handleMaterialError, error);
  }
}
export function* handleAddMaterialColor({ payload }) {
  try {
    yield put(setMaterialLoading(true));
    yield call(createMaterialColor, payload);
    yield put(clearColors());
    yield put(setMaterialLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
    yield put(getMaterialColors(payload.id));
  } catch (error) {
    yield call(handleMaterialError, error);
  }
}

export function* handleMaterialDelete({ payload }) {
  try {
    yield put(setMaterialLoading(true));
    yield call(deleteMaterial, payload);
    yield put(setMaterialLoading(false));
    yield put(removeMaterialFromStore(payload));
    yield put(updatePagination());
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (error) {
    yield call(handleMaterialError, error);
  }
}

export function* handleMaterialColorDelete({ payload }) {
  try {
    yield put(setMaterialLoading(true));
    yield call(deleteMaterialColor, payload);
    yield put(setMaterialLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
    yield put(removeMaterialColorFromStore(payload.code));
  } catch (error) {
    yield call(handleMaterialError, error);
  }
}

export function* handleMaterialUpdate({ payload }) {
  const { id, material, images } = payload;
  try {
    yield put(setMaterialLoading(true));
    yield call(updateMaterial, id, material, images);
    yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
    yield put(push(config.routes.pathToMaterials));
  } catch (error) {
    yield call(handleMaterialError, error);
  }
}

export function* handleMaterialError(e) {
  yield put(setMaterialLoading(false));
  yield put(setMaterialError({ e }));
  yield call(handleErrorSnackbar, e.message);
}

export default function* materialSaga() {
  yield takeEvery(GET_MATERIALS, handleMaterialsLoad);
  yield takeEvery(DELETE_MATERIAL, handleMaterialDelete);
  yield takeEvery(GET_MATERIAL, handleMaterialLoad);
  yield takeEvery(ADD_MATERIAL, handleAddMaterial);
  yield takeEvery(ADD_MATERIAL_COLOR, handleAddMaterialColor);
  yield takeEvery(UPDATE_MATERIAL, handleMaterialUpdate);
  yield takeEvery(GET_MATERIALS_COLORS, handleMaterialColorsLoad);
  yield takeEvery(GET_MATERIALS_COLOR, handleMaterialColorLoad);
  yield takeEvery(DELETE_MATERIAL_COLOR, handleMaterialColorDelete);
}
