import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  setAuth,
  setAuthError,
  setAuthLoading,
  setAdminId
} from './auth.actions';
import { loginAdmin, getUserByToken } from './auth.operations';
import { LOGIN_USER, CHECK_USER_BY_TOKEN, LOGOUT_USER } from './auth.types';
import { config } from '../../configs';
import {
  setToLocalStorage,
  getFromLocalStorage
} from '../../services/local-storage.service';
import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../snackbar/snackbar.actions';

const { LOGIN_PAGE_STATUS } = config.statuses;

export function* handleAdminLoad({ payload }) {
  try {
    yield put(setAuthLoading(true));
    const admin = yield call(loginAdmin, payload);
    setToLocalStorage('HORONDI_AUTH_TOKEN', admin.token);

    yield put(setAdminId(admin._id));
    yield put(setAuth(true));
    yield put(push('/stats'));
    yield put(setAuthLoading(false));
  } catch (error) {
    yield put(setAuthLoading(false));
    yield put(setAuthError(error));
    yield put(setSnackBarSeverity('error'));
    yield put(setSnackBarMessage(LOGIN_PAGE_STATUS));
    yield put(setSnackBarStatus(true));
  }
}

export function* handleAdminCheckByToken() {
  try {
    const authToken = getFromLocalStorage('HORONDI_AUTH_TOKEN');
    yield put(setAuthLoading(true));
    if (!authToken) {
      yield put(setAuthLoading(false));
      yield put(setAuth(false));
      return;
    }
    const admin = yield call(getUserByToken, authToken);

    yield put(setAdminId(admin._id));
    yield put(setAuth(true));
    yield put(setAuthLoading(false));
  } catch (error) {
    console.error(error);
    yield put(setAuthLoading(false));
    yield put(setAuth(false));
    setToLocalStorage('HORONDI_AUTH_TOKEN', null);
    yield put(push('/'));
  }
}

export function* handleAdminLogout() {
  setToLocalStorage('HORONDI_AUTH_TOKEN', null);
  yield put(setAuth(false));
  yield put(push('/'));
}

export default function* authSaga() {
  yield takeEvery(LOGIN_USER, handleAdminLoad);
  yield takeEvery(CHECK_USER_BY_TOKEN, handleAdminCheckByToken);
  yield takeEvery(LOGOUT_USER, handleAdminLogout);
}
