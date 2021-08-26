import {
  setPattern,
  setPatterns,
  setPatternError,
  setPatternLoading,
  updatePattern,
  deletePattern,
  getPattern,
  getPatterns,
  addPattern,
  removePatternFromStore
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
  ADD_PATTERN,
  REMOVE_PATTERN_FROM_STORE
} from '../pattern.types';
import { mockPatterns, mockId } from './pattern.variables';

describe('pattern actions tests', () => {
  it('should get pattern', () => {
    expect(getPattern(mockId)).toEqual({
      type: GET_PATTERN,
      payload: mockId
    });
  });
  it('should add pattern', () => {
    expect(addPattern(mockPatterns.items[0])).toEqual({
      type: ADD_PATTERN,
      payload: mockPatterns.items[0]
    });
  });
  it('should set pattern', () => {
    expect(setPattern(mockPatterns.items[0])).toEqual({
      type: SET_PATTERN,
      payload: mockPatterns.items[0]
    });
  });
  it('should get patterns', () => {
    expect(getPatterns()).toEqual({ type: GET_PATTERNS });
  });
  it('should set patterns', () => {
    expect(setPatterns(mockPatterns.list)).toEqual({
      type: SET_PATTERNS,
      payload: mockPatterns.list
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
    expect(updatePattern(mockPatterns.items[0])).toEqual({
      type: UPDATE_PATTERN,
      payload: mockPatterns.items[0]
    });
  });
  it('should delete pattern', () => {
    const patternToDelete = mockId;
    expect(deletePattern(patternToDelete)).toEqual({
      type: DELETE_PATTERN,
      payload: patternToDelete
    });
  });
  it('should remove pattern by id from store', () => {
    expect(removePatternFromStore(mockId)).toEqual({
      type: REMOVE_PATTERN_FROM_STORE,
      payload: mockId
    });
  });
});
