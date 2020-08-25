import {
  setPattern,
  setPatterns,
  setPatternError,
  setPatternLoading,
  updatePattern,
  deletePattern,
  getPattern,
  getPatterns,
  addPattern
} from '../pattern.actions';
import {
  SET_PATTERN,
  SET_PATTERNS,
  SET_PATTERN_LOADING,
  SET_PATTERN_ERROR,
  UPDATE_PATTERN,
  DELETE_PATTERN,
  GET_PATTERN,
  GET_PATTERNS,
  ADD_PATTERN
} from '../pattern.types';
import { pattern, patternId, patterns, patternToUpdate } from './pattern.mocks';

describe('pattern actions tests', () => {
  it('should get pattern', () => {
    expect(getPattern('0c3c7929dd85de268bed4fe8')).toEqual({
      type: GET_PATTERN,
      payload: patternId
    });
  });
  it('should add pattern', () => {
    expect(addPattern(pattern)).toEqual({
      type: ADD_PATTERN,
      payload: pattern
    });
  });
  it('should set pattern', () => {
    expect(setPattern(pattern)).toEqual({
      type: SET_PATTERN,
      payload: pattern
    });
  });
  it('should get patterns', () => {
    expect(getPatterns()).toEqual({ type: GET_PATTERNS });
  });
  it('should set patterns', () => {
    expect(setPatterns(patterns)).toEqual({
      type: SET_PATTERNS,
      payload: patterns
    });
  });
  it('should set pattern loading to true', () => {
    expect(setPatternLoading(true)).toEqual({
      type: SET_PATTERN_LOADING,
      payload: true
    });
  });
  it('should set pattern error to true', () => {
    expect(setPatternError(true)).toEqual({
      type: SET_PATTERN_ERROR,
      payload: true
    });
  });
  it('should update pattern', () => {
    expect(updatePattern(patternToUpdate)).toEqual({
      type: UPDATE_PATTERN,
      payload: patternToUpdate
    });
  });
  it('should delete pattern', () => {
    const patternToDelete = '0c3c7929dd85de268bed4fe8';
    expect(deletePattern(patternToDelete)).toEqual({
      type: DELETE_PATTERN,
      payload: patternToDelete
    });
  });
});
