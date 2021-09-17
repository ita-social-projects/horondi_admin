import {
  GET_SIZES,
  SET_SIZES,
  GET_SIZE,
  SET_SIZE,
  ADD_SIZE,
  ADD_SIZE_TO_STATE,
  UPDATE_SIZE,
  DELETE_SIZE,
  REMOVE_SIZE_FROM_STATE,
  SET_SIZES_LOADING,
  SET_SIZES_ERROR,
  SHOW_SIZE_DIALOG_WINDOW,
  CLEAR_FILTERS,
  SET_FILTER
} from './sizes.types';

export const getSizes = (payload) => ({
  type: GET_SIZES,
  payload
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

export const updateSize = (payload) => ({
  type: UPDATE_SIZE,
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

export const setSizeFilter = (payload) => ({
  type: SET_FILTER,
  payload
});

export const clearSizeFilters = () => ({
  type: CLEAR_FILTERS
});
