import {
  ADD_POCKET,
  GET_POCKETS,
  SET_POCKETS,
  SET_POCKETS_LOADING,
  DELETE_POCKET,
  REMOVE_POCKET_FROM_STATE,
  GET_POCKET,
  SET_POCKET,
  UPDATE_POCKET,
  SET_POCKETS_FILTER,
  CLEAR_POCKETS_FILTER
} from './pockets.types';

export const addPockets = (payload) => ({
  type: ADD_POCKET,
  payload
});

export const getAllPockets = (payload) => ({
  type: GET_POCKETS,
  payload
});

export const setPockets = (payload) => ({
  type: SET_POCKETS,
  payload
});

export const setPocketsLoading = (payload) => ({
  type: SET_POCKETS_LOADING,
  payload
});

export const deletePocket = (payload) => ({
  type: DELETE_POCKET,
  payload
});

export const removePocketFromState = (payload) => ({
  type: REMOVE_POCKET_FROM_STATE,
  payload
});

export const getPocket = (payload) => ({
  type: GET_POCKET,
  payload
});

export const setPocket = (payload) => ({
  type: SET_POCKET,
  payload
});

export const updatePocket = (payload) => ({
  type: UPDATE_POCKET,
  payload
});

export const setFilter = (filter) => ({
  type: SET_POCKETS_FILTER,
  payload: filter
});

export const clearFilters = () => ({
  type: CLEAR_POCKETS_FILTER
});
