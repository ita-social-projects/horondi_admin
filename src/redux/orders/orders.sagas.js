import { takeEvery, call, put } from 'redux-saga/effects';
import {GET_ORDER,UPDATE_ORDER} from './orders.types'
import {
  setOrder,
  setOrderError,
  setOrderLoading,
} from './orders.actions';
import { getOrderById, updateOrder } from './orders.operations'

function* handleOrderLoad({payload}) {
  try {
    yield put(setOrderLoading(true))
    const order = yield call(getOrderById,payload)
    if(order.errors) {
      throw new Error(order.errors[0].message)
    }
    yield put(setOrder(order.data.getOrderById))
  } catch (e) {
    yield put(setOrderError(e))
  } finally {
    yield put(setOrderLoading(false))
  }
}

function* handleOrderUpdate({payload}) {
  try {
    yield put(setOrderLoading(true))
    const order = yield call(updateOrder,payload)
    if(order.errors) {
      throw new Error(order.errors[0].message)
    }
    yield put(setOrder(order.data.updateOrder))
  } catch (e) {
    yield put(setOrderError(e))
  } finally {
    yield put(setOrderLoading(false))
  }
}

export default function* ordersSaga() {
  yield takeEvery(GET_ORDER, handleOrderLoad);
  yield takeEvery(UPDATE_ORDER, handleOrderUpdate);
}
