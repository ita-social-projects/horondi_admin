import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  createStrap,
  getAllStraps,
  getStrapById,
  updateStrap,
  deleteStrap
} from './straps.operations';
import { config } from '../../configs';
import {
  ADD_STRAP,
  GET_STRAPS,
  DELETE_STRAP,
  GET_STRAP,
  UPDATE_STRAP
} from './straps.types';
import {
  setStraps,
  setStrapsLoading,
  removeStrapFromState,
  setStrap,
  setStrapsError
} from './straps.actions';
import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';
import { setItemsCount, updatePagination } from '../table/table.actions';

const { SUCCESS_ADD_STATUS, SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } =
  config.statuses;

export function* handleStrapsLoad({ payload: { limit, skip, filter } }) {
  try {
    yield put(setStrapsLoading(true));
    const straps = yield call(getAllStraps, limit, skip, filter);

    yield put(setStraps(straps?.items));
    yield put(setItemsCount(straps?.count));
    yield put(setStrapsLoading(false));
  } catch (error) {
    yield call(handleStrapsError, error);
  }
}

export function* handleStrapAdd({ payload }) {
  try {
    yield put(setStrapsLoading(true));
    const strap = yield call(createStrap, payload);

    if (strap) {
      yield put(setStrapsLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
      yield put(push(config.routes.pathToStraps));
    }
  } catch (e) {
    yield call(handleStrapsError, e);
  }
}

export function* handleStrapDelete({ payload }) {
  try {
    yield put(setStrapsLoading(true));
    const strap = yield call(deleteStrap, payload);

    if (strap) {
      yield put(removeStrapFromState(payload));
      yield put(setStrapsLoading(false));
      yield put(updatePagination());
      yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
    }
  } catch (error) {
    yield call(handleStrapsError, error);
  }
}

export function* handleGetStrapById({ payload }) {
  try {
    yield put(setStrapsLoading(true));
    const strap = yield call(getStrapById, payload);

    if (strap) {
      yield put(setStrap(strap));
      yield put(setStrapsLoading(false));
    }
  } catch (error) {
    yield call(handleStrapsError, error);
  }
}

export function* handleStrapUpdate({ payload }) {
  try {
    yield put(setStrapsLoading(true));
    const { id, strap, image } = payload;
    const strapUpdate = yield call(updateStrap, id, strap, image);

    if (strapUpdate) {
      yield put(setStrapsLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
      yield put(push(config.routes.pathToStraps));
    }
  } catch (error) {
    yield call(handleStrapsError, error);
  }
}

export function* handleStrapsError(e) {
  yield call(handleErrorSnackbar, e.message);
  yield put(setStrapsLoading(false));
  yield put(setStrapsError({ e }));
}

export default function* strapsSaga() {
  yield takeEvery(ADD_STRAP, handleStrapAdd);
  yield takeEvery(GET_STRAPS, handleStrapsLoad);
  yield takeEvery(DELETE_STRAP, handleStrapDelete);
  yield takeEvery(GET_STRAP, handleGetStrapById);
  yield takeEvery(UPDATE_STRAP, handleStrapUpdate);
}
