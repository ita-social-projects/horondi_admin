import {
  GET_ORDER,
  GET_ORDER_LIST_USER,
  SET_ORDER,
  SET_ORDER_LOADING,
  SET_ORDER_ERROR,
  GET_ORDER_LIST,
  SET_ORDER_LIST,
  SET_ORDER_LIST_USER,
  SET_FILTER_USER,
  UPDATE_ORDER,
  DELETE_ORDER,
  CLEAR_FILTERS_USER
} from '../orders.types';

import {
  getOrder,
  setOrder,
  getOrderList,
  setOrderList,
  setOrderLoading,
  setOrderError,
  updateOrder,
  deleteOrder,
  setOrderListUser,
  getOrderListUser,
  setOrderFilterUser,
  clearOrderFiltersUser
} from '../orders.actions';
import {
  getFakeOrderList,
  fakeOrderList,
  fakeIdOrderInput,
  fakeId,
  fakeIdOrderPayload,
  ordersByUser
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
    expect(getOrderList(getFakeOrderList)).toEqual({
      type: GET_ORDER_LIST,
      payload: {
        ...getFakeOrderList
      }
    });
  });

  it('should create an action for getting user order list', () => {
    expect(getOrderListUser(ordersByUser)).toEqual({
      type: GET_ORDER_LIST_USER,
      payload: ordersByUser
    });
  });

  it('should create an action to set order list', () => {
    expect(setOrderList(fakeOrderList)).toEqual({
      type: SET_ORDER_LIST,
      payload: { ...fakeOrderList }
    });
  });

  it('should create an action for setting user order list', () => {
    expect(setOrderListUser(ordersByUser)).toEqual({
      type: SET_ORDER_LIST_USER,
      payload: ordersByUser
    });
  });

  it('should create an action for updating user filters', () => {
    expect(setOrderFilterUser(getFakeOrderList)).toEqual({
      type: SET_FILTER_USER,
      payload: getFakeOrderList
    });
  });

  it('should create an action for clearing user filters', () => {
    expect(clearOrderFiltersUser()).toEqual({
      type: CLEAR_FILTERS_USER
    });
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
  it('should update order', () => {
    expect(updateOrder(fakeIdOrderInput, fakeId)).toEqual({
      type: UPDATE_ORDER,
      payload: fakeIdOrderPayload
    });
  });
  it('should delete order ', () => {
    expect(deleteOrder(fakeId)).toEqual({
      type: DELETE_ORDER,
      payload: fakeId
    });
  });
});
