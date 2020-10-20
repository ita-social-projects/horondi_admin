import {
  SET_ORDER,
  GET_ORDER,
  GET_ORDER_LIST,
  SET_ORDER_LIST,
  SET_ORDER_LOADING,
  SET_ORDER_ERROR
} from './orders.types';

const getOrder = (payload) => ({
  type: GET_ORDER,
  payload
});

const setOrder = (payload) => ({
  type: SET_ORDER,
  payload
});

const getOrderList = (payload) => ({
  type: GET_ORDER_LIST,
  payload
});

const setOrderList = (payload) => ({
  type: SET_ORDER_LIST,
  payload
});

const setOrderLoading = (loading) => ({
  type: SET_ORDER_LOADING,
  payload: loading
});

const setOrderError = (error) => ({
  type: SET_ORDER_ERROR,
  payload: error
});

export {
  getOrder,
  setOrder,
  getOrderList,
  setOrderList,
  setOrderLoading,
  setOrderError
};
