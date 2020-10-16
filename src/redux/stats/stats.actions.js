import {
  GET_SALES_BY_CATEGORY,
  SET_STATS_LOADING,
  SET_DOUGHNUT_DATA
} from './stats.types';

const setDoughnutData = (data) => ({
  type: SET_DOUGHNUT_DATA,
  payload: data
});

const setStatsLoading = (loading) => ({
  type: SET_STATS_LOADING,
  payload: loading
});

const getSalesByCategory = (categories) => ({
  type: GET_SALES_BY_CATEGORY,
  payload: categories
});

export { setDoughnutData, setStatsLoading, getSalesByCategory };
