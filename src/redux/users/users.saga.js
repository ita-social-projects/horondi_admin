import { takeEvery, call, put } from 'redux-saga/effects';

import { config } from '../../configs';

import {
  getAllUsers,
  getUserById,
  deleteUser,
  switchUserStatus
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
  UPDATE_USER_STATUS
} from './users.types';

import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../snackbar/snackbar.actions';

const { SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } = config.statuses;

function* handleUsersLoad() {
  try {
    yield put(setUsersLoading(true));
    const users = yield call(getAllUsers, null);
    yield put(setUsers(users));
    yield put(setUsersLoading(false));
  } catch (err) {
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
}
