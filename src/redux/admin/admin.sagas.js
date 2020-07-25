import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { setAuth, setAdminError, setAdminLoading } from './admin.actions';
import { loginAdmin, getUserByToken } from './admin.operations';
import { LOGIN_ADMIN, CHECK_ADMIN_BY_TOKEN, LOGOUT_ADMIN } from './admin.types';

function* handleAdminLoad({ payload }) {
  try {
    yield put(setAdminLoading(true));
    const admin = yield call(loginAdmin, payload);
    localStorage.setItem('authToken', admin.token); // authToken
    yield put(setAuth(true));
    yield put(setAdminLoading(false));
    yield put(push('/'));
  } catch (error) {
    yield put(setAdminError(error));
  }
}

function* handleAdminCheckByToken({ payload }) {
  try {
    yield put(setAdminLoading(true));
    yield call(getUserByToken, payload);
    yield put(setAuth(true));
    yield put(setAdminLoading(false));
  } catch (error) {
    yield put(setAuth(false));
    yield localStorage.removeItem('authToken');
    yield put(push('/'));
  }
}

function* handleAdminLogout() {
  yield localStorage.removeItem('authToken');
  yield put(setAuth(false));
  yield put(push('/'));
}

export default function* adminSaga() {
  yield takeEvery(LOGIN_ADMIN, handleAdminLoad);
  yield takeEvery(CHECK_ADMIN_BY_TOKEN, handleAdminCheckByToken);
  yield takeEvery(LOGOUT_ADMIN, handleAdminLogout);
}
