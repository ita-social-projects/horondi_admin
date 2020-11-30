import { put } from 'redux-saga/effects';
import {
  setSnackBarMessage,
  setSnackBarStatus,
  setSnackBarSeverity
} from './snackbar.actions';

export function* handleSuccessSnackbar(message) {
  yield put(setSnackBarSeverity('success'));
  yield put(setSnackBarMessage(message));
  yield put(setSnackBarStatus(true));
}

export function* handleErrorSnackbar(message) {
  yield put(setSnackBarSeverity('success'));
  yield put(setSnackBarMessage(message));
  yield put(setSnackBarStatus(true));
}
