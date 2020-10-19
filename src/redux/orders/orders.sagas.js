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
    console.log(order.data.getOrderById);
    yield put(setOrder(order.data.getOrderById))
  } catch (e) {
    yield put(setOrderError())
  } finally {
    yield setOrderLoading(false)
  }
}

export default function* ordersSaga() {
  yield takeEvery(GET_ORDER, handleOrderLoad);
}
