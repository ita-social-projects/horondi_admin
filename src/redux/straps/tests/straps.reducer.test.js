import strapsReducer, { initialState, selectStraps } from '../straps.reducer';
import {
  setStraps,
  setStrap,
  setFilter,
  setStrapsLoading,
  removeStrapFromState,
  clearFilters,
  setStrapsError
} from '../straps.actions';

import {
  mockStraps,
  mockStrap,
  mockId,
  mockError,
  strapFromState,
  filter,
  cleanFilter
} from './straps.variables';

describe('straps reducer tests', () => {
  it('should return initial state', () => {
    const result = strapsReducer(initialState);

    expect(result).toEqual(initialState);
  });

  it('should return state with straps', () => {
    const result = strapsReducer(initialState, setStraps(mockStraps.items));

    expect(result).toEqual({
      ...initialState,
      list: mockStraps.items
    });
  });

  it('should return state with strap', () => {
    const result = strapsReducer(initialState, setStrap(mockStrap));

    expect(result).toEqual({
      ...initialState,
      strap: mockStrap
    });
  });

  it('should remove strap from state', () => {
    initialState.list.items = mockStraps.items;

    const result = strapsReducer(initialState, removeStrapFromState(mockId));

    expect(result).toEqual({
      ...initialState,
      list: []
    });
  });

  it('should set straps filters in state', () => {
    const result = strapsReducer(initialState, setFilter(filter));

    expect(result).toEqual({
      ...initialState,
      filter
    });
  });

  it('should set straps loading in state', () => {
    const result = strapsReducer(initialState, setStrapsLoading(true));

    expect(result.strapsLoading).toBeTruthy();
  });

  it('should clear straps filter in state', () => {
    const result = strapsReducer(initialState, clearFilters());

    expect(result.filter).toEqual(cleanFilter);
  });

  it('should set straps error', () => {
    const result = strapsReducer(
      initialState,
      setStrapsError(mockError.message)
    );

    expect(result.strapsError).toBe(mockError.message);
  });

  it('should select straps', () => {
    const result = selectStraps(strapFromState);

    expect(result).toHaveProperty('strapsList');
  });
});
