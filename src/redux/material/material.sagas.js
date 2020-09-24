import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  setMaterials,
  setMaterial,
  setMaterialError,
  setMaterialsPagesCount,
  setMaterialLoading,
  removeMaterialFromStore,
  clearColors
} from './material.actions';
import {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial
} from './material.operations';

import {
  GET_MATERIAL,
  GET_MATERIALS,
  DELETE_MATERIAL,
  ADD_MATERIAL,
  UPDATE_MATERIAL
} from './material.types';

import { config, routes } from '../../configs';

import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../snackbar/snackbar.actions';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = config.statuses;

const { skip, limit, materialsPerPage } = config.materialPaginationPayload;

export function* handleMaterialsLoad({
  payload = {
    skip,
    limit,
    materialsPerPage
  }
}) {
  try {
    yield put(setMaterialLoading(true));
    const materials = yield call(getAllMaterials, payload.skip, payload.limit);
    yield put(
      setMaterialsPagesCount(
        Math.ceil(materials.count / payload.materialsPerPage)
      )
    );
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

function* handleAddMaterial({ payload }) {
  try {
    yield put(setMaterialLoading(true));
    yield call(createMaterial, payload);
    yield put(clearColors());
    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_ADD_STATUS));
    yield put(setSnackBarStatus(true));
    yield put(push(routes.pathToMaterials));
  } catch (error) {
    yield call(handleMaterialError, error);
  }
}

function* handleMaterialDelete({ payload }) {
  try {
    yield put(setMaterialLoading(true));
    yield call(deleteMaterial, payload);
    yield put(setMaterialLoading(false));
    yield put(removeMaterialFromStore(payload));
    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_DELETE_STATUS));
    yield put(setSnackBarStatus(true));
  } catch (error) {
    yield call(handleMaterialError, error);
  }
}

export function* handleMaterialUpdate({ payload }) {
  const { id, newMaterial } = payload;
  try {
    yield put(setMaterialLoading(true));
    yield call(updateMaterial, id, newMaterial);
    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_UPDATE_STATUS));
    yield put(setSnackBarStatus(true));
    yield put(push(routes.pathToMaterials));
  } catch (error) {
    yield call(handleMaterialError, error);
  }
}

function* handleMaterialError(e) {
  yield put(setMaterialLoading(false));
  yield put(setMaterialError({ e }));
  yield put(setSnackBarSeverity('error'));
  yield put(setSnackBarMessage(e.message));
  yield put(setSnackBarStatus(true));
}

export default function* newsSaga() {
  yield takeEvery(GET_MATERIALS, handleMaterialsLoad);
  yield takeEvery(DELETE_MATERIAL, handleMaterialDelete);
  yield takeEvery(GET_MATERIAL, handleMaterialLoad);
  yield takeEvery(ADD_MATERIAL, handleAddMaterial);
  yield takeEvery(UPDATE_MATERIAL, handleMaterialUpdate);
}
