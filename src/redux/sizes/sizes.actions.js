import {
  GET_SIZES,
  SET_SIZES,
  GET_SIZE,
  SET_SIZE,
  ADD_SIZE,
  ADD_SIZE_TO_STATE,
  DELETE_SIZE,
  REMOVE_SIZE_FROM_STATE,
  SET_SIZES_LOADING,
  SET_SIZES_ERROR,
  SHOW_SIZE_DIALOG_WINDOW
} from './sizes.types';

export const getSizes = () => ({
  type: GET_SIZES
});
export const setSizes = (payload) => ({
  type: SET_SIZES,
  payload
});

export const setSizesLoading = (payload) => ({
  type: SET_SIZES_LOADING,
  payload
});
export const setSizesError = (payload) => ({
  type: SET_SIZES_ERROR,
  payload
});
