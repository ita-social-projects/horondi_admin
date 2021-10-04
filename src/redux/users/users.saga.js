import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { config } from '../../configs';

import {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserById,
  completeAdminRegister,
  resendEmailToConfirmAdmin,
  registerAdmin,
  validateToken,
  blockUser,
  unlockUser,
  confirmSuperadminCreation
} from './users.operations';

import {
  setUsers,
  setUser,
  setUserError,
  setUsersLoading,
  setAdminCreationLoading,
  deleteUserLocally,
  newRegisteredAdmin
} from './users.actions';

import {
  GET_USERS,
  GET_USER,
  DELETE_USER,
  UPDATE_USER,
  REGISTER_ADMIN,
  RESEND_EMAIL,
  CONFIRM_ADMIN,
  VALIDATE_TOKEN,
  BLOCK_USER,
  UNLOCK_USER,
  CONFIRM_SUPERADMIN_CREATION
} from './users.types';

import { setItemsCount, updatePagination } from '../table/table.actions';
import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';
import { AUTH_ERRORS } from '../../error-messages/auth';
import { handleAdminLogout } from '../auth/auth.sagas';

const {
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS,
  SUCCESS_CREATION_STATUS,
  SUCCESS_CONFIRMATION_STATUS,
  SUCCESS_SEND_EMAIL
} = config.statuses;

const { pathToLogin, pathToMainPage } = config.routes;

export function* handleUsersLoad({ payload: { filter, pagination, sort } }) {
  try {
    yield put(setUsersLoading(true));
    const result = yield call(getAllUsers, filter, pagination, sort);

    if (result) {
      yield put(setItemsCount(result?.count));
      yield put(setUsers(result?.items));
      yield put(setUsersLoading(false));
    }
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

export function* handleUserLoad({ payload }) {
  try {
    yield put(setUsersLoading(true));
    const user = yield call(getUserById, payload);

    if (user) {
      yield put(setUser(user));
      yield put(setUsersLoading(false));
    }
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

export function* handleUserUpdate({ payload }) {
  try {
    yield put(setUsersLoading(true));

    const userUpdate = yield call(updateUserById, payload);
    if (!userUpdate) {
      yield put(setUsersLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
      yield put(push(config.routes.pathToUsers));
    }
  } catch (error) {
    yield call(handleUsersError, error);
  }
}

export function* handleUsersDelete({ payload }) {
  try {
    yield put(setUsersLoading(true));

    const result = yield call(deleteUser, payload);

    if (result) {
      yield put(deleteUserLocally(payload));
      yield put(updatePagination());
      yield put(setUsersLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
    }
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

export function* handleBlockUser({ payload }) {
  try {
    yield put(setUsersLoading(true));

    const blockedUser = yield call(blockUser, payload);

    if (blockedUser) {
      yield put(setUser(blockedUser));
      yield put(setUsersLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
    }
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

export function* handleUnlockUser({ payload }) {
  try {
    yield put(setUsersLoading(true));

    const unlockedUser = yield call(unlockUser, payload);

    if (unlockedUser) {
      yield put(setUser(unlockedUser));
      yield put(setUsersLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
    }
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

export function* handleAdminRegister({ payload }) {
  try {
    yield put(setAdminCreationLoading(true));
    const admin = yield call(registerAdmin, payload);

    if (admin) {
      yield put(newRegisteredAdmin(true));
      yield put(setAdminCreationLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_CREATION_STATUS);
      yield put(newRegisteredAdmin(false));
    }
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

export function* handleConfirmSuperadminCreation({ payload }) {
  try {
    yield put(setAdminCreationLoading(true));
    const result = yield call(confirmSuperadminCreation, payload);

    if (result) {
      yield put(setAdminCreationLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_SEND_EMAIL);
    }
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

export function* handleResendEmailToConfirmAdmin({ payload }) {
  try {
    yield put(setUsersLoading(true));
    const result = yield call(resendEmailToConfirmAdmin, payload);

    if (result) {
      yield put(setUsersLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_SEND_EMAIL);
    }
  } catch (err) {
    yield call(handleUsersError, err);
  }
}

export function* handleAdminConfirm({ payload }) {
  try {
    yield put(setUsersLoading(true));
    const result = yield call(completeAdminRegister, payload);

    if (result) {
      yield put(setUsersLoading(false));
      yield put(push(pathToLogin));
      yield call(handleSuccessSnackbar, SUCCESS_CONFIRMATION_STATUS);
    }
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
    yield put(push(pathToMainPage));
  }
}

export function* handleUsersError(e) {
  if (
    e.message === AUTH_ERRORS.REFRESH_TOKEN_IS_NOT_VALID ||
    e.message === AUTH_ERRORS.USER_IS_BLOCKED
  ) {
    yield call(handleAdminLogout);
  } else {
    yield put(setUsersLoading(false));
    yield put(setUserError({ e }));
    yield call(handleErrorSnackbar, e.message);
  }
}

export default function* usersSaga() {
  yield takeEvery(GET_USERS, handleUsersLoad);
  yield takeEvery(GET_USER, handleUserLoad);
  yield takeEvery(DELETE_USER, handleUsersDelete);
  yield takeEvery(UPDATE_USER, handleUserUpdate);
  yield takeEvery(REGISTER_ADMIN, handleAdminRegister);
  yield takeEvery(RESEND_EMAIL, handleResendEmailToConfirmAdmin);
  yield takeEvery(CONFIRM_ADMIN, handleAdminConfirm);
  yield takeEvery(VALIDATE_TOKEN, handleTokenValidation);
  yield takeEvery(BLOCK_USER, handleBlockUser);
  yield takeEvery(UNLOCK_USER, handleUnlockUser);
  yield takeEvery(CONFIRM_SUPERADMIN_CREATION, handleConfirmSuperadminCreation);
}
