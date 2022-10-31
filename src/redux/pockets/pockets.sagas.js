import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  createPockets,
  getAllPockets,
  deletePocket,
  getPocketById,
  updatePocket
} from './pockets.operations';
import { config } from '../../configs';
import {
  ADD_POCKET,
  GET_POCKETS,
  DELETE_POCKET,
  GET_POCKET,
  UPDATE_POCKET
} from './pockets.types';
import {
  setPockets,
  setPocketsLoading,
  removePocketFromState,
  setPocket
} from './pockets.actions';
import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';
import { setItemsCount, updatePagination } from '../table/table.actions';

const { SUCCESS_ADD_STATUS, SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } =
  config.statuses;

export function* handlePocketsLoad({ payload: { limit, skip, filter } }) {
  try {
    yield put(setPocketsLoading(true));
    const pockets = yield call(getAllPockets, limit, skip, filter);
    yield put(setItemsCount(pockets?.count));
    yield put(setPockets(pockets?.items));
    yield put(setPocketsLoading(false));
  } catch (error) {
    yield call(handlePocketsError, error);
  }
}

export function* handlePocketsAdd({ payload }) {
  try {
    yield put(setPocketsLoading(true));
    const pocket = yield call(createPockets, payload);
    if (pocket) {
      yield put(setPocketsLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
      yield put(push(config.routes.pathToPockets));
    }
  } catch (e) {
    yield call(handlePocketsError, e);
  }
}

export function* handlePocketDelete({ payload }) {
  try {
    yield put(setPocketsLoading(true));
    const pocket = yield call(deletePocket, payload);
    if (pocket) {
      yield put(removePocketFromState(payload));
      yield put(setPocketsLoading(false));
      yield put(updatePagination());
      yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
    }
  } catch (error) {
    yield call(handlePocketsError, error);
  }
}

export function* handlePocketById({ payload }) {
  try {
    yield put(setPocketsLoading(true));
    const pocket = yield call(getPocketById, payload);
    if (pocket) {
      yield put(setPocket(pocket));
      yield put(setPocketsLoading(false));
    }
  } catch (error) {
    yield call(handlePocketsError, error);
  }
}

export function* handlePocketUpdate({ payload }) {
  try {
    yield put(setPocketsLoading(true));
    const { id, pocket, upload } = payload;
    const pocketUpdate = yield call(updatePocket, id, pocket, upload);
    if (pocketUpdate) {
      yield put(setPocketsLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
      yield put(push(config.routes.pathToPockets));
    }
  } catch (error) {
    yield call(handlePocketsError, error);
  }
}

export function* handlePocketsError(e) {
  yield call(handleErrorSnackbar, e.message);
}

export default function* pocketsSaga() {
  yield takeEvery(ADD_POCKET, handlePocketsAdd);
  yield takeEvery(GET_POCKETS, handlePocketsLoad);
  yield takeEvery(DELETE_POCKET, handlePocketDelete);
  yield takeEvery(GET_POCKET, handlePocketById);
  yield takeEvery(UPDATE_POCKET, handlePocketUpdate);
}
