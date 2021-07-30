import {
  ADD_POSITION,
  GET_POSITIONS,
  SET_POSITIONS,
  SET_POSITIONS_LOADING,
  DELETE_POSITION,
  SET_POSITIONS_FILTER,
  CLEAR_POSITIONS_FILTER,
  REMOVE_POSITION_FROM_STATE,
  GET_POSITION,
  SET_POSITION,
  UPDATE_POSITION
} from './position.types';

export const addPosition = (payload) => ({
  type: ADD_POSITION,
  payload
});

export const getAllPositions = (payload) => ({
  type: GET_POSITIONS,
  payload
});

export const setPositions = (payload) => ({
  type: SET_POSITIONS,
  payload
});

export const setPositionsLoading = (payload) => ({
  type: SET_POSITIONS_LOADING,
  payload
});

export const deletePosition = (payload) => ({
  type: DELETE_POSITION,
  payload
});

export const removePositionFromState = (payload) => ({
  type: REMOVE_POSITION_FROM_STATE,
  payload
});

export const setFilter = (filter) => ({
  type: SET_POSITIONS_FILTER,
  payload: filter
});

export const clearFilters = () => ({
  type: CLEAR_POSITIONS_FILTER
});

export const getPosition = (payload) => ({
  type: GET_POSITION,
  payload
});

export const setPosition = (payload) => ({
  type: SET_POSITION,
  payload
});

export const updatePosition = (payload) => ({
  type: UPDATE_POSITION,
  payload
});
