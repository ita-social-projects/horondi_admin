import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { config } from '../../configs';
import routes from '../../configs/routes';
import {
  GET_ORDER,
  UPDATE_ORDER,
  GET_ORDER_LIST,
  DELETE_ORDER
} from './orders.types';
import {
  getOrderById,
  updateOrder,
  getAllOrders,
  deleteOrder
} from './orders.operations';
import { setItemsCount, updatePagination } from '../table/table.actions';

import {
  setOrderList,
  setOrderError,
  setOrderLoading,
  setOrder,
  removeOrderFromStore
} from './orders.actions';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';

const { SUCCESS_DELETE_STATUS } = config.statuses;

export function* handleOrderUpdate({ payload }) {
  try {
    yield put(setOrderLoading(true));
    const order = yield call(updateOrder, payload.order, payload.id);
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
  yield call(handleErrorSnackbar, e.message);
}

export function* handleOrdersDelete({ payload }) {
  try {
    yield put(setOrderLoading(true));
    yield call(deleteOrder, payload);
    yield put(removeOrderFromStore(payload));
    yield put(setOrderLoading(false));
    yield put(updatePagination());
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
    yield put(push(routes.pathToOrders));
  } catch (error) {
    yield call(handleOrdersError, error);
  }
}

export default function* ordersSaga() {
  yield takeEvery(GET_ORDER_LIST, handleOrdersListLoad);
  yield takeEvery(GET_ORDER, handleOrderLoad);
  yield takeEvery(UPDATE_ORDER, handleOrderUpdate);
  yield takeEvery(DELETE_ORDER, handleOrdersDelete);
}
