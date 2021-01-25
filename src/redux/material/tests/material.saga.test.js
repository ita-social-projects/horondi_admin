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
  handleMaterialError
} from '../material.sagas';

import {
  setMaterials,
  setMaterial,
  setMaterialError,
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
  mockMaterialsLoadPayload,
  mockColors,
  mockColorCode,
  mockColor,
  statuses,
  mockMaterialStateWithColors,
  mockColorToAdd,
  mockPayloadToDeleteColor,
  mockPayloadToUpdateMaterial,
  mockError,
  mockTableState
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
import { setItemsCount, updatePagination } from '../../table/table.actions';

import Material from '../material.reducer';
import Table from '../../table/table.reducer';

import { handleSuccessSnackbar } from '../../snackbar/snackbar.sagas';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = statuses;

describe('Test material sagas', () => {
  it('should load all materials', () =>
    expectSaga(handleMaterialsLoad, { payload: mockMaterialsLoadPayload })
      .withReducer(combineReducers({ Material, Table }), {
        Material: mockMaterialState,
        Table: mockTableState
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
      .put(setItemsCount(mockMaterials.count))
      .put(setMaterials(mockMaterials.items))
      .put(setMaterialLoading(false))
      .hasFinalState({
        Material: {
          ...mockMaterialState,
          list: mockMaterials.items
        },
        Table: {
          ...mockTableState,
          itemsCount: mockMaterials.count
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(1);
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
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);
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
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);
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
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);
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
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(2);
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
      .put(getMaterialColors(mockColorToAdd.id))
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
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(2);
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
      .put(updatePagination())
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
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(2);
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
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(2);
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
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(2);
        expect(analysisCall).toHaveLength(2);
      }));

  it('should handle material error', () =>
    expectSaga(handleMaterialError, mockError)
      .withReducer(combineReducers({ Material }), {
        Material: {
          ...mockMaterialState,
          materialLoading: true
        }
      })
      .put(setMaterialLoading(false))
      .put(setMaterialError({ e: mockError }))
      .hasFinalState({
        Material: {
          ...mockMaterialState,
          materialLoading: false,
          materialError: { e: mockError }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(5);
      }));
});
