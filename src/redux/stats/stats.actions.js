import {
  GET_POPULAR_CATEGORIES,
  SET_STATS_LOADING,
  SET_POPULAR_CATEGORIES,
  SET_DOUGHNUT_VALUE,
  SET_DATE_VALUE,
  SET_BAR_VALUE
} from './stats.types';

const setPopularCategories = (data) => ({
  type: SET_POPULAR_CATEGORIES,
  payload: data
});

const setStatsLoading = (loading) => ({
  type: SET_STATS_LOADING,
  payload: loading
});

const getPopularCategories = (categories) => ({
  type: GET_POPULAR_CATEGORIES,
  payload: categories
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

export {
  setPopularCategories,
  setStatsLoading,
  getPopularCategories,
  setDoughnutValue,
  setDateValue,
  setBarValue
};
