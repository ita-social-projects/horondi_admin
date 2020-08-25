import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { setAuth, setAuthError, setAuthLoading } from './auth.actions';
import { loginAdmin, getUserByToken } from './auth.operations';
import { LOGIN_USER, CHECK_USER_BY_TOKEN, LOGOUT_USER } from './auth.types';
import {
  setToLocalStorage,
  getFromLocalStorage,
  clearLocalStorage
} from '../../services/local-storage.service';

function* handleAdminLoad({ payload }) {
  try {
    yield put(setAuthLoading(true));
    const admin = yield call(loginAdmin, payload);
    setToLocalStorage('HORONDI_AUTH_TOKEN', admin.token);
    yield put(setAuth(true));
    yield put(push('/news'));
    yield put(setAuthLoading(false));
  } catch (error) {
    yield put(setAuthLoading(false));
    yield put(setAuthError(error));
  }
}

function* handleAdminCheckByToken() {
  try {
    const authToken = getFromLocalStorage('HORONDI_AUTH_TOKEN');
    yield put(setAuthLoading(true));
    if (!authToken) {
      yield put(setAuthLoading(false));
      yield put(setAuth(false));
      yield put(push('/'));
      return;
    }
    yield call(getUserByToken, authToken);
    yield put(setAuth(true));
    yield put(setAuthLoading(false));
  } catch (error) {
    yield put(setAuthLoading(false));
    yield put(setAuth(false));
    clearLocalStorage();
    yield put(push('/'));
  }
}

function* handleAdminLogout() {
  clearLocalStorage();
  yield put(setAuth(false));
  yield put(push('/'));
}

export default function* authSaga() {
  yield takeEvery(LOGIN_USER, handleAdminLoad);
  yield takeEvery(CHECK_USER_BY_TOKEN, handleAdminCheckByToken);
  yield takeEvery(LOGOUT_USER, handleAdminLogout);
}
