import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { setItemsCount, updatePagination } from '../table/table.actions';
import {
  setMaterials,
  setMaterial,
  setMaterialError,
  setMaterialLoading,
  removeMaterialFromStore,
  setMaterialsByPurpose
} from './material.actions';
import {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getAllMaterialsByPurpose
} from './material.operations';

import {
  GET_MATERIAL,
  GET_MATERIALS,
  DELETE_MATERIAL,
  ADD_MATERIAL,
  UPDATE_MATERIAL,
  GET_MATERIALS_BY_PURPOSE
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

export function* handleMaterialsByPurposeLoad({ payload }) {
  try {
    yield put(setMaterialLoading(true));
    const materialsByPurpose = yield call(getAllMaterialsByPurpose, payload);
    yield put(setMaterialsByPurpose(materialsByPurpose));
    yield put(setMaterialLoading(false));
  } catch (error) {
    yield call(handleMaterialError, error);
  }
}

export function* handleMaterialsLoad({ payload }) {
  const filter = {
    ...payload.filter,
    colors: payload.filter.colors.map((el) => el._id)
  };
  try {
    yield put(setMaterialLoading(true));
    const materials = yield call(
      getAllMaterials,
      filter,
      payload.skip,
      payload.limit
    );
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

export function* handleAddMaterial({ payload }) {
  try {
    yield put(setMaterialLoading(true));
    yield call(createMaterial, payload);
    yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
    yield put(push(config.routes.pathToMaterials));
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
  yield takeEvery(UPDATE_MATERIAL, handleMaterialUpdate);
  yield takeEvery(GET_MATERIALS_BY_PURPOSE, handleMaterialsByPurposeLoad);
}
