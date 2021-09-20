import {
  GET_BOTTOMS,
  SET_BOTTOMS,
  SET_BOTTOM_LOADING,
  DELETE_BOTTOM,
  ADD_BOTTOM,
  GET_BOTTOM,
  SET_BOTTOM,
  UPDATE_BOTTOM,
  SET_BOTTOM_ERROR,
  REMOVE_BOTTOM_FROM_STORE,
  SET_BOTTOM_FILTER,
  CLEAR_FILTERS,
  CLEAR_BOTTOM
} from './bottom.types';

export const setBottoms = (payload) => ({
  type: SET_BOTTOMS,
  payload
});

export const getBottoms = (payload) => ({
  type: GET_BOTTOMS,
  payload
});

export const deleteBottom = (payload) => ({
  type: DELETE_BOTTOM,
  payload
});

export const addBottom = (payload) => ({
  type: ADD_BOTTOM,
  payload
});

export const setBottomLoading = (payload) => ({
  type: SET_BOTTOM_LOADING,
  payload
});

export const updateBottom = (payload) => ({
  type: UPDATE_BOTTOM,
  payload
});

export const setBottom = (payload) => ({
  type: SET_BOTTOM,
  payload
});

export const getBottom = (payload) => ({
  type: GET_BOTTOM,
  payload
});

export const setBottomError = (payload) => ({
  type: SET_BOTTOM_ERROR,
  payload
});

export const removeBottomFromStore = (payload) => ({
  type: REMOVE_BOTTOM_FROM_STORE,
  payload
});

export const setFilter = (filter) => ({
  type: SET_BOTTOM_FILTER,
  payload: filter
});

export const clearFilters = () => ({
  type: CLEAR_FILTERS
});

export const clearBottom = () => ({
  type: CLEAR_BOTTOM
});
