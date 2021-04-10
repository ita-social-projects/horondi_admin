import {
  GET_HISTORY_RECORDS,
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

export {
  getHistoryRecords,
  setHistoryRecords,
  setHistoryLoading,
  setHistoryError
};
