import {
  GET_PATTERNS,
  SET_PATTERNS,
  SET_PATTERN_LOADING,
  DELETE_PATTERN,
  ADD_PATTERN,
  GET_PATTERN,
  SET_PATTERN,
  UPDATE_PATTERN,
  SET_PATTERN_ERROR,
  REMOVE_PATTERN_FROM_STORE,
  SET_PATTERN_FILTER,
  SET_PATTERN_SORT,
  CLEAR_PATTERN_FILTERS,
  SET_PATTERN_SORT_LABEL
} from './pattern.types';

export const setPatterns = (payload) => ({
  type: SET_PATTERNS,
  payload
});

export const getPatterns = (payload) => ({
  type: GET_PATTERNS,
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

export const setPattern = (payload) => ({
  type: SET_PATTERN,
  payload
});

export const getPattern = (payload) => ({
  type: GET_PATTERN,
  payload
});

export const setPatternError = (payload) => ({
  type: SET_PATTERN_ERROR,
  payload
});

export const removePatternFromStore = (payload) => ({
  type: REMOVE_PATTERN_FROM_STORE,
  payload
});

export const setPatternSortLabel = (payload) => ({
  type: SET_PATTERN_SORT_LABEL,
  payload
});

export const setPatternSort = (sort) => ({
  type: SET_PATTERN_SORT,
  payload: sort
});

export const setPatternFilter = (filter) => ({
  type: SET_PATTERN_FILTER,
  payload: filter
});

export const clearPatternFilters = () => ({
  type: CLEAR_PATTERN_FILTERS
});
