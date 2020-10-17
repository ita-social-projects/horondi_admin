import { call, takeEvery, put } from 'redux-saga/effects';

import { GET_POPULAR_CATEGORIES } from './stats.types';
import { setPopularCategories, setStatsLoading } from './stats.actions';
import { getPopularCategories } from './stats.operations';

import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
} from '../snackbar/snackbar.actions';

function* handlePopularCategoriesLoad() {
  try {
    yield put(setStatsLoading(true));
    const categories = yield call(getPopularCategories);
    if (categories.message) {
      throw new Error(categories.message);
    } else {
      yield put(setPopularCategories(categories.data.getPopularCategories));
      yield put(setStatsLoading(false));
    }
  } catch (e) {
    handleStatsErrors(e);
  }
}

function* handleStatsErrors(e) {
  yield put(setStatsLoading(false));
  yield put(setSnackBarSeverity('error'));
  yield put(setSnackBarMessage(e.message));
  yield put(setSnackBarStatus(true));
}

export default function* statsSaga() {
  yield takeEvery(GET_POPULAR_CATEGORIES, handlePopularCategoriesLoad);
}
