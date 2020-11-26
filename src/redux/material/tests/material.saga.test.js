import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { combineReducers } from 'redux';
import {
  handleMaterialLoad,
  handleMaterialsLoad,
  handleMaterialUpdate,
  handleMaterialDelete,
  handleAddMaterial,
  handleAddMaterialColor,
  handleMaterialColorDelete,
  handleMaterialColorLoad,
  handleMaterialColorsLoad,
  handleMaterialError,
  handleSuccessSnackbar
} from '../material.sagas';

import {
  setMaterials,
  setMaterial,
  setMaterialError,
  setMaterialsPagesCount,
  setMaterialLoading,
  removeMaterialFromStore,
  clearColors,
  setMaterialColors,
  setMaterialColor,
  getMaterialColors,
  removeMaterialColorFromStore
} from '../material.actions';

import {
  mockId,
  mockMaterial,
  mockMaterials,
  mockMaterialState,
  mockSnackbarState,
  mockMaterialsLoadPayload,
  mockMaterialsPagesCount,
  mockColors,
  mockColorCode,
  mockColor,
  statuses,
  mockMaterialStateWithColors,
  mockColorToAdd,
  mockPayloadToDeleteColor,
  mockPayloadToUpdateMaterial,
  mockError
} from './material.variables';

import {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterialColorsById,
  getMaterialColorByCode,
  createMaterialColor,
  deleteMaterialColor
} from '../material.operations';

import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../../snackbar/snackbar.actions';

import Material from '../material.reducer';
import Snackbar from '../../snackbar/snackbar.reducer';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = statuses;

describe('Test material sagas', () => {
  it('should load all materials', () =>
    expectSaga(handleMaterialsLoad, { payload: mockMaterialsLoadPayload })
      .withReducer(combineReducers({ Material }), {
        Material: mockMaterialState
      })
      .put(setMaterialLoading(true))
      .provide([
        [
          call(
            getAllMaterials,
            mockMaterialsLoadPayload.skip,
            mockMaterialsLoadPayload.limit
          ),
          mockMaterials
        ]
      ])
      .put(setMaterialsPagesCount(mockMaterialsPagesCount))
      .put(setMaterials(mockMaterials.items))
      .put(setMaterialLoading(false))
      .hasFinalState({
        Material: {
          ...mockMaterialState,
          pagination: {
            ...mockMaterialState.pagination,
            pagesCount: mockMaterialsPagesCount
          },
          list: mockMaterials.items
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(4);
      }));

  it('should load material by id', () =>
    expectSaga(handleMaterialLoad, { payload: mockId })
      .withReducer(combineReducers({ Material }), {
        Material: mockMaterialState
      })
      .put(setMaterialLoading(true))
      .provide([[call(getMaterialById, mockId), mockMaterial]])
      .put(setMaterial(mockMaterial))
      .put(setMaterialLoading(false))
      .hasFinalState({
        Material: {
          ...mockMaterialState,
          material: mockMaterial
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));

  it('should load all material colors by id', () =>
    expectSaga(handleMaterialColorsLoad, { payload: mockId })
      .withReducer(combineReducers({ Material }), {
        Material: mockMaterialState
      })
      .put(setMaterialLoading(true))
      .provide([[call(getMaterialColorsById, mockId), mockColors]])
      .put(setMaterialColors(mockColors))
      .put(setMaterialLoading(false))
      .hasFinalState({
        Material: {
          ...mockMaterialState,
          materialColors: mockColors
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));

  it('should load material color by code', () =>
    expectSaga(handleMaterialColorLoad, { payload: mockColorCode })
      .withReducer(combineReducers({ Material }), {
        Material: mockMaterialState
      })
      .put(setMaterialLoading(true))
      .provide([[call(getMaterialColorByCode, mockColorCode), mockColor]])
      .put(setMaterialColor(mockColor))
      .put(setMaterialLoading(false))
      .hasFinalState({
        Material: {
          ...mockMaterialState,
          materialColor: mockColor
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));

  it('should add metarial', () =>
    expectSaga(handleAddMaterial, { payload: mockMaterial })
      .withReducer(combineReducers({ Material }), {
        Material: mockMaterialStateWithColors
      })
      .put(setMaterialLoading(true))
      .provide([
        [call(createMaterial, mockMaterial)],
        [call(handleSuccessSnackbar, SUCCESS_ADD_STATUS)]
      ])
      .put(clearColors())
      .put(push('/materials'))
      .hasFinalState({
        Material: {
          ...mockMaterialStateWithColors,
          materialLoading: true,
          colors: []
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));

  it('should add metarial color', () =>
    expectSaga(handleAddMaterialColor, { payload: mockColorToAdd })
      .withReducer(combineReducers({ Material }), {
        Material: mockMaterialStateWithColors
      })
      .put(setMaterialLoading(true))
      .provide([
        [call(createMaterialColor, mockColorToAdd)],
        [call(handleSuccessSnackbar, SUCCESS_ADD_STATUS)]
      ])
      .put(clearColors())
      .put(setMaterialLoading(false))
      .put(getMaterialColors(mockColorToAdd.id)) // ask Andriy about it
      .hasFinalState({
        Material: {
          ...mockMaterialStateWithColors,
          colors: []
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(4);
      }));

  it('should delete material by id', () =>
    expectSaga(handleMaterialDelete, { payload: mockId })
      .withReducer(combineReducers({ Material }), {
        Material: {
          ...mockMaterialState,
          list: mockMaterials.items
        }
      })
      .put(setMaterialLoading(true))
      .provide([
        [call(deleteMaterial, mockId)],
        [call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS)]
      ])
      .put(setMaterialLoading(false))
      .put(removeMaterialFromStore(mockId))
      .hasFinalState({
        Material: {
          ...mockMaterialState,
          list: []
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));

  it('should delete material color by code', () =>
    expectSaga(handleMaterialColorDelete, { payload: mockPayloadToDeleteColor })
      .withReducer(combineReducers({ Material }), {
        Material: {
          ...mockMaterialState,
          materialColors: {
            colors: mockColors
          }
        }
      })
      .put(setMaterialLoading(true))
      .provide([
        [call(deleteMaterialColor, mockPayloadToDeleteColor)],
        [call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS)]
      ])
      .put(setMaterialLoading(false))
      .put(removeMaterialColorFromStore(mockPayloadToDeleteColor.code))
      .hasFinalState({
        Material: {
          ...mockMaterialState,
          materialColors: {
            colors: []
          }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));

  it('should update material', () =>
    expectSaga(handleMaterialUpdate, { payload: mockPayloadToUpdateMaterial })
      .withReducer(combineReducers({ Material }), {
        Material: mockMaterialState
      })
      .put(setMaterialLoading(true))
      .provide([
        [
          call(
            updateMaterial,
            mockPayloadToUpdateMaterial.id,
            mockPayloadToUpdateMaterial.material,
            mockPayloadToUpdateMaterial.images
          )
        ],
        [call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS)]
      ])
      .put(push('/materials'))
      .hasFinalState({
        Material: {
          ...mockMaterialState,
          materialLoading: true
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(2);
      }));

  it('should handle success snackbar', () =>
    expectSaga(handleSuccessSnackbar, SUCCESS_ADD_STATUS)
      .withReducer(combineReducers({ Snackbar }), {
        Snackbar: mockSnackbarState
      })
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(SUCCESS_ADD_STATUS))
      .put(setSnackBarStatus(true))
      .hasFinalState({
        Snackbar: {
          snackBarStatus: true,
          snackBarSeverity: 'success',
          snackBarMessage: SUCCESS_ADD_STATUS
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));

  it('should handle material error', () =>
    expectSaga(handleMaterialError, mockError)
      .withReducer(combineReducers({ Material, Snackbar }), {
        Material: {
          ...mockMaterialState,
          materialLoading: true
        },
        Snackbar: mockSnackbarState
      })
      .put(setMaterialLoading(false))
      .put(setMaterialError({ e: mockError }))
      .put(setSnackBarSeverity('error'))
      .put(setSnackBarMessage(mockError.message))
      .put(setSnackBarStatus(true))
      .hasFinalState({
        Material: {
          ...mockMaterialState,
          materialLoading: false,
          materialError: { e: mockError }
        },
        Snackbar: {
          snackBarStatus: true,
          snackBarSeverity: 'error',
          snackBarMessage: mockError.message
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(5);
      }));
});
