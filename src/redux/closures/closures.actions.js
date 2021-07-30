import {
  ADD_CLOSURE,
  GET_CLOSURES,
  SET_CLOSURES,
  SET_CLOSURES_LOADING,
  DELETE_CLOSURE,
  REMOVE_CLOSURE_FROM_STATE,
  GET_CLOSURE,
  SET_CLOSURE,
  UPDATE_CLOSURE,
  SET_CLOSURE_FILTER,
  CLEAR_FILTER
} from './closures.types';

export const addClosures = (payload) => ({
  type: ADD_CLOSURE,
  payload
});

export const getAllClosures = (payload) => ({
  type: GET_CLOSURES,
  payload
});

export const setClosures = (payload) => ({
  type: SET_CLOSURES,
  payload
});

export const setClosuresLoading = (payload) => ({
  type: SET_CLOSURES_LOADING,
  payload
});

export const deleteClosure = (payload) => ({
  type: DELETE_CLOSURE,
  payload
});

export const removeClosureFromState = (payload) => ({
  type: REMOVE_CLOSURE_FROM_STATE,
  payload
});

export const getClosure = (payload) => ({
  type: GET_CLOSURE,
  payload
});

export const setClosure = (payload) => ({
  type: SET_CLOSURE,
  payload
});

export const updateClosure = (payload) => ({
  type: UPDATE_CLOSURE,
  payload
});

export const setFilter = (filter) => ({
  type: SET_CLOSURE_FILTER,
  payload: filter
});

export const clearFilters = () => ({
  type: CLEAR_FILTER
});
