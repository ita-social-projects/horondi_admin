import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';

import { combineReducers } from 'redux';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../../snackbar/snackbar.sagas';

import {
  handleColorLoad,
  handleColorsLoad,
  handleCreateColor,
  handleDeleteColor,
  handleColorError
} from '../../color/color.sagas';

import {
  setColorsLoading,
  setColor,
  setColors,
  addColorToState,
  showColorDialogWindow,
  removeColorFromState,
  setBoundMaterials,
  showBoundMaterialsWindow,
  setColorsError
} from '../../color/color.actions';

import {
  getAllColors,
  createColor,
  getColorById,
  deleteColor
} from '../../color/color.operations';

import Color from '../../color/color.reducer';

import {
  mockColorsState,
  colors,
  colorId,
  oneColor,
  statuses,
  materials,
  error
} from './color.variables';

const { SUCCESS_ADD_STATUS, SUCCESS_DELETE_STATUS } = statuses;

describe('Test color saga', () => {
  it('should load all colors', () => {
    expectSaga(handleColorsLoad)
      .withReducer(combineReducers({ Color }), { Color: mockColorsState })
      .put(setColorsLoading(true))
      .provide([[call(getAllColors), colors]])
      .put(setColors(colors))
      .put(setColorsLoading(false))
      .hasFinalState({
        Color: {
          ...mockColorsState,
          list: colors
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);
      });
  });

  it('should load color by ID', () => {
    expectSaga(handleColorLoad, { payload: colorId })
      .withReducer(combineReducers({ Color }), { Color: mockColorsState })
      .put(setColorsLoading(true))
      .provide([[call(getColorById, colorId), oneColor]])
      .put(setColor(oneColor))
      .put(setColorsLoading(false))
      .hasFinalState({
        Color: {
          ...mockColorsState,
          color: oneColor
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);
      });
  });

  it('should add color by input data', () => {
    expectSaga(handleCreateColor, { payload: oneColor })
      .withReducer(combineReducers({ Color }), {
        Color: mockColorsState
      })
      .put(setColorsLoading(true))
      .provide([
        [call(createColor, oneColor), oneColor],
        [call(handleSuccessSnackbar, SUCCESS_ADD_STATUS)]
      ])
      .put(addColorToState(oneColor))
      .put(showColorDialogWindow(false))
      .put(setColorsLoading(false))
      .hasFinalState({
        Color: {
          ...mockColorsState,
          list: [oneColor]
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(2);
      });
  });

  it('should delete color if there is ID ', () => {
    expectSaga(handleDeleteColor, { payload: colorId })
      .withReducer(combineReducers({ Color }), {
        Color: {
          ...mockColorsState,
          list: [oneColor]
        }
      })
      .put(setColorsLoading(true))
      .provide([
        [call(deleteColor, colorId), { _id: colorId }],
        [call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS)]
      ])
      .put(removeColorFromState(colorId))
      .put(setColorsLoading(false))
      .hasFinalState({
        Color: {
          ...mockColorsState,
          list: []
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(2);
      });
  });

  it('should response materials if color is in material', () => {
    expectSaga(handleDeleteColor, { payload: colorId })
      .withReducer(combineReducers({ Color }), {
        Color: {
          ...mockColorsState,
          list: [oneColor]
        }
      })
      .put(setColorsLoading(true))
      .provide([[call(deleteColor, colorId), materials]])
      .put(setBoundMaterials(materials))
      .put(showBoundMaterialsWindow(true))
      .put(setColorsLoading(false))
      .hasFinalState({
        Color: {
          ...mockColorsState,
          list: [oneColor],
          boundMaterials: materials,
          showBoundMaterialsWindow: true
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(1);
      });
  });

  it('should handle color error', () => {
    expectSaga(handleColorError, error)
      .withReducer(combineReducers({ Color }), {
        Color: {
          ...mockColorsState,
          colorLoading: true
        }
      })
      .provide([[call(handleErrorSnackbar, error.message)]])
      .put(setColorsLoading(false))
      .put(setColorsError({ e: error }))
      .hasFinalState({
        Color: {
          ...mockColorsState,
          colorLoading: false,
          colorError: { e: error }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(2);
        expect(analysisCall).toHaveLength(1);
      });
  });
});
