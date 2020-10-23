import { call, takeEvery, put, select } from 'redux-saga/effects';

import {
  GET_INITIAL_STATS,
  GET_ALL_ORDERS_STATS,
  GET_PAID_ORDERS_STATS
} from './stats.types';

import {
  setAllOrdersStats,
  setBarValue,
  setDoughnutValue,
  setPaidOrdersStats,
  setPopularCategories,
  setPopularProducts,
  setStatsLoading,
  setUpdatingBarData,
  setUpdatingDoughnutData
} from './stats.actions';

import {
  getPopularCategories,
  getPopularProducts,
  getOrdersStats,
  getPaidOrdersStats
} from './stats.operations';

import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
} from '../snackbar/snackbar.actions';
import { config } from '../../configs';

const { bar } = config.labels;

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

function* handleOrdersStatisticLoad(payload) {
  try {
    yield put(setUpdatingDoughnutData(true));
    const date = yield select(({ Stats }) => Stats.date);
    const orders = yield call(getOrdersStats, date);
    yield put(setAllOrdersStats(orders));
    yield put(setUpdatingDoughnutData(false));
    yield put(setDoughnutValue(bar.select[1].value));
  } catch (e) {
    handleStatsErrors(e);
  }
}

function* handlePaidOrdersLoad(payload) {
  try {
    yield put(setUpdatingBarData(true));
    const date = yield select(({ Stats }) => Stats.date);
    const orders = yield call(getPaidOrdersStats, date);
    yield put(setPaidOrdersStats(orders));
    yield put(setUpdatingBarData(false));
    yield put(setBarValue(bar.select[1].value));
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
  yield takeEvery(GET_ALL_ORDERS_STATS, handleOrdersStatisticLoad);
  yield takeEvery(GET_PAID_ORDERS_STATS, handlePaidOrdersLoad);
}
