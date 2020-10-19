import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  setOrder,
  setOrderError,
  setOrderLoading,
  setOrdersPagesCount
} from './orders.actions';

import { setSnackBarMessage, setSnackBarSeverity, setSnackBarStatus } from '../snackbar/snackbar.actions';

function* handleOrdersLoad({
  payload = {
    skip: 1,
    limit: 1,
    newsPerPage: 1
  }
}) {
  try {
    yield put(setOrderLoading(true));
    const orders = yield call(getAllOrders, payload.skip, payload.limit);
    yield put(setOrdersPagesCount(Math.ceil(orders.count / orders.newsPerPage)));
    yield put(setOrder(orders.items));
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