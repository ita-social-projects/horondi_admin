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
  pagesCount,
  mockSnackbarState,
  mockModelToUpdate
} from './model.variables';

import {
  setModels,
  setModelLoading,
  setModel,
  setModelError,
  setPagesCount,
  removeModelFromStore
} from '../model.actions';

import {
  getAllModels,
  deleteModel,
  createModel,
  updateModel,
  getModelById
} from '../model.operations';

import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../../snackbar/snackbar.actions';

import Model from '../model.reducer';
import Snackbar from '../../snackbar/snackbar.reducer';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = statuses;

describe('Test model sagas', () => {
  it('should load all models', () =>
    expectSaga(handleModelsLoad, { payload: mockModelsLoadPayload })
      .withReducer(combineReducers({ Model }), { Model: mockModelState })
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
      .put(setPagesCount(pagesCount))
      .put(setModels(mockModels.items))
      .put(setModelLoading(false))
      .hasFinalState({
        Model: {
          ...mockModelState,
          pagination: {
            ...mockModelState.pagination,
            pagesCount
          },
          list: mockModels.items
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
      .provide([[call(getModelById, mockId), mockModel]])
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
      .withReducer(combineReducers({ Model, Snackbar }), {
        Model: mockModelState,
        Snackbar: mockSnackbarState
      })
      .put(setModelLoading(true))
      .provide([[call(createModel, mockModel)]])
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(SUCCESS_ADD_STATUS))
      .put(setSnackBarStatus(true))
      .put(push('/models'))
      .hasFinalState({
        Model: {
          ...mockModelState,
          modelLoading: true
        },
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
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(5);
        expect(analysisCall).toHaveLength(1);
      }));

  it('should delete model', () =>
    expectSaga(handleModelDelete, { payload: mockId })
      .withReducer(combineReducers({ Model, Snackbar }), {
        Model: {
          ...mockModelState,
          list: mockModels.items
        },
        Snackbar: mockSnackbarState
      })
      .put(setModelLoading(true))
      .provide([[call(deleteModel, mockId)]])
      .put(removeModelFromStore(mockId))
      .put(setModelLoading(false))
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(SUCCESS_DELETE_STATUS))
      .put(setSnackBarStatus(true))
      .hasFinalState({
        Model: {
          ...mockModelState,
          list: []
        },
        Snackbar: {
          snackBarStatus: true,
          snackBarSeverity: 'success',
          snackBarMessage: SUCCESS_DELETE_STATUS
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(6);
        expect(analysisCall).toHaveLength(1);
      }));

  it('should update model', () =>
    expectSaga(handleModelUpdate, { payload: mockModelToUpdate })
      .withReducer(combineReducers({ Model, Snackbar }), {
        Model: mockModelState,
        Snackbar: mockSnackbarState
      })
      .put(setModelLoading(true))
      .provide([[call(updateModel, mockModelToUpdate)]])
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(SUCCESS_UPDATE_STATUS))
      .put(setSnackBarStatus(true))
      .put(push('/models'))
      .hasFinalState({
        Model: {
          ...mockModelState,
          modelLoading: true
        },
        Snackbar: {
          snackBarStatus: true,
          snackBarSeverity: 'success',
          snackBarMessage: SUCCESS_UPDATE_STATUS
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(5);
        expect(analysisCall).toHaveLength(1);
      }));

  it('should handle models error', () =>
    expectSaga(handleModelError, mockError)
      .withReducer(combineReducers({ Model, Snackbar }), {
        Model: {
          ...mockModelState,
          modelLoading: true
        },
        Snackbar: mockSnackbarState
      })
      .put(setModelLoading(false))
      .put(setModelError({ e: mockError }))
      .put(setSnackBarSeverity('error'))
      .put(setSnackBarMessage(mockError.message))
      .put(setSnackBarStatus(true))
      .hasFinalState({
        Model: {
          ...mockModelState,
          modelLoading: false,
          modelError: { e: mockError }
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
