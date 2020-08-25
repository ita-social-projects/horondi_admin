import { pattern, patterns } from './pattern.mocks';
import {
  setPatternError,
  setPatternLoading,
  setPatterns,
  setPattern
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
      patterns
    });
  });
});
