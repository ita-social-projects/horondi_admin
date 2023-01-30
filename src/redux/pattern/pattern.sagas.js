import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { setItemsCount, updatePagination } from '../table/table.actions';
import {
  setPatterns,
  setPatternLoading,
  setPattern,
  setPatternError,
  removePatternFromStore
} from './pattern.actions';

import {
  getAllPatterns,
  deletePattern,
  createPattern,
  updatePattern,
  getPatternById
} from './pattern.operations';

import {
  GET_PATTERNS,
  DELETE_PATTERN,
  ADD_PATTERN,
  UPDATE_PATTERN,
  GET_PATTERN
} from './pattern.types';

import { config } from '../../configs';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';
import { AUTH_ERRORS } from '../../error-messages/auth';
import { handleAdminLogout } from '../auth/auth.sagas';

const { SUCCESS_ADD_STATUS, SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } =
  config.statuses;

export function* handlePatternsLoad({ payload: { limit, skip, filter } }) {
  try {
    yield put(setPatternLoading(true));
    const patterns = yield call(getAllPatterns, limit, skip, filter);
    yield put(setItemsCount(patterns?.count));
    yield put(setPatterns(patterns?.items));
    yield put(setPatternLoading(false));
  } catch (error) {
    yield call(handlePatternError, error);
  }
}

export function* handlePatternLoad({ payload }) {
  try {
    yield put(setPatternLoading(true));
    const pattern = yield call(getPatternById, payload);
    yield put(setPattern(pattern));
    yield put(setPatternLoading(false));
  } catch (error) {
    yield call(handlePatternError, error);
  }
}

export function* handleAddPattern({ payload }) {
  try {
    yield put(setPatternLoading(true));
    yield call(createPattern, payload);
    yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
    yield put(push(config.routes.pathToPatterns));
  } catch (error) {
    yield call(handlePatternError, error);
  }
}

export function* handlePatternDelete({ payload }) {
  try {
    yield put(setPatternLoading(true));
    yield call(deletePattern, payload);
    yield put(removePatternFromStore(payload));
    yield put(updatePagination());
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (error) {
    yield call(handlePatternError, error);
  } finally {
    yield put(setPatternLoading(false));
  }
}

export function* handlePatternUpdate({ payload }) {
  try {
    yield put(setPatternLoading(true));
    yield call(updatePattern, payload);
    yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
    yield put(push(config.routes.pathToPatterns));
  } catch (error) {
    yield call(handlePatternError, error);
  }
}

export function* handlePatternError(e) {
  if (e.message === AUTH_ERRORS.REFRESH_TOKEN_IS_NOT_VALID) {
    yield call(handleAdminLogout);
  } else {
    yield put(setPatternLoading(false));
    yield put(setPatternError({ e }));
    yield call(handleErrorSnackbar, e.message);
  }
}

export default function* patternSaga() {
  yield takeEvery(GET_PATTERNS, handlePatternsLoad);
  yield takeEvery(DELETE_PATTERN, handlePatternDelete);
  yield takeEvery(GET_PATTERN, handlePatternLoad);
  yield takeEvery(ADD_PATTERN, handleAddPattern);
  yield takeEvery(UPDATE_PATTERN, handlePatternUpdate);
}
