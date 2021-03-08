import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { combineReducers } from 'redux';
import {
  handleModelsLoad,
  handleModelLoad,
  handleAddModel,
  handleModelDelete,
  handleModelUpdate,
  handleModelError
} from '../model.sagas';

import {
  mockId,
  mockModels,
  mockModel,
  mockModelsLoadPayload,
  mockError,
  statuses,
  mockModelState,
  mockModelToUpdate,
  mockTableState
} from './model.variables';

import {
  setModels,
  setModelLoading,
  setModel,
  setModelError,
  removeModelFromStore
} from '../model.actions';

import { setItemsCount, updatePagination } from '../../table/table.actions';

import {
  getAllModels,
  deleteModel,
  createModel,
  updateModel,
  getModelById
} from '../model.operations';

import { handleCategoriesLoad } from '../../categories/categories.sagas';

import {
  handleSuccessSnackbar,
  handleErrorSnackbar
} from '../../snackbar/snackbar.sagas';

import Model from '../model.reducer';
import Table from '../../table/table.reducer';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = statuses;

describe('Test model sagas', () => {
  it('should load all models', () =>
    expectSaga(handleModelsLoad, { payload: mockModelsLoadPayload })
      .withReducer(combineReducers({ Model, Table }), {
        Model: mockModelState,
        Table: mockTableState
      })
      .put(setModelLoading(true))
      .provide([
        [
          call(
            getAllModels,
            mockModelsLoadPayload.skip,
            mockModelsLoadPayload.limit
          ),
          mockModels
        ]
      ])
      .put(setItemsCount(mockModels.count))
      .put(setModels(mockModels.items))
      .put(setModelLoading(false))
      .hasFinalState({
        Model: {
          ...mockModelState,
          list: mockModels.items
        },
        Table: {
          ...mockTableState,
          itemsCount: mockModels.count
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

  it('should load model by id', () =>
    expectSaga(handleModelLoad, { payload: mockId })
      .withReducer(combineReducers({ Model }), { Model: mockModelState })
      .put(setModelLoading(true))
      .provide([
        [call(getModelById, mockId), mockModel],
        [call(handleCategoriesLoad)]
      ])
      .put(setModel(mockModel))
      .put(setModelLoading(false))
      .hasFinalState({
        Model: {
          ...mockModelState,
          model: mockModel
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

  it('should add model', () =>
    expectSaga(handleAddModel, { payload: mockModel })
      .withReducer(combineReducers({ Model }), {
        Model: mockModelState
      })
      .put(setModelLoading(true))
      .provide([
        [call(createModel, mockModel)],
        [call(handleSuccessSnackbar, SUCCESS_ADD_STATUS)]
      ])
      .put(push('/models'))
      .hasFinalState({
        Model: {
          ...mockModelState,
          modelLoading: true
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

  it('should delete model', () =>
    expectSaga(handleModelDelete, { payload: mockId })
      .withReducer(combineReducers({ Model }), {
        Model: {
          ...mockModelState,
          list: mockModels.items
        }
      })
      .put(setModelLoading(true))
      .provide([
        [call(deleteModel, mockId)],
        [call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS)]
      ])
      .put(removeModelFromStore(mockId))
      .put(updatePagination())
      .put(setModelLoading(false))
      .hasFinalState({
        Model: {
          ...mockModelState,
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

  it('should update model', () =>
    expectSaga(handleModelUpdate, { payload: mockModelToUpdate })
      .withReducer(combineReducers({ Model }), {
        Model: mockModelState
      })
      .put(setModelLoading(true))
      .provide([
        [call(updateModel, mockModelToUpdate)],
        [call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS)]
      ])
      .put(push('/models'))
      .hasFinalState({
        Model: {
          ...mockModelState,
          modelLoading: true
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

  it('should handle models error', () =>
    expectSaga(handleModelError, mockError)
      .withReducer(combineReducers({ Model }), {
        Model: {
          ...mockModelState,
          modelLoading: true
        }
      })
      .provide([[call(handleErrorSnackbar, mockError.message)]])
      .put(setModelLoading(false))
      .put(setModelError({ e: mockError }))
      .hasFinalState({
        Model: {
          ...mockModelState,
          modelLoading: false,
          modelError: { e: mockError }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(2);
      }));
});
