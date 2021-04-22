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
  getAllMaterialsByPatternPurpose
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
import { AUTH_ERRORS } from '../../error-messages/auth';
import { handleRefreshTokenPair } from '../auth/auth.sagas';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = config.statuses;

export function* handleMaterialsByPurposeLoad() {
  try {
    yield put(setMaterialLoading(true));
    const materialsByPurpose = yield call(getAllMaterialsByPatternPurpose);
    yield put(setMaterialsByPurpose(materialsByPurpose.pattern));
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

    if (materials?.message === AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID) {
      yield call(handleRefreshTokenPair);
      yield handleMaterialsLoad({ payload });
    } else {
      yield put(setItemsCount(materials.count));
      yield put(setMaterials(materials.items));
      yield put(setMaterialLoading(false));
    }
  } catch (error) {
    yield call(handleMaterialError, error);
  }
}

export function* handleMaterialLoad({ payload }) {
  try {
    yield put(setMaterialLoading(true));
    const material = yield call(getMaterialById, payload);
    if (material?.message === AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID) {
      yield call(handleRefreshTokenPair);
      yield handleMaterialLoad({ payload });
    } else {
      yield put(setMaterial(material));
      yield put(setMaterialLoading(false));
    }
  } catch (error) {
    yield call(handleMaterialError, error);
  }
}

export function* handleAddMaterial({ payload }) {
  try {
    yield put(setMaterialLoading(true));
    const newMaterial = yield call(createMaterial, payload);

    if (newMaterial?.message === AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID) {
      yield call(handleRefreshTokenPair);
      yield handleAddMaterial({ payload });
    } else {
      yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
      yield put(push(config.routes.pathToMaterials));
    }
  } catch (error) {
    yield call(handleMaterialError, error);
  }
}

export function* handleMaterialDelete({ payload }) {
  try {
    yield put(setMaterialLoading(true));
    const deletedMaterial = yield call(deleteMaterial, payload);

    if (deletedMaterial?.message === AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID) {
      yield call(handleRefreshTokenPair);
      yield handleMaterialDelete({ payload });
    } else {
      yield put(setMaterialLoading(false));
      yield put(removeMaterialFromStore(payload));
      yield put(updatePagination());
      yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
    }
  } catch (error) {
    yield call(handleMaterialError, error);
  }
}

export function* handleMaterialUpdate({ payload }) {
  const { id, material } = payload;
  try {
    yield put(setMaterialLoading(true));
    const updatedMaterial = yield call(updateMaterial, id, material);

    if (updatedMaterial?.message === AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID) {
      yield call(handleRefreshTokenPair);
      yield handleMaterialUpdate({ payload });
    } else {
      yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
      yield put(push(config.routes.pathToMaterials));
    }
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
