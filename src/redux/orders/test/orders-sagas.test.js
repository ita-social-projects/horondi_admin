import { expectSaga } from 'redux-saga-test-plan';
import { call, put } from 'redux-saga/effects';
import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
} from '../../snackbar/snackbar.actions';
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
  fakeOrderList
} from './orders.variables';
import {
  SET_ORDER,
  SET_ORDER_ERROR,
  SET_ORDER_LIST,
  SET_ORDER_LOADING
} from '../orders.types';
import { SET_ITEMS_COUNT } from '../../table/table.types';
import {
  SET_SNACKBAR_MESSAGE,
  SET_SNACKBAR_SEVERITY,
  SET_SNACKBAR_STATUS
} from '../../snackbar/snackbar.types';

describe('order sagas tests', () => {
  it('should handle all order list', () =>
    expectSaga(handleOrdersListLoad, { payload: getFakeOrderList })
      .put(setOrderLoading(true))
      .provide([
        [
          call(
            getAllOrders,
            getFakeOrderList.skip,
            getFakeOrderList.limit,
            getFakeOrderList.filter.orderStatus
          ),
          fakeOrderList
        ]
      ])
      .put(setItemsCount(fakeOrderList.count))
      .put(setOrderList(fakeOrderList))
      .put(setOrderLoading(false))
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(5);
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(1);
        expect(analysisPut[0]).toEqual(
          put({ type: SET_ORDER_LOADING, payload: true })
        );
        expect(analysisPut[1]).toEqual(
          put({ type: SET_ITEMS_COUNT, payload: fakeOrderList.count })
        );
        expect(analysisPut[2]).toEqual(
          put({ type: SET_ORDER_LIST, payload: { ...fakeOrderList } })
        );
        expect(analysisPut[3]).toEqual(
          put({ type: SET_ORDER_LOADING, payload: false })
        );
      }));

  it('should handle order by id', () =>
    expectSaga(handleOrderLoad, { payload: fakeId })
      .put(setOrderLoading(true))
      .provide([[call(getOrderById, fakeId), fakeIdOrder]])
      .put(setOrder(fakeIdOrder.data.getOrderById))
      .put(setOrderLoading(false))
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysis).toHaveLength(4);
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);
        expect(analysisPut[0]).toEqual(
          put({ type: SET_ORDER_LOADING, payload: true })
        );
        expect(analysisPut[1]).toEqual(
          put({
            type: SET_ORDER,
            payload: { ...fakeIdOrder.data.getOrderById }
          })
        );
        expect(analysisPut[2]).toEqual(
          put({ type: SET_ORDER_LOADING, payload: false })
        );
      }));

  it('should handle orders error', () =>
    expectSaga(handleOrdersError, fakeError)
      .put(setOrderLoading(false))
      .put(setOrderError({ e: fakeError }))
      .put(setSnackBarSeverity('error'))
      .put(setSnackBarMessage(fakeError.message))
      .put(setSnackBarStatus(true))
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(5);
        expect(analysisPut[0]).toEqual(
          put({ type: SET_ORDER_LOADING, payload: false })
        );
        expect(analysisPut[1]).toEqual(
          put({ type: SET_ORDER_ERROR, payload: { e: fakeError } })
        );
        expect(analysisPut[2]).toEqual(
          put({ type: SET_SNACKBAR_SEVERITY, payload: 'error' })
        );
        expect(analysisPut[3]).toEqual(
          put({ type: SET_SNACKBAR_MESSAGE, payload: fakeError.message })
        );
        expect(analysisPut[4]).toEqual(
          put({ type: SET_SNACKBAR_STATUS, payload: true })
        );
      }));
});
