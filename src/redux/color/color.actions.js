import {
  GET_COLORS,
  GET_COLOR,
  SET_COLORS,
  SET_COLOR,
  ADD_COLOR,
  DELETE_COLOR,
  REMOVE_COLOR_FROM_STATE,
  SET_COLORS_LOADING,
  SET_COLORS_ERROR,
  ADD_COLOR_TO_STATE,
  SHOW_COLOR_DIALOG_WINDOW,
  SHOW_BOUND_MATERIALS_WINDOW,
  SET_BOUND_MATERIALS
} from './color.types';

export const getColors = () => ({
  type: GET_COLORS
  // maybe make sense to add filters to backend
});

export const getColor = (payload) => ({
  type: GET_COLOR,
  payload
});

export const setColors = (payload) => ({
  type: SET_COLORS,
  payload
});

export const setColor = (payload) => ({
  type: SET_COLOR,
  payload
});

export const addColor = (payload) => ({
  type: ADD_COLOR,
  payload
});

export const addColorToState = (payload) => ({
  type: ADD_COLOR_TO_STATE,
  payload
});

export const deleteColor = (payload) => ({
  type: DELETE_COLOR,
  payload
});

export const removeColorFromState = (payload) => ({
  type: REMOVE_COLOR_FROM_STATE,
  payload
});

export const setColorsLoading = (payload) => ({
  type: SET_COLORS_LOADING,
  payload
});

export const setColorsError = (payload) => ({
  type: SET_COLORS_ERROR,
  payload
});

export const showColorDialogWindow = (payload) => ({
  type: SHOW_COLOR_DIALOG_WINDOW,
  payload
});

export const showBoundMaterialsWindow = (payload) => ({
  type: SHOW_BOUND_MATERIALS_WINDOW,
  payload
});

export const setBoundMaterials = (payload) => ({
  type: SET_BOUND_MATERIALS,
  payload
});
