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

import { handleErrorSnackbar } from '../snackbar/snackbar.sagas';

import {
  getPopularCategories,
  getPopularProducts,
  getOrdersStats,
  getPaidOrdersStats,
  getUsersByDays
} from './stats.operations';

import { selectStatsDate } from '../selectors/stats.selectors';

export function* handleInitialStatsLoad() {
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

export function* handleOrdersStatisticLoad() {
  try {
    yield put(setUpdatingDoughnutData(true));
    const date = yield select(selectStatsDate);
    const orders = yield call(getOrdersStats, date);
    yield put(setAllOrdersStats(orders));
    yield put(setUpdatingDoughnutData(false));
  } catch (e) {
    handleStatsErrors(e);
  }
}

export function* handlePaidOrdersLoad() {
  try {
    yield put(setUpdatingBarData(true));
    const date = yield select(selectStatsDate);
    const orders = yield call(getPaidOrdersStats, date);
    yield put(setPaidOrdersStats(orders));
    yield put(setUpdatingBarData(false));
  } catch (e) {
    handleStatsErrors(e);
  }
}

export function* handleUsersStatisticLoad() {
  try {
    yield put(setUpdatingBarData(true));
    const date = yield select(selectStatsDate);
    const users = yield call(getUsersByDays, date);
    yield put(setUsersByDays(users));
    yield put(setUpdatingBarData(false));
  } catch (e) {
    handleStatsErrors(e);
  }
}

export function* handleStatsErrors(e) {
  yield put(setStatsLoading(false));
  yield call(handleErrorSnackbar, e.message);
}

export default function* statsSaga() {
  yield takeEvery(GET_INITIAL_STATS, handleInitialStatsLoad);
  yield takeEvery(GET_ALL_ORDERS_STATS, handleOrdersStatisticLoad);
  yield takeEvery(GET_PAID_ORDERS_STATS, handlePaidOrdersLoad);
  yield takeEvery(GET_USERS_STATS, handleUsersStatisticLoad);
}
