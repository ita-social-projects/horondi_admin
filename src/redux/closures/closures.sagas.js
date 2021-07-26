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
  setClosure
} from './closures.actions';
import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';
import { setItemsCount, updatePagination } from '../table/table.actions';

const { SUCCESS_ADD_STATUS, SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } =
  config.statuses;

export function* handleClosuresLoad({ payload: { pagination } }) {
  try {
    yield put(setClosuresLoading(true));
    const closures = yield call(
      getAllClosures,
      pagination.limit,
      pagination.skip
    );
    if (closures) {
      yield put(setClosures(closures));
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
    const closure = yield call(createClosures, payload);
    if (closure) {
      yield put(setClosuresLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
      yield put(push(config.routes.pathToClosures));
    }
  } catch (e) {
    yield call(handleClosuresError, e);
  }
}

export function* handleClosureDelete({ payload }) {
  try {
    yield put(setClosuresLoading(true));
    const closure = yield call(deleteClosure, payload);
    if (closure) {
      yield put(removeClosureFromState(payload));
      yield put(setClosuresLoading(false));
      yield put(updatePagination());
      yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
    }
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
    const { id, closure, upload } = payload;
    const closureUpdate = yield call(updateClosure, id, closure, upload);
    if (closureUpdate) {
      yield put(setClosuresLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
      yield put(push(config.routes.pathToClosures));
    }
  } catch (error) {
    yield call(handleClosuresError, error);
  }
}

export function* handleClosuresError(e) {
  yield call(handleErrorSnackbar, e.message);
}

export default function* closuresSaga() {
  yield takeEvery(ADD_CLOSURE, handleClosuresAdd);
  yield takeEvery(GET_CLOSURES, handleClosuresLoad);
  yield takeEvery(DELETE_CLOSURE, handleClosureDelete);
  yield takeEvery(GET_CLOSURE, handleClosureById);
  yield takeEvery(UPDATE_CLOSURE, handleClosureUpdate);
}
