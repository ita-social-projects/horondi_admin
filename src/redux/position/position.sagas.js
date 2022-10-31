import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  getAllPositions,
  deletePosition,
  addPosition,
  getPositionById,
  updatePosition
} from './position.operations';
import {
  setPositions,
  setPositionsLoading,
  removePositionFromState,
  setPosition
} from './position.actions';
import {
  GET_POSITIONS,
  DELETE_POSITION,
  ADD_POSITION,
  GET_POSITION,
  UPDATE_POSITION
} from './position.types';
import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';
import { setItemsCount, updatePagination } from '../table/table.actions';

import { config } from '../../configs';

const { SUCCESS_ADD_STATUS, SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } =
  config.statuses;

export function* handlePositionsLoad({ payload: { limit, skip, filter } }) {
  try {
    yield put(setPositionsLoading(true));
    const positions = yield call(getAllPositions, limit, skip, filter);
    yield put(setPositions(positions?.items));
    yield put(setItemsCount(positions?.count));
    yield put(setPositionsLoading(false));
  } catch (error) {
    yield call(handlePositionsError, error);
  }
}

export function* handlePositionsAdd({ payload }) {
  try {
    yield put(setPositionsLoading(true));
    const position = yield call(addPosition, payload);
    if (position) {
      yield put(setPositionsLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
      yield put(push(config.routes.pathToPosition));
    }
  } catch (e) {
    yield call(handlePositionsError, e);
  }
}

export function* handlePositionDelete({ payload }) {
  try {
    yield put(setPositionsLoading(true));
    const position = yield call(deletePosition, payload);
    if (position) {
      yield put(removePositionFromState(payload));
      yield put(setPositionsLoading(false));
      yield put(updatePagination());
      yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
    }
  } catch (error) {
    yield call(handlePositionsError, error);
  }
}

export function* handlePositionById({ payload }) {
  try {
    yield put(setPositionsLoading(true));
    const position = yield call(getPositionById, payload);
    if (position) {
      yield put(setPosition(position));
      yield put(setPositionsLoading(false));
    }
  } catch (error) {
    yield call(handlePositionsError, error);
  }
}

export function* handlePositionUpdate({ payload }) {
  try {
    yield put(setPositionsLoading(true));
    const { id, position } = payload;
    const positionUpdate = yield call(updatePosition, id, position);
    if (positionUpdate) {
      yield put(setPositionsLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
      yield put(push(config.routes.pathToPosition));
    }
  } catch (error) {
    yield call(handlePositionsError, error);
  }
}

export function* handlePositionsError(e) {
  yield call(handleErrorSnackbar, e.message);
}

export default function* positionSaga() {
  yield takeEvery(ADD_POSITION, handlePositionsAdd);
  yield takeEvery(GET_POSITIONS, handlePositionsLoad);
  yield takeEvery(DELETE_POSITION, handlePositionDelete);
  yield takeEvery(GET_POSITION, handlePositionById);
  yield takeEvery(UPDATE_POSITION, handlePositionUpdate);
}
