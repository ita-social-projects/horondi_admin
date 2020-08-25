import {
  GET_PATTERN,
  GET_PATTERNS,
  SET_PATTERN,
  SET_PATTERNS,
  SET_PATTERN_LOADING,
  DELETE_PATTERN,
  ADD_PATTERN,
  UPDATE_PATTERN,
  SET_PATTERN_ERROR,
  REMOVE_PATTERN_FROM_STORE
} from './pattern.types';

export const setPattern = (payload) => ({
  type: SET_PATTERN,
  payload
});

export const getPattern = (payload) => ({
  type: GET_PATTERN,
  payload
});

export const deletePattern = (payload) => ({
  type: DELETE_PATTERN,
  payload
});

export const addPattern = (payload) => ({
  type: ADD_PATTERN,
  payload
});

export const setPatternLoading = (payload) => ({
  type: SET_PATTERN_LOADING,
  payload
});

export const updatePattern = (payload) => ({
  type: UPDATE_PATTERN,
  payload
});

export const setPatterns = (payload) => ({
  type: SET_PATTERNS,
  payload
});

export const getPatterns = () => ({
  type: GET_PATTERNS
});

export const setPatternError = (payload) => ({
  type: SET_PATTERN_ERROR,
  payload
});

export const removePatternFromStore = (payload) => ({
  type: REMOVE_PATTERN_FROM_STORE,
  payload
});
