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

export const getSize = (payload) => ({
  type: GET_SIZE,
  payload
});

export const setSizes = (payload) => ({
  type: SET_SIZES,
  payload
});

export const setSize = (payload) => ({
  type: SET_SIZE,
  payload
});

export const addSize = (payload) => ({
  type: ADD_SIZE,
  payload
});

export const addSizeToState = (payload) => ({
  type: ADD_SIZE_TO_STATE,
  payload
});

export const removeSizeFromState = (payload) => ({
  type: REMOVE_SIZE_FROM_STATE,
  payload
});

export const deleteSize = (payload) => ({
  type: DELETE_SIZE,
  payload
});

export const showSizeDialogWindow = (payload) => ({
  type: SHOW_SIZE_DIALOG_WINDOW,
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
