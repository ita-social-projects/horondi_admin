import { call, takeEvery, put, select } from 'redux-saga/effects';

import {
  GET_INITIAL_STATS,
  GET_ALL_ORDERS_STATS,
  GET_PAID_ORDERS_STATS,
  GET_USERS_STATS
} from './stats.types';

import {
  setAllOrdersStats,
  setPaidOrdersStats,
  setPopularCategories,
  setPopularProducts,
  setStatsLoading,
  setUpdatingBarData,
  setUpdatingDoughnutData,
  setUsersByDays
} from './stats.actions';

import {
  getPopularCategories,
  getPopularProducts,
  getOrdersStats,
  getPaidOrdersStats,
  getUsersByDays
} from './stats.operations';

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
    console.log(products);
    yield put(setPopularCategories(categories));
    yield put(setPopularProducts(products));
    yield put(setStatsLoading(false));
  } catch (e) {
    handleStatsErrors(e);
  }
}

function* handleOrdersStatisticLoad() {
  try {
    yield put(setUpdatingDoughnutData(true));
    const date = yield select(({ Stats }) => Stats.date);
    const orders = yield call(getOrdersStats, date);
    yield put(setAllOrdersStats(orders));
    yield put(setUpdatingDoughnutData(false));
  } catch (e) {
    handleStatsErrors(e);
  }
}

function* handlePaidOrdersLoad() {
  try {
    yield put(setUpdatingBarData(true));
    const date = yield select(({ Stats }) => Stats.date);
    const orders = yield call(getPaidOrdersStats, date);
    yield put(setPaidOrdersStats(orders));
    yield put(setUpdatingBarData(false));
  } catch (e) {
    handleStatsErrors(e);
  }
}

function* handleUsersStatisticLoad() {
  try {
    yield put(setUpdatingBarData(true));
    const date = yield select(({ Stats }) => Stats.date);
    const users = yield call(getUsersByDays, date);
    yield put(setUsersByDays(users));
    yield put(setUpdatingBarData(false));
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
  yield takeEvery(GET_USERS_STATS, handleUsersStatisticLoad);
}
