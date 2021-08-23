import {
  historyRecord,
  arrHistoryRecord,
  error,
  initialFilters,
  mockInitialFilters
} from './history.variables';

import {
  setHistoryRecords,
  setRecordItem,
  setRecordItemLoading,
  setHistoryLoading,
  setHistoryError,
  setHistoryFilter,
  clearHistoryFilters
} from '../history.actions';

import historyReducer, { initialState } from '../history.reducer';

describe('history reducer tests', () => {
  it('should return default state', () => {
    expect(historyReducer()).toEqual(initialState);
  });

  it('should set history records to the state', () => {
    expect(
      historyReducer(initialState, setHistoryRecords(arrHistoryRecord))
    ).toEqual({
      ...initialState,
      records: arrHistoryRecord
    });
  });

  it('should set record item to the state', () => {
    expect(historyReducer(initialState, setRecordItem(historyRecord))).toEqual({
      ...initialState,
      recordItem: historyRecord
    });
  });

  it('should set record item loading to the state', () => {
    expect(historyReducer(initialState, setRecordItemLoading(true))).toEqual({
      ...initialState,
      recordItemLoading: true
    });
  });

  it('should set history loading to the state', () => {
    expect(historyReducer(initialState, setHistoryLoading(true))).toEqual({
      ...initialState,
      historyLoading: true
    });
  });

  it('should set history error to the state', () => {
    expect(historyReducer(initialState, setHistoryError(error))).toEqual({
      ...initialState,
      historyError: error
    });
  });

  it('should clear all history filters', () => {
    expect(historyReducer(initialState, clearHistoryFilters())).toEqual({
      ...initialState,
      filters: initialFilters
    });
  });

  it('should set filter for history', () => {
    expect(
      historyReducer(initialState, setHistoryFilter(initialFilters))
    ).toEqual({
      ...initialState,
      filters: {
        ...mockInitialFilters,
        ...initialFilters
      }
    });
  });
});
