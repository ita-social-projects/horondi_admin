import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  createClosures,
  getAllClosures,
  deleteClosure,
  getClosureById,
  updateClosure
} from './closures.operations';
import { config } from '../../configs';
import {
  ADD_CLOSURE,
  GET_CLOSURES,
  DELETE_CLOSURE,
  GET_CLOSURE,
  UPDATE_CLOSURE
} from './closures.types';
import {
  setClosures,
  setClosuresLoading,
  removeClosureFromState,
  setClosure,
  setClosureError
} from './closures.actions';
import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';
import { setItemsCount, updatePagination } from '../table/table.actions';
import { AUTH_ERRORS } from '../../error-messages/auth';
import { handleAdminLogout } from '../auth/auth.sagas';

const { SUCCESS_ADD_STATUS, SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } =
  config.statuses;

export function* handleClosuresLoad({ payload: { limit, skip, filter } }) {
  try {
    yield put(setClosuresLoading(true));
    const closures = yield call(getAllClosures, limit, skip, filter);
    if (closures) {
      yield put(setClosures(closures?.items));
      yield put(setItemsCount(closures?.count));
      yield put(setClosuresLoading(false));
    }
  } catch (error) {
    yield call(handleClosuresError, error);
  }
}

export function* handleClosuresAdd({ payload }) {
  try {
    yield put(setClosuresLoading(true));
    yield call(createClosures, payload);
    yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
    yield put(push(config.routes.pathToClosures));
    yield put(setClosuresLoading(false));
  } catch (error) {
    yield call(handleClosuresError, error);
  }
}

export function* handleClosureDelete({ payload }) {
  try {
    yield put(setClosuresLoading(true));
    yield call(deleteClosure, payload);
    yield put(removeClosureFromState(payload));
    yield put(setClosuresLoading(false));
    yield put(updatePagination());
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (error) {
    yield call(handleClosuresError, error);
  }
}

export function* handleClosureById({ payload }) {
  try {
    yield put(setClosuresLoading(true));
    const closure = yield call(getClosureById, payload);
    if (closure) {
      yield put(setClosure(closure));
      yield put(setClosuresLoading(false));
    }
  } catch (error) {
    yield call(handleClosuresError, error);
  }
}

export function* handleClosureUpdate({ payload }) {
  try {
    yield put(setClosuresLoading(true));
    yield call(updateClosure, payload);
    yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
    yield put(push(config.routes.pathToClosures));
    yield put(setClosuresLoading(false));
  } catch (error) {
    yield call(handleClosuresError, error);
  }
}

export function* handleClosuresError(e) {
  if (e.message === AUTH_ERRORS.REFRESH_TOKEN_IS_NOT_VALID) {
    yield call(handleAdminLogout);
  } else {
    yield put(setClosuresLoading(false));
    yield put(setClosureError({ e }));
    yield call(handleErrorSnackbar, e.message);
  }
}

export default function* closuresSaga() {
  yield takeEvery(ADD_CLOSURE, handleClosuresAdd);
  yield takeEvery(GET_CLOSURES, handleClosuresLoad);
  yield takeEvery(DELETE_CLOSURE, handleClosureDelete);
  yield takeEvery(GET_CLOSURE, handleClosureById);
  yield takeEvery(UPDATE_CLOSURE, handleClosureUpdate);
}
