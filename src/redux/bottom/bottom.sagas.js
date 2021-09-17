import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { setItemsCount, updatePagination } from '../table/table.actions';
import {
  setBottoms,
  setBottomLoading,
  setBottom,
  setBottomError,
  removeBottomFromStore
} from './bottom.actions';

import {
  getAllBottoms,
  deleteBottom,
  createBottom,
  updateBottom,
  getBottomById
} from './bottom.operations';

import {
  GET_BOTTOMS,
  DELETE_BOTTOM,
  ADD_BOTTOM,
  UPDATE_BOTTOM,
  GET_BOTTOM
} from './bottom.types';

import { config } from '../../configs';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';
import { AUTH_ERRORS } from '../../error-messages/auth';
import { handleAdminLogout } from '../auth/auth.sagas';

const { SUCCESS_ADD_STATUS, SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } =
  config.statuses;

export function* handleBottomsLoad({ payload: { limit, skip, filter } }) {
  try {
    yield put(setBottomLoading(true));
    const bottoms = yield call(getAllBottoms, limit, skip, filter);
    yield put(setItemsCount(bottoms?.count));
    yield put(setBottoms(bottoms?.items));
    yield put(setBottomLoading(false));
  } catch (error) {
    yield call(handleBottomError, error);
  }
}

export function* handleBottomLoad({ payload }) {
  try {
    yield put(setBottomLoading(true));
    const bottom = yield call(getBottomById, payload);
    yield put(setBottom(bottom));
    yield put(setBottomLoading(false));
  } catch (error) {
    yield call(handleBottomError, error);
  }
}

export function* handleAddBottom({ payload }) {
  try {
    yield put(setBottomLoading(true));
    yield call(createBottom, payload);
    yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
    yield put(push(config.routes.pathToBottoms));
    yield put(setBottomLoading(false));
  } catch (error) {
    yield call(handleBottomError, error);
  }
}

export function* handleBottomDelete({ payload }) {
  try {
    yield put(setBottomLoading(true));
    yield call(deleteBottom, payload);
    yield put(removeBottomFromStore(payload));
    yield put(updatePagination());
    yield put(setBottomLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (error) {
    yield call(handleBottomError, error);
  }
}

export function* handleBottomUpdate({ payload }) {
  try {
    yield put(setBottomLoading(true));
    yield call(updateBottom, payload);
    yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
    yield put(push(config.routes.pathToBottoms));
    yield put(setBottomLoading(false));
  } catch (error) {
    yield call(handleBottomError, error);
  }
}

export function* handleBottomError(e) {
  if (e.message === AUTH_ERRORS.REFRESH_TOKEN_IS_NOT_VALID) {
    yield call(handleAdminLogout);
  } else {
    yield put(setBottomLoading(false));
    yield put(setBottomError({ e }));
    yield call(handleErrorSnackbar, e.message);
  }
}

export default function* bottomSaga() {
  yield takeEvery(GET_BOTTOMS, handleBottomsLoad);
  yield takeEvery(DELETE_BOTTOM, handleBottomDelete);
  yield takeEvery(GET_BOTTOM, handleBottomLoad);
  yield takeEvery(ADD_BOTTOM, handleAddBottom);
  yield takeEvery(UPDATE_BOTTOM, handleBottomUpdate);
}
