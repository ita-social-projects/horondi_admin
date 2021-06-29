import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { setItemsCount, updatePagination } from '../table/table.actions';
import {
  setBacks,
  setBackLoading,
  setBack,
  setBackError,
  removeBackFromStore
} from './back.actions';

import {
  getAllBacks,
  deleteBack,
  createBack,
  updateBack,
  getBackById
} from './back.operations';

import {
  GET_BACKS,
  DELETE_BACK,
  ADD_BACK,
  UPDATE_BACK,
  GET_BACK
} from './back.types';

import { config } from '../../configs';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';
import { AUTH_ERRORS } from '../../error-messages/auth';
import { handleAdminLogout } from '../auth/auth.sagas';

const { SUCCESS_ADD_STATUS, SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } =
  config.statuses;

export function* handleBacksLoad({ payload: { limit, skip, filter } }) {
  try {
    yield put(setBackLoading(true));
    const patterns = yield call(getAllBacks, limit, skip, filter);
    yield put(setItemsCount(patterns?.count));
    yield put(setBacks(patterns?.items));
    yield put(setBackLoading(false));
  } catch (error) {
    yield call(handleBackError, error);
  }
}

export function* handleBackLoad({ payload }) {
  try {
    yield put(setBackLoading(true));
    const pattern = yield call(getBackById, payload);
    yield put(setBack(pattern));
    yield put(setBackLoading(false));
  } catch (error) {
    yield call(handleBackError, error);
  }
}

export function* handleAddBack({ payload }) {
  try {
    yield put(setBackLoading(true));
    yield call(createBack, payload);
    yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
    yield put(push(config.routes.pathToPatterns));
  } catch (error) {
    yield call(handleBackError, error);
  }
}

export function* handleBackDelete({ payload }) {
  try {
    yield put(setBackLoading(true));
    yield call(deleteBack, payload);
    yield put(removeBackFromStore(payload));
    yield put(updatePagination());
    yield put(setBackLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (error) {
    yield call(handleBackError, error);
  }
}

export function* handleBackUpdate({ payload }) {
  try {
    yield put(setBackLoading(true));
    yield call(updateBack, payload);
    yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
    yield put(push(config.routes.pathToPatterns));
  } catch (error) {
    yield call(handleBackError, error);
  }
}

export function* handleBackError(e) {
  if (e.message === AUTH_ERRORS.REFRESH_TOKEN_IS_NOT_VALID) {
    yield call(handleAdminLogout);
  } else {
    yield put(setBackLoading(false));
    yield put(setBackError({ e }));
    yield call(handleErrorSnackbar, e.message);
  }
}

export default function* patternSaga() {
  yield takeEvery(GET_BACKS, handleBacksLoad);
  yield takeEvery(DELETE_BACK, handleBackDelete);
  yield takeEvery(GET_BACK, handleBackLoad);
  yield takeEvery(ADD_BACK, handleAddBack);
  yield takeEvery(UPDATE_BACK, handleBackUpdate);
}
