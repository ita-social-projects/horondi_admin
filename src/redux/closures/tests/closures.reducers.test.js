import closureReducer, { initialState } from '../closures.reducer';
import {
  mockClosures,
  mockId,
  filter,
  mockInitialFilters
} from './mockClosures';
import {
  setClosuresLoading,
  setClosures,
  setClosure,
  removeClosureFromState,
  clearFilters,
  setFilter
} from '../closures.actions';

describe('reducer tests', () => {
  it('should return default state', () => {
    expect(closureReducer()).toEqual(initialState);
  });

  it('should set closure to store', () => {
    expect(
      closureReducer(initialState, setClosure(mockClosures.items[0]))
    ).toEqual({
      ...initialState,
      closure: mockClosures.items[0]
    });
  });
  it('should set closure loading to true', () => {
    expect(closureReducer(initialState, setClosuresLoading(true))).toEqual({
      ...initialState,
      closuresLoading: true
    });
  });

  it('should set closures to state', () => {
    expect(
      closureReducer(initialState, setClosures(mockClosures.items))
    ).toEqual({
      ...initialState,
      list: mockClosures.items
    });
  });

  it.skip('should remove closure from state', () => {
    const state = { ...initialState, list: mockClosures.items };

    const filteredClosures = mockClosures.items.filter(
      (closureEl) => closureEl._id !== mockId
    );
    expect(closureReducer(state, removeClosureFromState(mockId))).toEqual({
      ...state,
      list: filteredClosures
    });
  });

  it('should set filter for closures', () => {
    expect(closureReducer(initialState, setFilter(filter))).toEqual({
      ...initialState,
      filter: {
        ...mockInitialFilters,
        ...filter
      }
    });
  });

  it('should clear all closures filters', () => {
    expect(closureReducer(initialState, clearFilters())).toEqual({
      ...initialState,
      filter: mockInitialFilters
    });
  });
});
