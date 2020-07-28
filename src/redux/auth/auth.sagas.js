import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { setAuth, setAuthError, setAuthLoading } from './auth.actions';
import { loginAdmin, getUserByToken } from './auth.operations';
import { LOGIN_USER, CHECK_USER_BY_TOKEN, LOGOUT_USER } from './auth.types';

function* handleAdminLoad({ payload }) {
  try {
    yield put(setAuthLoading(true));
    const admin = yield call(loginAdmin, payload);
    localStorage.setItem('HORONDI_AUTH_TOKEN', admin.token);
    yield put(setAuth(true));
    yield put(push('/'));
    yield put(setAuthLoading(false));
  } catch (error) {
    yield put(setAuthLoading(false));
    yield put(setAuthError(error));
  }
}

function* handleAdminCheckByToken() {
  try {
    const authToken = localStorage.getItem('HORONDI_AUTH_TOKEN');
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
    localStorage.removeItem('HORONDI_AUTH_TOKEN');
    yield put(push('/'));
  }
}

function* handleAdminLogout() {
  localStorage.removeItem('HORONDI_AUTH_TOKEN');
  yield put(setAuth(false));
  yield put(push('/'));
}

export default function* authSaga() {
  yield takeEvery(LOGIN_USER, handleAdminLoad);
  yield takeEvery(CHECK_USER_BY_TOKEN, handleAdminCheckByToken);
  yield takeEvery(LOGOUT_USER, handleAdminLogout);
}
