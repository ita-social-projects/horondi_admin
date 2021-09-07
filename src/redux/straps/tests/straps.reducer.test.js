import strapsReducer, { initialState, selectStraps } from '../straps.reducer';
import {
  setStraps,
  setStrap,
  setFilter,
  setStrapsLoading,
  removeStrapFromState,
  clearFilters
} from '../straps.actions';
import {
  actionsPayload,
  strapItems,
  strapFromState,
  filter,
  clearFilter
} from './straps.variables';

describe('straps reducer tests', () => {
  it('should return initial state', () => {
    const result = strapsReducer(initialState);

    expect(result).toEqual(initialState);
  });

  it('should return state with straps', () => {
    const result = strapsReducer(initialState, setStraps(strapItems));

    expect(result).toEqual({
      ...initialState,
      list: strapItems
    });
  });

  it('should return state with strap', () => {
    const result = strapsReducer(initialState, setStrap(actionsPayload));

    expect(result).toEqual({
      ...initialState,
      strap: actionsPayload
    });
  });

  it('should remove strap from state', () => {
    initialState.list.items = strapItems;

    const result = strapsReducer(initialState, removeStrapFromState(1));

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

    expect(result.filter).toEqual(clearFilter);
  });

  it('should select straps', () => {
    const result = selectStraps(strapFromState);

    expect(result).toHaveProperty('strapsList');
  });
});
