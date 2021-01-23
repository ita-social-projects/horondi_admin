import {
  GET_COLORS,
  GET_COLOR,
  SET_COLORS,
  SET_COLOR,
  ADD_COLOR,
  ADD_COLOR_TO_STATE,
  DELETE_COLOR,
  REMOVE_COLOR_FROM_STATE,
  SET_COLORS_LOADING,
  SET_COLORS_ERROR,
  SHOW_COLOR_DIALOG_WINDOW,
  SHOW_BOUND_MATERIALS_WINDOW,
  SET_BOUND_MATERIALS
} from '../color.types';

import {
  getColors,
  getColor,
  setColors,
  setColor,
  addColor,
  addColorToState,
  deleteColor,
  removeColorFromState,
  setColorsLoading,
  setColorsError,
  showColorDialogWindow,
  showBoundMaterialsWindow,
  setBoundMaterials
} from '../color.actions';

import { oneColor, colorsArr, error, boundMaterials } from './color.variables';

describe('color action tests', () => {
  it('should get colors', () => {
    expect(getColors()).toEqual({ type: GET_COLORS });
  });

  it('should get one color', () => {
    expect(getColor(oneColor)).toEqual({
      type: GET_COLOR,
      payload: oneColor
    });
  });

  it('should set colors', () => {
    expect(setColors(colorsArr)).toEqual({
      type: SET_COLORS,
      payload: colorsArr
    });
  });

  it('should set color', () => {
    expect(setColor(oneColor)).toEqual({
      type: SET_COLOR,
      payload: oneColor
    });
  });

  it('should add color', () => {
    expect(addColor(oneColor)).toEqual({
      type: ADD_COLOR,
      payload: oneColor
    });
  });

  it('should add color to state', () => {
    expect(addColorToState(oneColor)).toEqual({
      type: ADD_COLOR_TO_STATE,
      payload: oneColor
    });
  });

  it('should delete color', () => {
    expect(deleteColor(oneColor)).toEqual({
      type: DELETE_COLOR,
      payload: oneColor
    });
  });

  it('should remove color from state', () => {
    expect(removeColorFromState(oneColor)).toEqual({
      type: REMOVE_COLOR_FROM_STATE,
      payload: oneColor
    });
  });

  it('should set colors loading', () => {
    expect(setColorsLoading(true)).toEqual({
      type: SET_COLORS_LOADING,
      payload: true
    });
  });

  it('should set colors error', () => {
    expect(setColorsError(error)).toEqual({
      type: SET_COLORS_ERROR,
      payload: error
    });
  });

  it('should show color dialod window', () => {
    expect(showColorDialogWindow(true)).toEqual({
      type: SHOW_COLOR_DIALOG_WINDOW,
      payload: true
    });
  });

  it('should show bond materials window', () => {
    expect(showBoundMaterialsWindow(true)).toEqual({
      type: SHOW_BOUND_MATERIALS_WINDOW,
      payload: true
    });
  });

  it('should set bound materials', () => {
    expect(setBoundMaterials(boundMaterials)).toEqual({
      type: SET_BOUND_MATERIALS,
      payload: boundMaterials
    });
  });
});
