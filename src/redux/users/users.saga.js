import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { config } from '../../configs';

import {
  getAllUsers,
  getUserById,
  deleteUser,
  switchUserStatus,
  completeAdminRegister,
  registerAdmin,
  validateToken,
  resendEmailToConfirmAdmin
} from './users.operations';

import {
  setUsers,
  setUser,
  setUserError,
  setUsersLoading,
  deleteUserLocally,
  updateUserLocally
} from './users.actions';

import {
  GET_USERS,
  GET_USER,
  DELETE_USER,
  UPDATE_USER_STATUS,
  REGISTER_ADMIN,
  CONFIRM_ADMIN,
  VALIDATE_TOKEN,
  RESEND_EMAIL
} from './users.types';

import { setItemsCount, updatePagination } from '../table/table.actions';
import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';

const {
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS,
  SUCCESS_CREATION_STATUS,
  SUCCESS_CONFIRMATION_STATUS
} = config.statuses;

export function* handleUsersLoad({ payload: { filter, pagination, sort } }) {
  try {
    yield put(setUsersLoading(true));
    const result = yield call(getAllUsers, filter, pagination, sort);
    yield put(setItemsCount(result.count));
    yield put(setUsers(result.items));
    yield put(setUsersLoading(false));
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

export function* handleUserLoad({ payload }) {
  try {
    yield put(setUsersLoading(true));
    const user = yield call(getUserById, payload);
    yield put(setUser(user));
    yield put(setUsersLoading(false));
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

export function* handleUsersDelete({ payload }) {
  try {
    yield put(setUsersLoading(true));
    yield call(deleteUser, payload);
    yield put(deleteUserLocally(payload));
    yield put(updatePagination());
    yield put(setUsersLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

export function* handleUserStatusSwitch({ payload }) {
  try {
    yield put(setUsersLoading(true));
    yield call(switchUserStatus, payload);
    yield put(updateUserLocally(payload));
    yield put(setUsersLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

export function* handleAdminRegister({ payload }) {
  try {
    yield put(setUsersLoading(true));
    yield call(registerAdmin, payload);
    yield put(setUsersLoading(false));
    yield put(push('/users'));
    yield call(handleSuccessSnackbar, SUCCESS_CREATION_STATUS);
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

export function* handleResendEmail({ payload }) {
  try {
    yield put(setUsersLoading(true));
    yield call(resendEmailToConfirmAdmin, payload);
    yield put(setUsersLoading(false));
    // yield put(push('/users'));
    yield call(handleSuccessSnackbar, SUCCESS_CREATION_STATUS);
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

export function* handleAdminConfirm({ payload }) {
  try {
    yield put(setUsersLoading(true));
    yield call(completeAdminRegister, payload);
    yield put(setUsersLoading(false));
    yield put(push('/'));
    yield call(handleSuccessSnackbar, SUCCESS_CONFIRMATION_STATUS);
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

export function* handleTokenValidation({ payload }) {
  try {
    yield put(setUsersLoading(true));
    yield call(validateToken, payload);
    yield put(setUsersLoading(false));
  } catch (err) {
    yield call(handleUsersError, err);
    // yield put(push('/'));
  }
}

export function* handleUsersError(e) {
  yield put(setUsersLoading(false));
  yield put(setUserError({ e }));
  yield call(handleErrorSnackbar, e.message);
}

export default function* usersSaga() {
  yield takeEvery(GET_USERS, handleUsersLoad);
  yield takeEvery(GET_USER, handleUserLoad);
  yield takeEvery(DELETE_USER, handleUsersDelete);
  yield takeEvery(UPDATE_USER_STATUS, handleUserStatusSwitch);
  yield takeEvery(REGISTER_ADMIN, handleAdminRegister);
  yield takeEvery(CONFIRM_ADMIN, handleAdminConfirm);
  yield takeEvery(VALIDATE_TOKEN, handleTokenValidation);
  yield takeEvery(RESEND_EMAIL, handleResendEmail);
}
