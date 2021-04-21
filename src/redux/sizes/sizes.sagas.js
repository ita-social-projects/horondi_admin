import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  getAllSizes,
  deleteSize,
  getSizeById,
  addSize,
  updateSize
} from './sizes.operations';
import {
  setSizes,
  setSize,
  setSizesLoading,
  setSizesError,
  removeSizeFromState
} from './sizes.actions';
import { config } from '../../configs';
import {
  GET_SIZES,
  GET_SIZE,
  DELETE_SIZE,
  ADD_SIZE,
  UPDATE_SIZE
} from './sizes.types';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';
import { AUTH_ERRORS } from '../../error-messages/auth';
import { handleRefreshTokenPair } from '../auth/auth.sagas';

const {
  SUCCESS_DELETE_STATUS,
  SUCCESS_ADD_STATUS,
  SUCCESS_UPDATE_STATUS
} = config.statuses;

export function* handleSizesLoad() {
  try {
    yield put(setSizesLoading(true));
    const sizes = yield call(getAllSizes);
    yield put(setSizes(sizes));
    yield put(setSizesLoading(false));
  } catch (error) {
    yield call(handleSizesError, error);
  }
}

export function* handleSizeById({ payload }) {
  try {
    yield put(setSizesLoading(true));
    const size = yield call(getSizeById, payload);
    yield put(setSize(size));
    yield put(setSizesLoading(false));
  } catch (error) {
    yield call(handleSizesError, error);
  }
}

export function* handleAddSize({ payload }) {
  try {
    yield put(setSizesLoading(true));
    const size = yield call(addSize, payload);

    if (size?.message === AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID) {
      yield call(handleRefreshTokenPair);
      yield handleAddSize({ payload });
    } else {
      yield put(setSizesLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
      yield put(push(config.routes.pathToSizes));
    }
  } catch (error) {
    yield call(handleSizesError, error);
  }
}

export function* handleSizeUpdate({ payload }) {
  const { id, newSize } = payload;
  try {
    yield put(setSizesLoading(true));
    const size = yield call(updateSize, id, newSize);

    if (size?.message === AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID) {
      yield call(handleRefreshTokenPair);
      yield handleSizeUpdate({ payload });
    } else {
      yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
      yield put(push(config.routes.pathToSizes));
    }
  } catch (error) {
    yield call(handleSizesError, error);
  }
}

export function* handleSizeDelete({ payload }) {
  try {
    yield put(setSizesLoading(true));

    const size = yield call(deleteSize, payload);

    if (size?.message === AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID) {
      yield call(handleRefreshTokenPair);
      yield handleSizeDelete({ payload });
    } else {
      yield put(removeSizeFromState(payload));
      yield put(setSizesLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
    }
  } catch (error) {
    yield call(handleSizesError, error);
  }
}

export function* handleSizesError(e) {
  yield put(setSizesLoading(false));
  yield put(setSizesError({ e }));
  yield call(handleErrorSnackbar, e.message);
}

export default function* sizesSaga() {
  yield takeEvery(GET_SIZES, handleSizesLoad);
  yield takeEvery(GET_SIZE, handleSizeById);
  yield takeEvery(DELETE_SIZE, handleSizeDelete);
  yield takeEvery(ADD_SIZE, handleAddSize);
  yield takeEvery(UPDATE_SIZE, handleSizeUpdate);
}
