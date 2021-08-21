import {
  oneColor,
  colorsArr,
  boundMaterials,
  colorId,
  error
} from './color.variables';

import {
  setColors,
  setColor,
  removeColorFromState,
  setColorsLoading,
  setColorsError,
  addColorToState,
  showColorDialogWindow,
  showBoundMaterialsWindow,
  setBoundMaterials
} from '../../color/color.actions';

import colorReducer, { initialState } from '../../color/color.reducer';

describe('color reducer tests', () => {
  it('should return default state', () => {
    expect(colorReducer()).toEqual(initialState);
  });

  it('should set color to the state', () => {
    expect(colorReducer(initialState, setColor(oneColor))).toEqual({
      ...initialState,
      color: oneColor
    });
  });

  it('should set colors to the state', () => {
    expect(colorReducer(initialState, setColors(colorsArr))).toEqual({
      ...initialState,
      list: colorsArr
    });
  });

  it('should remove color from the state', () => {
    const state = { ...initialState, list: colorsArr };
    const filteredColors = colorsArr.filter(
      (colorEl) => colorEl._id !== colorId
    );
    expect(colorReducer(state, removeColorFromState(oneColor._id))).toEqual({
      ...state,
      list: filteredColors
    });
  });

  it('should set colors loading', () => {
    expect(colorReducer(initialState, setColorsLoading(true))).toEqual({
      ...initialState,
      colorLoading: true
    });
  });

  it('should set colors error to true', () => {
    expect(colorReducer(initialState, setColorsError(error))).toEqual({
      ...initialState,
      colorError: error
    });
  });

  it('should add color to state', () => {
    expect(colorReducer(initialState, addColorToState(oneColor))).toEqual({
      ...initialState,
      list: [oneColor]
    });
  });

  it('should show color dialog window', () => {
    expect(colorReducer(initialState, showColorDialogWindow(true))).toEqual({
      ...initialState,
      showColorDialogWindow: true
    });
  });

  it('should show bound material window', () => {
    expect(colorReducer(initialState, showBoundMaterialsWindow(true))).toEqual({
      ...initialState,
      showBoundMaterialsWindow: true
    });
  });

  it('should set bound materials', () => {
    expect(
      colorReducer(initialState, setBoundMaterials(boundMaterials))
    ).toEqual({
      ...initialState,
      boundMaterials
    });
  });
});
