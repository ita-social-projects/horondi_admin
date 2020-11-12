import {
  GET_HEADERS,
  SET_HEADERS,
  SET_HEADER_LOADING,
  DELETE_HEADER,
  ADD_HEADER,
  GET_HEADER,
  SET_HEADER,
  UPDATE_HEADER,
  SET_HEADER_ERROR,
  REMOVE_HEADER_FROM_STORE
} from './header.types';

export const setHeaders = (payload) => ({
  type: SET_HEADERS,
  payload
});

export const getHeaders = () => ({
  type: GET_HEADERS
});

export const deleteHeader = (payload) => ({
  type: DELETE_HEADER,
  payload
});

export const addHeader = (payload) => ({
  type: ADD_HEADER,
  payload
});

export const setHeaderLoading = (payload) => ({
  type: SET_HEADER_LOADING,
  payload
});

export const updateHeader = (payload) => ({
  type: UPDATE_HEADER,
  payload
});

export const setHeader = (payload) => ({
  type: SET_HEADER,
  payload
});

export const getHeader = (payload) => ({
  type: GET_HEADER,
  payload
});

export const setHeaderError = (payload) => ({
  type: SET_HEADER_ERROR,
  payload
});

export const removeHeaderFromStore = (payload) => ({
  type: REMOVE_HEADER_FROM_STORE,
  payload
});
