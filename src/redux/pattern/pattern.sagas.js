import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
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

import { config, routes } from '../../configs';

import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../snackbar/snackbar.actions';
import {
  GET_PATTERNS,
  DELETE_PATTERN,
  ADD_PATTERN,
  UPDATE_PATTERN,
  GET_PATTERN
} from './pattern.types';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = config.statuses;

function* handlePatternsLoad() {
  try {
    yield put(setPatternLoading(true));
    const patterns = yield call(getAllPatterns, null);
    yield put(setPatterns(patterns));
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

function* handleAddPattern({ payload }) {
  try {
    yield put(setPatternLoading(true));
    yield call(createPattern, payload);
    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_ADD_STATUS));
    yield put(setSnackBarStatus(true));
    yield put(push(routes.pathToPatterns));
  } catch (error) {
    yield call(handlePatternError, error);
  }
}

function* handlePatternDelete({ payload }) {
  try {
    yield put(setPatternLoading(true));
    yield call(deletePattern, payload);
    yield put(removePatternFromStore(payload));
    yield put(setPatternLoading(false));
    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_DELETE_STATUS));
    yield put(setSnackBarStatus(true));
  } catch (error) {
    yield call(handlePatternError, error);
  }
}

function* handlePatternUpdate({ payload }) {
  const { id, pattern } = payload;
  try {
    yield put(setPatternLoading(true));
    yield call(updatePattern, id, pattern);
    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_UPDATE_STATUS));
    yield put(setSnackBarStatus(true));
    yield put(push(routes.pathToPatterns));
  } catch (error) {
    yield call(handlePatternError, error);
  }
}

function* handlePatternError(e) {
  yield put(setPatternLoading(false));
  yield put(setPatternError({ e }));
  yield put(setSnackBarSeverity('error'));
  yield put(setSnackBarMessage(e.message));
  yield put(setSnackBarStatus(true));
}

export default function* patternSaga() {
  yield takeEvery(GET_PATTERN, handlePatternLoad);
  yield takeEvery(GET_PATTERNS, handlePatternsLoad);
  yield takeEvery(DELETE_PATTERN, handlePatternDelete);
  yield takeEvery(ADD_PATTERN, handleAddPattern);
  yield takeEvery(UPDATE_PATTERN, handlePatternUpdate);
}
