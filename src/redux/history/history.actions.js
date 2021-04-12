import {
  CLEAR_FILTERS,
  GET_HISTORY_RECORDS,
  SET_FILTER,
  SET_HISTORY_ERROR,
  SET_HISTORY_LOADING,
  SET_HISTORY_RECORDS
} from './history.types';

const getHistoryRecords = (payload) => ({
  type: GET_HISTORY_RECORDS,
  payload
});
const setHistoryRecords = (payload) => ({
  type: SET_HISTORY_RECORDS,
  payload
});
const setHistoryLoading = (payload) => ({
  type: SET_HISTORY_LOADING,
  payload
});
const setHistoryError = (payload) => ({
  type: SET_HISTORY_ERROR,
  payload
});

const setHistoryFilter = (payload) => ({
  type: SET_FILTER,
  payload
});
const clearHistoryFilters = () => ({
  type: CLEAR_FILTERS
});

export {
  getHistoryRecords,
  setHistoryRecords,
  setHistoryLoading,
  setHistoryError,
  setHistoryFilter,
  clearHistoryFilters
};
