import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import { setItemsCount } from '../../table/table.actions';
import {
  setOrder,
  setOrderList,
  setOrderLoading,
  setOrderError
} from '../orders.actions';
import { getAllOrders, getOrderById } from '../orders.operations';
import {
  handleOrdersListLoad,
  handleOrderLoad,
  handleOrdersError
} from '../orders.sagas';
import {
  getFakeOrderList,
  fakeIdOrder,
  fakeError,
  fakeId,
  fakeOrderList,
  fakeOrderState,
  fakeTableState
} from './orders.variables';

import { handleErrorSnackbar } from '../../snackbar/snackbar.sagas';
import Table from '../../table/table.reducer';
import Orders from '../orders.reducer';

describe('order sagas tests', () => {
  it('should handle all order list', () =>
    expectSaga(handleOrdersListLoad, { payload: getFakeOrderList })
      .withReducer(combineReducers({ Orders, Table }), {
        Orders: fakeOrderState,
        Table: fakeTableState
      })
      .put(setOrderLoading(true))
      .provide([
        [
          call(
            getAllOrders,
            getFakeOrderList.skip,
            getFakeOrderList.limit,
            getFakeOrderList.filter,
              getFakeOrderList.sort
          ),
          fakeOrderList
        ]
      ])
      .put(setItemsCount(fakeOrderList.count))
      .put(setOrderList(fakeOrderList))
      .put(setOrderLoading(false))
      .hasFinalState({
        Orders: {
          ...fakeOrderState,
          list: fakeOrderList
        },
        Table: {
          ...fakeTableState,
          itemsCount: fakeOrderList.count
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(4);
      }));

  it('should handle order by id', () =>
    expectSaga(handleOrderLoad, { payload: fakeId })
      .withReducer(combineReducers({ Orders }), { Orders: fakeOrderState })
      .put(setOrderLoading(true))
      .provide([[call(getOrderById, fakeId), fakeIdOrder]])
      .put(setOrder(fakeIdOrder.data.getOrderById))
      .put(setOrderLoading(false))
      .hasFinalState({
        Orders: {
          ...fakeOrderState,
          selectedOrder: fakeIdOrder.data.getOrderById
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));

  it('should handle orders errors', () =>
    expectSaga(handleOrdersError, fakeError)
      .withReducer(combineReducers({ Orders }), {
        Orders: {
          ...fakeOrderState,
          orderLoading: true
        }
      })
      .provide([[call(handleErrorSnackbar, fakeError.message)]])
      .put(setOrderLoading(false))
      .put(setOrderError({ e: fakeError }))
      .hasFinalState({
        Orders: {
          ...fakeOrderState,
          orderLoading: false,
          orderError: { e: fakeError }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(2);
      }));
});
