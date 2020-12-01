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
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';

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
    yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
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
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (error) {
    yield call(handleHeaderError, error);
  }
}

export function* handleHeaderUpdate({ payload }) {
  try {
    yield put(setHeaderLoading(true));
    yield call(updateHeader, payload);
    yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
    yield put(push(routes.pathToHeaders));
  } catch (error) {
    yield call(handleHeaderError, error);
  }
}

function* handleHeaderError(e) {
  yield put(setHeaderLoading(false));
  yield put(setHeaderError({ e }));
  yield call(handleErrorSnackbar, e.message);
}

export default function* headerSaga() {
  yield takeEvery(GET_HEADERS, handleHeadersLoad);
  yield takeEvery(DELETE_HEADER, handleHeaderDelete);
  yield takeEvery(GET_HEADER, handleHeaderLoad);
  yield takeEvery(ADD_HEADER, handleAddHeader);
  yield takeEvery(UPDATE_HEADER, handleHeaderUpdate);
}
