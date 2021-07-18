import backReducer, { initialState } from '../back.reducer';
import {
  mockBacks,
  mockId,
  filter,
  mockInitialFilters,
  mockBacksLoadPayload
} from './back.variables';
import {
  setBackError,
  setBackLoading,
  setBacks,
  setBack,
  removeBackFromStore,
  clearFilters,
  setFilter,
  clearBack
} from '../back.actions';

describe('reducer tests', () => {
  it('should return default state', () => {
    expect(backReducer()).toEqual(initialState);
  });

  it('should set back to store', () => {
    expect(backReducer(initialState, setBack(mockBacks.items[0]))).toEqual({
      ...initialState,
      back: mockBacks.items[0]
    });
  });
  it('should set back loading to true', () => {
    expect(backReducer(initialState, setBackLoading(true))).toEqual({
      ...initialState,
      backLoading: true
    });
  });
  it('should set back error to true', () => {
    expect(backReducer(initialState, setBackError(true))).toEqual({
      ...initialState,
      backError: true
    });
  });
  it('should set backs to store', () => {
    expect(backReducer(initialState, setBacks(mockBacks.items))).toEqual({
      ...initialState,
      list: mockBacks.items
    });
  });
  it('should remove back from store', () => {
    const state = { ...initialState, list: mockBacks.items };
    const filteredBacks = mockBacks.items.filter(
      (backEl) => backEl._id !== mockId
    );
    expect(backReducer(state, removeBackFromStore(mockId))).toEqual({
      ...state,
      list: filteredBacks
    });
  });
  it('should set filter for backs', () => {
    expect(backReducer(initialState, setFilter(filter))).toEqual({
      ...initialState,
      filters: {
        ...mockInitialFilters,
        ...filter
      }
    });
  });
  it('should clear back', () => {
    expect(backReducer(initialState, clearBack())).toEqual({
      ...initialState,
      back: null
    });
  });

  it('should clear all backs filters', () => {
    expect(backReducer(initialState, clearFilters())).toEqual({
      ...initialState,
      filters: mockBacksLoadPayload.filters
    });
  });
});
