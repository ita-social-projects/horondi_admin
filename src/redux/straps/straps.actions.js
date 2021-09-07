import {
  ADD_STRAP,
  GET_STRAPS,
  SET_STRAPS,
  SET_STRAPS_LOADING,
  DELETE_STRAP,
  REMOVE_STRAP_FROM_STATE,
  GET_STRAP,
  SET_STRAP,
  UPDATE_STRAP,
  SET_STRAPS_FILTER,
  CLEAR_STRAPS_FILTER
} from './straps.types';

export const addStraps = (payload) => ({
  type: ADD_STRAP,
  payload
});

export const getAllStraps = (payload) => ({
  type: GET_STRAPS,
  payload
});

export const setStraps = (payload) => ({
  type: SET_STRAPS,
  payload
});

export const setStrapsLoading = (payload) => ({
  type: SET_STRAPS_LOADING,
  payload
});

export const deleteStrap = (payload) => ({
  type: DELETE_STRAP,
  payload
});

export const removeStrapFromState = (payload) => ({
  type: REMOVE_STRAP_FROM_STATE,
  payload
});

export const getStrap = (payload) => ({
  type: GET_STRAP,
  payload
});

export const setStrap = (payload) => ({
  type: SET_STRAP,
  payload
});

export const updateStrap = (payload) => ({
  type: UPDATE_STRAP,
  payload
});

export const setFilter = (filter) => ({
  type: SET_STRAPS_FILTER,
  payload: filter
});

export const clearFilters = () => ({
  type: CLEAR_STRAPS_FILTER
});
