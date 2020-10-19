import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  setModels,
  setModelLoading,
  setModel,
  setModelError,
  setPagesCount,
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
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../snackbar/snackbar.actions';

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
    yield put(setPagesCount(Math.ceil(models.count / payload.modelsPerPage)));
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
    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_ADD_STATUS));
    yield put(setSnackBarStatus(true));
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
    yield put(setModelLoading(false));
    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_DELETE_STATUS));
    yield put(setSnackBarStatus(true));
  } catch (error) {
    yield call(handleModelError, error);
  }
}

export function* handleModelUpdate({ payload }) {
  try {
    yield put(setModelLoading(true));
    yield call(updateModel, payload);
    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_UPDATE_STATUS));
    yield put(setSnackBarStatus(true));
    yield put(push(routes.pathToModels));
  } catch (error) {
    yield call(handleModelError, error);
  }
}

function* handleModelError(e) {
  yield put(setModelLoading(false));
  yield put(setModelError({ e }));
  yield put(setSnackBarSeverity('error'));
  yield put(setSnackBarMessage(e.message));
  yield put(setSnackBarStatus(true));
}

export default function* modelSaga() {
  yield takeEvery(GET_MODELS, handleModelsLoad);
  yield takeEvery(DELETE_MODEL, handleModelDelete);
  yield takeEvery(GET_MODEL, handleModelLoad);
  yield takeEvery(ADD_MODEL, handleAddModel);
  yield takeEvery(UPDATE_MODEL, handleModelUpdate);
}
