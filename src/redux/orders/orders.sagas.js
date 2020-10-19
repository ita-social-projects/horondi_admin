import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  getAllOrders
} from './orders.operations';

import {
  GET_ORDER
} from './orders.types';

import {
  setOrder,
  setOrderError,
  setOrderLoading,
  setOrdersPagesCount
} from './orders.actions';

import { setSnackBarMessage, setSnackBarSeverity, setSnackBarStatus } from '../snackbar/snackbar.actions';

function* handleOrdersLoad() {
  try {
    yield put(setOrderLoading(true));
    const orders = yield call(getAllOrders);
    // yield put(setOrdersPagesCount(Math.ceil(orders.count / orders.newsPerPage)));
    yield put(setOrder(orders));
    yield put(setOrderLoading(false));
  } catch (error) {
    yield call(handleOrdersError, error);
  }
}

function* handleOrdersError(e) {
  yield put(setOrderLoading(false));
  yield put(setOrderError({ e }));
  yield put(setSnackBarSeverity('error'));
  yield put(setSnackBarMessage(e.message));
  yield put(setSnackBarStatus(true));
}

export default function* ordersSaga() {
  yield takeEvery(GET_ORDER, handleOrdersLoad);
}