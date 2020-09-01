import { pattern, patterns, patternToRemoveId } from './pattern.variables';
import {
  setPatternError,
  setPatternLoading,
  setPatterns,
  setPattern,
  removePatternFromStore,
  setPatternsCurrentPage,
  setPagesCount,
  setPatternsPerPage
} from '../pattern.actions';

import patternReducer, { initialState } from '../pattern.reducer';

describe('reducer tests', () => {
  it('should return default state', () => {
    expect(patternReducer()).toEqual(initialState);
  });

  it('should set pattern to store', () => {
    expect(patternReducer(initialState, setPattern(pattern))).toEqual({
      ...initialState,
      pattern
    });
  });
  it('should set pattern loading to true', () => {
    expect(patternReducer(initialState, setPatternLoading(true))).toEqual({
      ...initialState,
      patternLoading: true
    });
  });
  it('should set pattern error to true', () => {
    expect(patternReducer(initialState, setPatternError(true))).toEqual({
      ...initialState,
      patternError: true
    });
  });
  it('should set patterns to store', () => {
    expect(patternReducer(initialState, setPatterns(patterns))).toEqual({
      ...initialState,
      list: patterns
    });
  });
  it('should remove pattern from store', () => {
    const state = { ...initialState, list: patterns };
    const filteredPatterns = patterns.filter(
      (pattern) => pattern._id !== patternToRemoveId
    );
    expect(
      patternReducer(state, removePatternFromStore(patternToRemoveId))
    ).toEqual({
      ...state,
      list: filteredPatterns
    });
  });
  it('should set current page', () => {
    expect(patternReducer(initialState, setPatternsCurrentPage(5))).toEqual({
      ...initialState,
      pagination: {
        currentPage: 4,
        pagesCount: 1,
        patternsPerPage: 6
      }
    });
  });
  it('should set pages count', () => {
    expect(patternReducer(initialState, setPagesCount(11))).toEqual({
      ...initialState,
      pagination: {
        currentPage: 0,
        pagesCount: 11,
        patternsPerPage: 6
      }
    });
  });
  it('should set patterns per page', () => {
    expect(patternReducer(initialState, setPatternsPerPage(18))).toEqual({
      ...initialState,
      pagination: {
        currentPage: 0,
        pagesCount: 1,
        patternsPerPage: 18
      }
    });
  });
});
