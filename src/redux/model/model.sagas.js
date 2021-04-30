import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { setItemsCount, updatePagination } from '../table/table.actions';

import {
  setModels,
  setModelLoading,
  setModel,
  setModelError,
  removeModelFromStore
} from './model.actions';

import {
  getAllModels,
  deleteModel,
  createModel,
  updateModel,
  getModelById
} from './model.operations';

import {
  GET_MODELS,
  DELETE_MODEL,
  ADD_MODEL,
  UPDATE_MODEL,
  GET_MODEL
} from './model.types';

import { config } from '../../configs';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';

import { AUTH_ERRORS } from '../../error-messages/auth';
import { handleAdminLogout } from '../auth/auth.sagas';

const { routes } = config;

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = config.statuses;

export function* handleModelsLoad({ payload }) {
  try {
    yield put(setModelLoading(true));
    const models = yield call(getAllModels, payload.skip, payload.limit);
    yield put(setItemsCount(models.count));
    yield put(setModels(models.items));
    yield put(setModelLoading(false));
  } catch (error) {
    yield call(handleModelError, error);
  }
}

export function* handleModelLoad({ payload }) {
  try {
    yield put(setModelLoading(true));
    const model = yield call(getModelById, payload);
    yield put(setModel(model));
    yield put(setModelLoading(false));
  } catch (error) {
    yield call(handleModelError, error);
  }
}

export function* handleAddModel({ payload }) {
  try {
    yield put(setModelLoading(true));
    yield call(createModel, payload);
    yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
    yield put(push(routes.pathToModels));
  } catch (error) {
    yield call(handleModelError, error);
  }
}

export function* handleModelDelete({ payload }) {
  try {
    yield put(setModelLoading(true));
    yield call(deleteModel, payload);
    yield put(removeModelFromStore(payload));
    yield put(updatePagination());
    yield put(setModelLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (error) {
    yield call(handleModelError, error);
  }
}

export function* handleModelUpdate({ payload }) {
  try {
    yield put(setModelLoading(true));
    yield call(updateModel, payload);
    yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
    yield put(push(routes.pathToModels));
  } catch (error) {
    yield call(handleModelError, error);
  }
}

export function* handleModelError(e) {
  if (e.message === AUTH_ERRORS.REFRESH_TOKEN_IS_NOT_VALID) {
    yield call(handleAdminLogout);
  } else {
    yield put(setModelLoading(false));
    yield put(setModelError({ e }));
    yield call(handleErrorSnackbar, e.message);
  }
}

export default function* modelSaga() {
  yield takeEvery(GET_MODELS, handleModelsLoad);
  yield takeEvery(DELETE_MODEL, handleModelDelete);
  yield takeEvery(GET_MODEL, handleModelLoad);
  yield takeEvery(ADD_MODEL, handleAddModel);
  yield takeEvery(UPDATE_MODEL, handleModelUpdate);
}
