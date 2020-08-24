import {
  GET_PATTERN,
  GET_PATTERNS,
  SET_PATTERN,
  SET_PATTERNS,
  SET_PATTERN_LOADING,
  DELETE_PATTERN,
  ADD_PATTERN,
  UPDATE_PATTERN,
  SET_PATTERN_ERROR
} from './pattern.types';

const setPattern = (pattern) => ({
  type: SET_PATTERN,
  payload: pattern
});

const getPattern = (payload) => ({
  type: GET_PATTERN,
  payload
});

const deletePattern = (payload) => ({
  type: DELETE_PATTERN,
  payload
});

const addPattern = (payload) => ({
  type: ADD_PATTERN,
  payload
});

const setPatternLoading = (payload) => ({
  type: SET_PATTERN_LOADING,
  payload
});

const updatePattern = (payload) => ({
  type: UPDATE_PATTERN,
  payload
});

const setPatterns = (payload) => ({
  type: SET_PATTERNS,
  payload
});

const getPatterns = () => ({
  type: GET_PATTERNS
});

const setPatternError = (payload) => ({
  type: SET_PATTERN_ERROR,
  payload
});

export {
  setPattern,
  getPattern,
  setPatternLoading,
  deletePattern,
  addPattern,
  updatePattern,
  setPatterns,
  getPatterns,
  setPatternError
};
