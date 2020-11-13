import {
  SET_ORDER,
  UPDATE_ORDER,
  SET_ORDER_LOADING,
  SET_ORDER_ERROR,
  SET_ORDERS_PER_PAGE,
  SET_ORDERS_CURRENT_PAGE,
  SET_ORDERS_PAGES_COUNT,
  GET_ORDER,
  GET_ORDER_LIST,
  SET_ORDER_LIST,
} from './orders.types';

const getOrder = (payload) => ({
  type: GET_ORDER,
  payload
});

const setOrder = (payload) => ({
  type: SET_ORDER,
  payload
});

const updateOrder = (payload) => ({
  type: UPDATE_ORDER,
  payload
})

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

const setOrdersPerPage = (payload) => ({
  type: SET_ORDERS_PER_PAGE,
  payload
});

const setOrdersCurrentPage = (payload) => ({
  type: SET_ORDERS_CURRENT_PAGE,
  payload
});

const setOrdersPagesCount = (payload) => ({
  type: SET_ORDERS_PAGES_COUNT,
  payload
});

export {
  getOrder,
  setOrder,
  updateOrder,
  setOrderLoading,
  setOrderError,
  setOrdersPagesCount,
  setOrdersPerPage,
  setOrdersCurrentPage,
  getOrderList,
  setOrderList
};
