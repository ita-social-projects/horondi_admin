import { ADD_SIZE, SET_SIZE_LOADING, SAVE_SIZE_IN_REDUX } from './sizes.types';

export const addSize = (payload) => ({
  type: ADD_SIZE,
  payload
});

export const saveSizeInRedux = (payload) => ({
  type: SAVE_SIZE_IN_REDUX,
  payload
});

export const setSizeLoading = (payload) => ({
  type: SET_SIZE_LOADING,
  payload
});
