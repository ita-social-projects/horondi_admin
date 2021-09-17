import { mockPatterns, mockId } from './pattern.variables';
import {
  setPatternError,
  setPatternLoading,
  setPatterns,
  setPattern,
  removePatternFromStore
} from '../pattern.actions';

import patternReducer, { initialState } from '../pattern.reducer';

describe('reducer tests', () => {
  it.skip('should return default state', () => {
    expect(patternReducer()).toEqual(initialState);
  });

  it.skip('should set pattern to store', () => {
    expect(
      patternReducer(initialState, setPattern(mockPatterns.items[0]))
    ).toEqual({
      ...initialState,
      pattern: mockPatterns.items[0]
    });
  });
  it.skip('should set pattern loading to true', () => {
    expect(patternReducer(initialState, setPatternLoading(true))).toEqual({
      ...initialState,
      patternLoading: true
    });
  });
  it.skip('should set pattern error to true', () => {
    expect(patternReducer(initialState, setPatternError(true))).toEqual({
      ...initialState,
      patternError: true
    });
  });
  it.skip('should set patterns to store', () => {
    expect(
      patternReducer(initialState, setPatterns(mockPatterns.items))
    ).toEqual({
      ...initialState,
      list: mockPatterns.items
    });
  });
  it.skip('should remove pattern from store', () => {
    const state = { ...initialState, list: mockPatterns.items };
    const filteredPatterns = mockPatterns.items.filter(
      (patternEl) => patternEl._id !== mockId
    );
    expect(patternReducer(state, removePatternFromStore(mockId))).toEqual({
      ...state,
      list: filteredPatterns
    });
  });
});
