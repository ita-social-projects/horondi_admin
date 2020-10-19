import { call, takeEvery, put } from 'redux-saga/effects';

import { GET_INITIAL_STATS } from './stats.types';

import {
  setPopularCategories,
  setPopularProducts,
  setStatsLoading
} from './stats.actions';

import { getPopularCategories, getPopularProducts } from './stats.operations';

import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
} from '../snackbar/snackbar.actions';

function* handleInitialStatsLoad() {
  try {
    yield put(setStatsLoading(true));
    const categories = yield call(getPopularCategories);
    const products = yield call(getPopularProducts);
    yield put(setPopularCategories(categories));
    yield put(setPopularProducts(products));
    yield put(setStatsLoading(false));
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
  yield takeEvery(GET_INITIAL_STATS, handleInitialStatsLoad);
}
