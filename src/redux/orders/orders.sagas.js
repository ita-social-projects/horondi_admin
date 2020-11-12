import { takeEvery, call, put } from 'redux-saga/effects';

import { getAllOrders, getOrderById } from './orders.operations';

import { GET_ORDER_LIST, GET_ORDER } from './orders.types';

import {
  setOrderList,
  setOrderError,
  setOrder,
  setOrderLoading
} from './orders.actions';

import { setItemsCount, setPagesCount } from '../table/table.actions';
import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
} from '../snackbar/snackbar.actions';

export function* handleOrdersListLoad({ payload }) {
  try {
    yield put(setOrderLoading(true));
    const orders = yield call(
      getAllOrders,
      payload.skip,
      payload.limit,
      payload.filter.orderStatus
    );
    yield put(setItemsCount(orders.count));
    yield put(setOrderList(orders));
  } catch (error) {
    yield call(handleOrdersError, error);
  } finally {
    yield put(setOrderLoading(false));
  }
}

export function* handleOrderLoad({ payload }) {
  try {
    yield put(setOrderLoading(true));
    const order = yield call(getOrderById, payload);
    yield put(setOrder(order.data.getOrderById));
  } catch (e) {
    yield put(setOrderError());
  } finally {
    yield put(setOrderLoading(false));
  }
}

export function* handleOrdersError(e) {
  yield put(setOrderLoading(false));
  yield put(setOrderError({ e }));
  yield put(setSnackBarSeverity('error'));
  yield put(setSnackBarMessage(e.message));
  yield put(setSnackBarStatus(true));
}

export default function* ordersSaga() {
  yield takeEvery(GET_ORDER_LIST, handleOrdersListLoad);
  yield takeEvery(GET_ORDER, handleOrderLoad);
}
