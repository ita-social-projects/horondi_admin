import {
  ADD_BASIC,
  GET_BASICS,
  SET_BASICS,
  SET_BASICS_LOADING,
  DELETE_BASIC,
  REMOVE_BASIC,
  GET_BASIC,
  SET_BASIC,
  UPDATE_BASIC,
  SET_BASICS_FILTER,
  CLEAR_FILTER,
  SET_BASIC_ERROR
} from './basics.types';

export const addBasic = (payload) => ({
  type: ADD_BASIC,
  payload
});

export const getAllBasics = (payload) => ({
  type: GET_BASICS,
  payload
});

export const setBasics = (payload) => ({
  type: SET_BASICS,
  payload
});

export const setBasicsLoading = (payload) => ({
  type: SET_BASICS_LOADING,
  payload
});

export const deleteBasic = (payload) => ({
  type: DELETE_BASIC,
  payload
});

export const removeBasicFromState = (payload) => ({
  type: REMOVE_BASIC,
  payload
});

export const getBasic = (payload) => ({
  type: GET_BASIC,
  payload
});

export const setBasic = (payload) => ({
  type: SET_BASIC,
  payload
});

export const updateBasic = (payload) => ({
  type: UPDATE_BASIC,
  payload
});

export const setBasicError = (payload) => ({
  type: SET_BASIC_ERROR,
  payload
});

export const setFilter = (filter) => ({
  type: SET_BASICS_FILTER,
  payload: filter
});

export const clearFilters = () => ({
  type: CLEAR_FILTER
});
