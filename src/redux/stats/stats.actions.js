import {
  SET_STATS_LOADING,
  SET_POPULAR_CATEGORIES,
  SET_DOUGHNUT_VALUE,
  SET_DATE_VALUE,
  SET_BAR_VALUE,
  SET_POPULAR_PRODUCTS,
  GET_INITIAL_STATS,
  SET_USERS_STATS_BY_DAYS,
  GET_ALL_ORDERS_STATS,
  SET_ALL_ORDERS_STATS,
  GET_PAID_ORDERS_STATS,
  SET_PAID_ORDERS_STATS,
  SET_UPDATING_BAR_DATA,
  SET_UPDATING_DOGHNUT_DATA
} from './stats.types';

const setPopularCategories = (data) => ({
  type: SET_POPULAR_CATEGORIES,
  payload: data
});

const setStatsLoading = (loading) => ({
  type: SET_STATS_LOADING,
  payload: loading
});

const setDoughnutValue = (value) => ({
  type: SET_DOUGHNUT_VALUE,
  payload: value
});

const setDateValue = (value) => ({
  type: SET_DATE_VALUE,
  payload: value
});

const setBarValue = (value) => ({
  type: SET_BAR_VALUE,
  payload: value
});

const setUsersByDays = (value) => ({
  type: SET_USERS_STATS_BY_DAYS,
  payload: value
});

const setPopularProducts = (products) => ({
  type: SET_POPULAR_PRODUCTS,
  payload: products
});

const getIniitalStats = () => ({
  type: GET_INITIAL_STATS
});

const getAllOrdersStats = () => ({
  type: GET_ALL_ORDERS_STATS
});

const setAllOrdersStats = (orders) => ({
  type: SET_ALL_ORDERS_STATS,
  payload: orders
});

const getPaidOrdersStats = () => ({
  type: GET_PAID_ORDERS_STATS
});

const setPaidOrdersStats = (orders) => ({
  type: SET_PAID_ORDERS_STATS,
  payload: orders
});

const setUpdatingBarData = (updating) => ({
  type: SET_UPDATING_BAR_DATA,
  payload: updating
});

const setUpdatingDoughnutData = (updating) => ({
  type: SET_UPDATING_DOGHNUT_DATA,
  payload: updating
});

export {
  setPopularCategories,
  setStatsLoading,
  setDoughnutValue,
  setDateValue,
  setBarValue,
  setPopularProducts,
  getIniitalStats,
  getAllOrdersStats,
  setAllOrdersStats,
  getPaidOrdersStats,
  setPaidOrdersStats,
  setUpdatingBarData,
  setUpdatingDoughnutData
};
