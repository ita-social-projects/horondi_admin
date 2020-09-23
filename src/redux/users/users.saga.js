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
  validateToken
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
  VALIDATE_TOKEN
} from './users.types';

import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../snackbar/snackbar.actions';

const {
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS,
  SUCCESS_CREATION_STATUS,
  SUCCESS_CONFIRMATION_STATUS
} = config.statuses;

function* handleUsersLoad({ payload }) {
  try {
    yield put(setUsersLoading(true));
    const users = yield call(getAllUsers, payload);
    yield put(setUsers(users));
    yield put(setUsersLoading(false));
  } catch (err) {
    console.log(err);
    yield call(handleUsersError, err);
  }
}

function* handleUserLoad({ payload }) {
  try {
    yield put(setUsersLoading(true));
    const user = yield call(getUserById, payload);
    yield put(setUser(user));
    yield put(setUsersLoading(false));
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

function* handleUsersDelete({ payload }) {
  try {
    yield put(setUsersLoading(true));
    yield call(deleteUser, payload);
    yield put(deleteUserLocally(payload));
    yield put(setUsersLoading(false));
    yield call(handleSnackBarSuccess, SUCCESS_DELETE_STATUS);
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

function* handleUserStatusSwitch({ payload }) {
  try {
    yield put(setUsersLoading(true));
    yield call(switchUserStatus, payload);
    yield put(updateUserLocally(payload));
    yield put(setUsersLoading(false));
    yield call(handleSnackBarSuccess, SUCCESS_UPDATE_STATUS);
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

function* handleAdminRegister({ payload }) {
  try {
    yield put(setUsersLoading(true));
    yield call(registerAdmin, payload);
    yield put(setUsersLoading(false));
    yield put(push('/users'));
    yield call(handleSnackBarSuccess, SUCCESS_CREATION_STATUS);
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

function* handleAdminConfirm({ payload }) {
  try {
    yield put(setUsersLoading(true));
    yield call(completeAdminRegister, payload);
    yield put(setUsersLoading(false));
    yield put(push('/'));
    yield call(handleSnackBarSuccess, SUCCESS_CONFIRMATION_STATUS);
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

function* handleTokenValidation({ payload }) {
  try {
    yield put(setUsersLoading(true));
    yield call(validateToken, payload);
    yield put(setUsersLoading(false));
  } catch (err) {
    yield call(handleUsersError, err);
    yield put(push('/'));
  }
}

function* handleUsersError(e) {
  yield put(setUsersLoading(false));
  yield put(setUserError({ e }));
  yield put(setSnackBarSeverity('error'));
  yield put(setSnackBarMessage(e.message));
  yield put(setSnackBarStatus(true));
}

function* handleSnackBarSuccess(status) {
  yield put(setSnackBarSeverity('success'));
  yield put(setSnackBarMessage(status));
  yield put(setSnackBarStatus(true));
}

export default function* usersSaga() {
  yield takeEvery(GET_USERS, handleUsersLoad);
  yield takeEvery(GET_USER, handleUserLoad);
  yield takeEvery(DELETE_USER, handleUsersDelete);
  yield takeEvery(UPDATE_USER_STATUS, handleUserStatusSwitch);
  yield takeEvery(REGISTER_ADMIN, handleAdminRegister);
  yield takeEvery(CONFIRM_ADMIN, handleAdminConfirm);
  yield takeEvery(VALIDATE_TOKEN, handleTokenValidation);
}
