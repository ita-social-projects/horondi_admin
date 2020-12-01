import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_ORDER, UPDATE_ORDER, GET_ORDER_LIST } from './orders.types';
import { getOrderById, updateOrder, getAllOrders } from './orders.operations';
import { setItemsCount } from '../table/table.actions';

import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
} from '../snackbar/snackbar.actions';

import {
  setOrderList,
  setOrderError,
  setOrderLoading,
  setOrder
} from './orders.actions';

export function* handleOrderUpdate({ payload }) {
  try {
    yield put(setOrderLoading(true));
    const order = yield call(updateOrder, payload);
    if (order.errors) {
      throw new Error(order.errors[0].message);
    }
    yield put(setOrder(order.data.updateOrder));
  } catch (e) {
    yield put(setOrderError(e));
  } finally {
    yield put(setOrderLoading(false));
  }
}

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
    yield put(setOrderError(e));
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
  yield takeEvery(UPDATE_ORDER, handleOrderUpdate);
}
