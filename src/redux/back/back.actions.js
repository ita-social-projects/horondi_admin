import {
  GET_BACKS,
  SET_BACKS,
  SET_BACK_LOADING,
  DELETE_BACK,
  ADD_BACK,
  GET_BACK,
  SET_BACK,
  UPDATE_BACK,
  SET_BACK_ERROR,
  REMOVE_BACK_FROM_STORE,
  SET_BACK_FILTER,
  SET_SORT,
  CLEAR_FILTERS,
  CLEAR_BACK
} from './back.types';

export const setBacks = (payload) => ({
  type: SET_BACKS,
  payload
});

export const getBacks = (payload) => ({
  type: GET_BACKS,
  payload
});

export const deleteBack = (payload) => ({
  type: DELETE_BACK,
  payload
});

export const addBack = (payload) => ({
  type: ADD_BACK,
  payload
});

export const setBackLoading = (payload) => ({
  type: SET_BACK_LOADING,
  payload
});

export const updateBack = (payload) => ({
  type: UPDATE_BACK,
  payload
});

export const setBack = (payload) => ({
  type: SET_BACK,
  payload
});

export const getBack = (payload) => ({
  type: GET_BACK,
  payload
});

export const setBackError = (payload) => ({
  type: SET_BACK_ERROR,
  payload
});

export const removeBackFromStore = (payload) => ({
  type: REMOVE_BACK_FROM_STORE,
  payload
});

export const setSort = (sort) => ({
  type: SET_SORT,
  payload: sort
});

export const setFilter = (filter) => ({
  type: SET_BACK_FILTER,
  payload: filter
});

export const clearFilters = () => ({
  type: CLEAR_FILTERS
});

export const clearBack = () => ({
  type: CLEAR_BACK
});
