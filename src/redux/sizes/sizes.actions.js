import { ADD_SIZE, SET_SIZE_LOADING } from './sizes.types';

export const addSize = (payload) => ({
  type: ADD_SIZE,
  payload
});

export const setSizeLoading = (payload) => ({
  type: SET_SIZE_LOADING,
  payload
});
