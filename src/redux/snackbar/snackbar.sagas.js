import { put, takeEvery } from 'redux-saga/effects';
import {
  setSnackBarMessage,
  setSnackBarStatus,
  setSnackBarSeverity
} from './snackbar.actions';
import { SHOW_ERROR_SNACKBAR, SHOW_SUCCESS_SNACKBAR } from './snackbar.types';

export function* handleSuccessSnackbar(message) {
  yield put(setSnackBarSeverity('success'));
  yield put(setSnackBarMessage(message?.payload || message));
  yield put(setSnackBarStatus(true));
}

export function* handleErrorSnackbar(message) {
  yield put(setSnackBarSeverity('error'));
  yield put(setSnackBarMessage(message?.payload || message));
  yield put(setSnackBarStatus(true));
}

export default function* snackbarSaga() {
  yield takeEvery(SHOW_ERROR_SNACKBAR, handleSuccessSnackbar);
  yield takeEvery(SHOW_SUCCESS_SNACKBAR, handleErrorSnackbar);
}
