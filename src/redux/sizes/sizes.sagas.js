import { takeEvery, call, put } from 'redux-saga/effects';
import { getAllSizes, deleteSize } from './sizes.operations';
import {
  setSizes,
  setSizesLoading,
  setSizesError,
  removeSizeFromState
} from './sizes.actions';
import { config } from '../../configs';
import { GET_SIZES, DELETE_SIZE } from './sizes.types';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';

import { setItemsCount, updatePagination } from '../table/table.actions';

const { SUCCESS_DELETE_STATUS } = config.statuses;

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

export function* handleSizeDelete({ payload }) {
  try {
    yield put(setSizesLoading(true));

    yield call(deleteSize, payload);
    yield put(removeSizeFromState(payload));
    yield put(updatePagination());
    yield put(setSizesLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
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
  yield takeEvery(DELETE_SIZE, handleSizeDelete);
}
