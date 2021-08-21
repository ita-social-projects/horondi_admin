import closuresReducer, { initialState } from '../../closures/closures.reducer';
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
  setFilter,
  setClosureError
} from '../../closures/closures.actions';

describe('reducer tests', () => {
  it('should return default state', () => {
    expect(closuresReducer()).toEqual(initialState);
  });

  it('should set closure to store', () => {
    expect(
      closuresReducer(initialState, setClosure(mockClosures.items[0]))
    ).toEqual({
      ...initialState,
      closure: mockClosures.items[0]
    });
  });
  it('should set closure loading to true', () => {
    expect(closuresReducer(initialState, setClosuresLoading(true))).toEqual({
      ...initialState,
      closuresLoading: true
    });
  });

  it('should set closures to state', () => {
    expect(
      closuresReducer(initialState, setClosures(mockClosures.items))
    ).toEqual({
      ...initialState,
      list: mockClosures.items
    });
  });

  it('should remove closure from store', () => {
    const state = { ...initialState, list: mockClosures };
    const filteredClosures = mockClosures.items.filter(
      (closureEl) => closureEl._id !== mockId
    );
    expect(closuresReducer(state, removeClosureFromState(mockId))).toEqual({
      ...state,
      list: filteredClosures
    });
  });

  it('should set filter for closures', () => {
    expect(closuresReducer(initialState, setFilter(filter))).toEqual({
      ...initialState,
      filter: {
        ...mockInitialFilters,
        ...filter
      }
    });
  });

  it('should clear all closures filters', () => {
    expect(closuresReducer(initialState, clearFilters())).toEqual({
      ...initialState,
      filter: mockInitialFilters
    });
  });

  it('should set closures error to true', () => {
    expect(closuresReducer(initialState, setClosureError(true))).toEqual({
      ...initialState,
      closuresError: true
    });
  });
});
