import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  setHeaders,
  setHeaderLoading,
  setHeader,
  setHeaderError,
  removeHeaderFromStore
} from './header.actions';

import {
  getAllHeaders,
  deleteHeader,
  createHeader,
  updateHeader,
  getHeaderById
} from './header.operations';

import {
  GET_HEADERS,
  DELETE_HEADER,
  ADD_HEADER,
  UPDATE_HEADER,
  GET_HEADER
} from './header.types';

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

export function* handleHeadersLoad() {
  try {
    yield put(setHeaderLoading(true));
    const headers = yield call(getAllHeaders);
    yield put(setHeaders(headers));
    yield put(setHeaderLoading(false));
  } catch (error) {
    yield call(handleHeaderError, error);
  }
}

export function* handleHeaderLoad({ payload }) {
  try {
    yield put(setHeaderLoading(true));
    const header = yield call(getHeaderById, payload);
    yield put(setHeader(header));
    yield put(setHeaderLoading(false));
  } catch (error) {
    yield call(handleHeaderError, error);
  }
}

export function* handleAddHeader({ payload }) {
  try {
    yield put(setHeaderLoading(true));
    yield call(createHeader, payload);
    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_ADD_STATUS));
    yield put(setSnackBarStatus(true));
    yield put(push(routes.pathToHeaders));
  } catch (error) {
    yield call(handleHeaderError, error);
  }
}

export function* handleHeaderDelete({ payload }) {
  try {
    yield put(setHeaderLoading(true));
    yield call(deleteHeader, payload);
    yield put(removeHeaderFromStore(payload));
    yield put(setHeaderLoading(false));
    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_DELETE_STATUS));
    yield put(setSnackBarStatus(true));
  } catch (error) {
    yield call(handleHeaderError, error);
  }
}

export function* handleHeaderUpdate({ payload }) {
  try {
    yield put(setHeaderLoading(true));
    yield call(updateHeader, payload);
    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_UPDATE_STATUS));
    yield put(setSnackBarStatus(true));
    yield put(push(routes.pathToHeaders));
  } catch (error) {
    yield call(handleHeaderError, error);
  }
}

function* handleHeaderError(e) {
  yield put(setHeaderLoading(false));
  yield put(setHeaderError({ e }));
  yield put(setSnackBarSeverity('error'));
  yield put(setSnackBarMessage(e.message));
  yield put(setSnackBarStatus(true));
}

export default function* headerSaga() {
  yield takeEvery(GET_HEADERS, handleHeadersLoad);
  yield takeEvery(DELETE_HEADER, handleHeaderDelete);
  yield takeEvery(GET_HEADER, handleHeaderLoad);
  yield takeEvery(ADD_HEADER, handleAddHeader);
  yield takeEvery(UPDATE_HEADER, handleHeaderUpdate);
}
