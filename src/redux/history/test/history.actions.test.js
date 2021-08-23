import {
  CLEAR_FILTERS,
  GET_HISTORY_RECORDS,
  GET_RECORD_ITEM,
  SET_FILTER,
  SET_HISTORY_ERROR,
  SET_HISTORY_LOADING,
  SET_HISTORY_RECORDS,
  SET_RECORD_ITEM,
  SET_RECORD_LOADING
} from '../history.types';

import {
  getHistoryRecords,
  setHistoryRecords,
  setHistoryLoading,
  setHistoryError,
  setHistoryFilter,
  clearHistoryFilters,
  getRecordItem,
  setRecordItem,
  setRecordItemLoading
} from '../history.actions';

import {
  historyRecord,
  arrHistoryRecord,
  error,
  filter
} from './history.variables';

describe('history records action tests', () => {
  it('should get history records', () => {
    expect(getHistoryRecords(arrHistoryRecord)).toEqual({
      type: GET_HISTORY_RECORDS,
      payload: arrHistoryRecord
    });
  });

  it('should set history records', () => {
    expect(setHistoryRecords(arrHistoryRecord)).toEqual({
      type: SET_HISTORY_RECORDS,
      payload: arrHistoryRecord
    });
  });

  it('should set history loading', () => {
    expect(setHistoryLoading(true)).toEqual({
      type: SET_HISTORY_LOADING,
      payload: true
    });
  });

  it('should set history error', () => {
    expect(setHistoryError(error)).toEqual({
      type: SET_HISTORY_ERROR,
      payload: error
    });
  });

  it('should set history filter', () => {
    expect(setHistoryFilter(filter)).toEqual({
      type: SET_FILTER,
      payload: filter
    });
  });

  it('should clear history filter', () => {
    expect(clearHistoryFilters()).toEqual({ type: CLEAR_FILTERS });
  });

  it('should get record item', () => {
    expect(getRecordItem(historyRecord)).toEqual({
      type: GET_RECORD_ITEM,
      payload: historyRecord
    });
  });

  it('should set record item', () => {
    expect(setRecordItem(historyRecord)).toEqual({
      type: SET_RECORD_ITEM,
      payload: historyRecord
    });
  });

  it('should set record item loading', () => {
    expect(setRecordItemLoading(true)).toEqual({
      type: SET_RECORD_LOADING,
      payload: true
    });
  });
});
