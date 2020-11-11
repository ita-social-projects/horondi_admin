import {
  GET_ORDER,
  SET_ORDER,
  SET_ORDER_LOADING,
  SET_ORDER_ERROR
} from '../orders.types';

import {
  getOrder,
  setOrder,
  getOrderList,
  setOrderList,
  setOrderLoading,
  setOrderError
} from '../orders.actions';
import {
  expectedResultActionsGetOrderList,
  expectedResultActionsSetOrderList,
  getOrderListFakeData,
  setOrderListFakeData
} from './orders.variables';

describe('orders actions', () => {
  it('should create an action to get order', () => {
    expect(getOrder()).toEqual({
      type: GET_ORDER
    });
  });

  it('should create an action to set order', () => {
    expect(setOrder()).toEqual({
      type: SET_ORDER
    });
  });

  it('should create an action to get order list', () => {
    expect(getOrderList(getOrderListFakeData)).toEqual(
      expectedResultActionsGetOrderList
    );
  });

  it('should create an action to set order list', () => {
    expect(setOrderList(setOrderListFakeData)).toEqual(
      expectedResultActionsSetOrderList
    );
  });

  it('should create an action to set order loading', () => {
    expect(setOrderLoading(false)).toEqual({
      type: SET_ORDER_LOADING,
      payload: false
    });
  });

  it('should create an action to set order error', () => {
    expect(setOrderError(true)).toEqual({
      type: SET_ORDER_ERROR,
      payload: true
    });
  });
});
