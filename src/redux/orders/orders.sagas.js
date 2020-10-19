import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {GET_ORDER} from './orders.types'
import {
  setOrder,
  setOrderError,
  setOrderLoading,
} from './orders.actions';
import { getOrderById } from './orders.operations'

function* handleOrderLoad({payload}) {
  try {
    yield setOrderLoading(true)
    const order = yield call(getOrderById,payload)
    if(order.errors) {
      throw new Error(order.errors[0].message)
    }
    yield put(setOrder(order.data.getOrderById))
  } catch (e) {
    yield put(setOrderError(e))
  } finally {
    yield setOrderLoading(false)
  }
}

export default function* ordersSaga() {
  yield takeEvery(GET_ORDER, handleOrderLoad);
}
