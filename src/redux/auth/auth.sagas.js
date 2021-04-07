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
import { handleErrorSnackbar } from '../snackbar/snackbar.sagas';
import routes from '../../configs/routes';

const { LOGIN_PAGE_STATUS } = config.statuses;
const { pathToMainPage, pathToLogin } = routes;

export function* handleAdminLoad({ payload }) {
  try {
    yield put(setAuthLoading(true));
    const admin = yield call(loginAdmin, payload);
    setToLocalStorage('HORONDI_AUTH_TOKEN', admin.token);

    yield put(setAdminId(admin._id));
    yield put(setAuth(true));
    yield put(push(pathToMainPage));
    yield put(setAuthLoading(false));
  } catch (error) {
    yield put(setAuthLoading(false));
    yield put(setAuthError(error));
    yield call(handleErrorSnackbar, LOGIN_PAGE_STATUS);
  }
}

export function* handleAdminCheckByToken() {
  try {
    const authToken = getFromLocalStorage('HORONDI_AUTH_TOKEN');
    const confirmation = sessionStorage.getItem('confirmation');
    yield put(setAuthLoading(true));

    if (confirmation) {
      yield put(setAuthLoading(false));
      return;
    }

    if (!authToken) {
      yield put(setAuthLoading(false));
      yield put(setAuth(false));
      yield put(push(pathToLogin));
      return;
    }
    yield put(setAuth(true));

    const admin = yield call(getUserByToken, authToken);
    yield put(setAdminId(admin._id));
    yield put(setAuthLoading(false));
  } catch (error) {
    yield put(setAuthLoading(false));
    yield put(setAuth(false));
    setToLocalStorage('HORONDI_AUTH_TOKEN', null);
    yield put(push(pathToLogin));
  }
}

export function* handleAdminLogout() {
  setToLocalStorage('HORONDI_AUTH_TOKEN', null);
  yield put(setAuth(false));
  yield put(push(pathToLogin));
}

export default function* authSaga() {
  yield takeEvery(LOGIN_USER, handleAdminLoad);
  yield takeEvery(CHECK_USER_BY_TOKEN, handleAdminCheckByToken);
  yield takeEvery(LOGOUT_USER, handleAdminLogout);
}
