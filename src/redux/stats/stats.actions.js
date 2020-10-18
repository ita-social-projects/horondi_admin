import {
  SET_STATS_LOADING,
  SET_POPULAR_CATEGORIES,
  SET_DOUGHNUT_VALUE,
  SET_DATE_VALUE,
  SET_BAR_VALUE,
  SET_POPULAR_PRODUCTS,
  GET_INITIAL_STATS
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

const setPopularProducts = (products) => ({
  type: SET_POPULAR_PRODUCTS,
  payload: products
});

const getIniitalStats = () => ({
  type: GET_INITIAL_STATS
});

export {
  setPopularCategories,
  setStatsLoading,
  setDoughnutValue,
  setDateValue,
  setBarValue,
  setPopularProducts,
  getIniitalStats
};
