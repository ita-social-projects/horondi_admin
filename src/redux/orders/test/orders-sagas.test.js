import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
} from '../../snackbar/snackbar.actions';
import { setItemsCount, setPagesCount } from '../../table/table.actions';
import {
  setOrder,
  setOrderList,
  setOrderLoading,
  getOrderList,
  setOrderError
} from '../orders.actions';
import { getOrderById } from '../orders.operations';
import ordersSaga, {
  handleOrdersListLoad,
  handleOrderLoad,
  handleOrdersError
} from '../orders.sagas';
import {
  getFakeOrderList,
  fakeIdOrder,
  fakeOrders,
  fakeError,
  fakeId
} from './orders.variables';

describe('order sagas tests', () => {
  it('should not throw error', () => {
    expect(handleOrdersListLoad).not.toThrow();
    expect(handleOrderLoad).not.toThrow();
    expect(handleOrdersError).not.toThrow();
    expect(ordersSaga).not.toThrow();
  });

  it('should handle order list load', () => {
    expectSaga(handleOrdersListLoad, getFakeOrderList)
      .provide([[matchers.call.fn(getOrderList), fakeOrders]])
      .put(setOrderLoading(true))
      .put(
        setPagesCount(
          Math.ceil(fakeOrders.pagesCount / fakeOrders.orderPerPage)
        )
      )
      .put(setItemsCount(fakeOrders.count))
      .put(setOrderList(fakeOrders))
      .put(setOrderLoading(false))
      .run();
  });

  it('should handle order load', () => {
    expectSaga(handleOrderLoad, fakeId)
      .provide([[matchers.call.fn(getOrderById), fakeIdOrder]])
      .put(setOrderLoading(true))
      .put(setOrder(fakeIdOrder.data.getOrderById))
      .put(setOrderLoading(false))
      .run();
  });

  it('should handle orders error', () => {
    expectSaga(handleOrdersError, fakeError)
      .put(setOrderLoading(false))
      .put(setOrderError({ fakeError }))
      .put(setSnackBarSeverity('error'))
      .put(setSnackBarMessage(fakeError.message))
      .put(setSnackBarStatus(true))
      .run();
  });
});
