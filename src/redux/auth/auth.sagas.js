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
import {
  setToLocalStorage,
  getFromLocalStorage
} from '../../services/local-storage.service';
import { handleErrorSnackbar } from '../snackbar/snackbar.sagas';
import routes from '../../configs/routes';
import { LOCAL_STORAGE } from '../../consts/local-storage';
import { AUTH_ERRORS } from '../../error-messages/auth';
import { userErrors } from '../../configs/error-modal-messages';

const { pathToMainPage, pathToLogin } = routes;

export function* handleAdminLoad({ payload }) {
  try {
    yield put(setAuthLoading(true));
    const adminData = yield call(loginAdmin, payload);

    if (adminData) {
      setToLocalStorage(LOCAL_STORAGE.AUTH_ACCESS_TOKEN, adminData.token);
      setToLocalStorage(
        LOCAL_STORAGE.AUTH_REFRESH_TOKEN,
        adminData.refreshToken
      );

      yield put(setAdminId(adminData._id));
      yield put(setAuth(true));
      yield put(push(pathToMainPage));
      yield put(setAuthLoading(false));
    }
  } catch (error) {
    yield put(setAuthLoading(false));
    yield put(setAuthError(error));
    if (error.message === AUTH_ERRORS.USER_IS_BLOCKED) {
      yield call(handleErrorSnackbar, userErrors.USER_IS_BLOCKED);
    } else {
      yield call(handleErrorSnackbar, error.message);
    }
  }
}

export function* handleAdminCheckByToken() {
  try {
    const authToken = getFromLocalStorage(LOCAL_STORAGE.AUTH_ACCESS_TOKEN);
    const confirmation = sessionStorage.getItem(LOCAL_STORAGE.CONFIRMATION);
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

    const admin = yield call(getUserByToken);

    if (admin) {
      yield put(setAdminId(admin?._id));
      yield put(setAuthLoading(false));
    }
  } catch (error) {
    yield put(setAuthLoading(false));
    yield put(setAuth(false));
    setToLocalStorage(LOCAL_STORAGE.AUTH_ACCESS_TOKEN, '');
    setToLocalStorage(LOCAL_STORAGE.AUTH_REFRESH_TOKEN, '');
    yield put(push(pathToLogin));
  }
}

export function* handleAdminLogout() {
  setToLocalStorage(LOCAL_STORAGE.AUTH_ACCESS_TOKEN, '');
  setToLocalStorage(LOCAL_STORAGE.AUTH_REFRESH_TOKEN, '');
  yield put(setAuth(false));
  yield put(push(pathToLogin));
}

export default function* authSaga() {
  yield takeEvery(LOGIN_USER, handleAdminLoad);
  yield takeEvery(CHECK_USER_BY_TOKEN, handleAdminCheckByToken);
  yield takeEvery(LOGOUT_USER, handleAdminLogout);
}
