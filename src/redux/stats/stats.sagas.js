import { call, takeEvery, put } from 'redux-saga/effects';

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
import { AUTH_ERRORS } from '../../error-messages/auth';
import { handleAdminLogout } from '../auth/auth.sagas';

export function* handleInitialStatsLoad() {
  try {
    yield put(setStatsLoading(true));
    const categories = yield call(getPopularCategories);
    const products = yield call(getPopularProducts);
    yield put(setPopularCategories(categories));
    yield put(setPopularProducts(products));
    yield put(setStatsLoading(false));
  } catch (e) {
    yield call(handleStatsErrors, e);
  }
}

export function* handleOrdersStatisticLoad({ payload }) {
  try {
    yield put(setUpdatingDoughnutData(true));
    const orders = yield call(getOrdersStats, payload);

    if (orders) {
      yield put(setAllOrdersStats(orders));
      yield put(setUpdatingDoughnutData(false));
    }
  } catch (e) {
    yield call(handleStatsErrors, e);
  }
}

export function* handlePaidOrdersLoad({ payload }) {
  try {
    yield put(setUpdatingBarData(true));
    const orders = yield call(getPaidOrdersStats, payload);

    if (orders) {
      yield put(setPaidOrdersStats(orders));
      yield put(setUpdatingBarData(false));
    }
  } catch (e) {
    yield call(handleStatsErrors, e);
  }
}

export function* handleUsersStatisticLoad({ payload }) {
  try {
    yield put(setUpdatingBarData(true));
    const users = yield call(getUsersByDays, payload);

    if (users) {
      yield put(setUsersByDays(users));
      yield put(setUpdatingBarData(false));
    }
  } catch (e) {
    yield call(handleStatsErrors, e);
  }
}

export function* handleStatsErrors(e) {
  if (
    e.message === AUTH_ERRORS.REFRESH_TOKEN_IS_NOT_VALID ||
    e.message === AUTH_ERRORS.USER_IS_BLOCKED
  ) {
    yield call(handleAdminLogout);
  } else {
    yield put(setStatsLoading(false));
    yield call(handleErrorSnackbar, e.message);
  }
}

export default function* statsSaga() {
  yield takeEvery(GET_INITIAL_STATS, handleInitialStatsLoad);
  yield takeEvery(GET_ALL_ORDERS_STATS, handleOrdersStatisticLoad);
  yield takeEvery(GET_PAID_ORDERS_STATS, handlePaidOrdersLoad);
  yield takeEvery(GET_USERS_STATS, handleUsersStatisticLoad);
}
