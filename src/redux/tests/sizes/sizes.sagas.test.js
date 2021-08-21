import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { combineReducers } from 'redux';

import {
  handleSizesLoad,
  handleAddSize,
  handleSizeUpdate,
  handleSizeDelete,
  handleSizesError,
  handleSizeById
} from '../../sizes/sizes.sagas';

import {
  getAllSizes,
  getSizeById,
  updateSize,
  addSize,
  deleteSize
} from '../../sizes/sizes.operations';

import Size from '../../sizes/sizes.reducer';

import {
  mockSizes,
  mockId,
  mockSize,
  mockError,
  mockSizesState,
  mockPayloadToUpdateSize
} from './sizes.variables';

import {
  removeSizeFromState,
  setSize,
  setSizesLoading,
  setSizes,
  setSizesError
} from '../../sizes/sizes.actions';

import { config } from '../../../configs';
import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../../snackbar/snackbar.sagas';

const { SUCCESS_ADD_STATUS, SUCCESS_UPDATE_STATUS, SUCCESS_DELETE_STATUS } =
  config.statuses;

const {
  analysisMethodTypes: { PUT, CALL }
} = require('../../../consts/method-types');

describe('sizes sagas tests', () => {
  it('should load all sizes', () => {
    expectSaga(handleSizesLoad)
      .withReducer(combineReducers({ Size }), { Size: mockSizesState })
      .put(setSizesLoading(true))
      .provide([[call(getAllSizes), mockSizes]])
      .put(setSizes(mockSizes))
      .put(setSizesLoading(false))
      .hasFinalState({
        Size: {
          ...mockSizesState,
          list: mockSizes
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === PUT);
        const analysisCall = analysis.filter((e) => e.type === CALL);
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);
      });
  });
  it('should handle one size load id', () => {
    expectSaga(handleSizeById, { payload: mockId })
      .withReducer(combineReducers({ Size }), { Size: mockSizesState })
      .put(setSizesLoading(true))
      .provide([[call(getSizeById, mockId), mockSize]])
      .put(setSize(mockSize))
      .put(setSizesLoading(false))
      .hasFinalState({
        Size: {
          ...mockSizesState,
          size: mockSize
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === PUT);
        const analysisCall = analysis.filter((e) => e.type === CALL);
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);
      });
  });
  it('should add size', () => {
    expectSaga(handleAddSize, { payload: mockSize })
      .withReducer(combineReducers({ Size }), { Size: mockSizesState })
      .put(setSizesLoading(true))
      .provide([
        [call(addSize, mockSize)],
        [call(handleSuccessSnackbar, SUCCESS_ADD_STATUS)]
      ])
      .put(setSizesLoading(false))
      .put(push(config.routes.pathToSizes))
      .hasFinalState({
        Size: {
          ...mockSizesState,
          sizeLoading: false
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === PUT);
        const analysisCall = analysis.filter((e) => e.type === CALL);
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(2);
      });
  });
  it('should delete size by id', () => {
    expectSaga(handleSizeDelete, { payload: mockId })
      .withReducer(combineReducers({ Size }), {
        Size: mockSizesState
      })
      .put(setSizesLoading(true))
      .provide([
        [call(deleteSize, mockId)],
        [call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS)]
      ])
      .put(removeSizeFromState(mockId))
      .put(setSizesLoading(false))
      .hasFinalState({
        Size: {
          ...mockSizesState,
          sizeLoading: false
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === PUT);
        const analysisCall = analysis.filter((e) => e.type === CALL);
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(2);
      });
  });

  it('should update a specific size', () => {
    expectSaga(handleSizeUpdate, { payload: mockPayloadToUpdateSize })
      .withReducer(combineReducers({ Size }), {
        Size: mockSizesState
      })
      .put(setSizesLoading(true))
      .provide([
        [
          call(
            updateSize,
            mockPayloadToUpdateSize.id,
            mockPayloadToUpdateSize.newSize
          )
        ],
        [call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS)]
      ])
      .put(push(config.routes.pathToSizes))
      .hasFinalState({
        Size: {
          ...mockSizesState,
          sizesLoading: true
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === PUT);
        const analysisCall = analysis.filter((e) => e.type === CALL);
        expect(analysisPut).toHaveLength(2);
        expect(analysisCall).toHaveLength(2);
      });
  });

  it('should handle size error', () => {
    expectSaga(handleSizesError, mockError)
      .withReducer(combineReducers({ Size }), {
        Size: {
          ...mockSizesState,
          sizeLoading: true
        }
      })
      .provide([[call(handleErrorSnackbar, mockError.message)]])
      .put(setSizesLoading(false))
      .put(setSizesError({ e: mockError }))
      .hasFinalState({
        Size: {
          ...mockSizesState,
          sizeLoading: true,
          sizeError: { e: mockError }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === PUT);
        const analysisCall = analysis.filter((e) => e.type === CALL);
        expect(analysisPut).toHaveLength(2);
        expect(analysisCall).toHaveLength(1);
      });
  });
});
