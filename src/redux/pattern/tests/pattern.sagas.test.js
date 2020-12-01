import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { combineReducers } from 'redux';
import {
  handlePatternLoad,
  handlePatternsLoad,
  handleAddPattern,
  handlePatternDelete,
  handlePatternUpdate,
  handlePatternError
} from '../pattern.sagas';
import {
  setPatterns,
  setPatternLoading,
  setPattern,
  setPagesCount,
  removePatternFromStore,
  setPatternError
} from '../pattern.actions';

import {
  mockPatternsState,
  mockPatternsLoadPayload,
  mockPatterns,
  pagesCount,
  mockId,
  mockPattern,
  mockSnackarState,
  statuses,
  mockInputPattern,
  mockError
} from './pattern.variables';

import {
  getPatternById,
  getAllPatterns,
  createPattern,
  deletePattern,
  updatePattern
} from '../pattern.operations';

import Pattern from '../pattern.reducer';
import Snackbar from '../../snackbar/snackbar.reducer';
import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
} from '../../snackbar/snackbar.actions';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = statuses;

describe('Test pattern sagas', () => {
  it('should load all patterns', () =>
    expectSaga(handlePatternsLoad, { payload: mockPatternsLoadPayload })
      .withReducer(combineReducers({ Pattern }), { Pattern: mockPatternsState })
      .put(setPatternLoading(true))
      .provide([
        [
          call(
            getAllPatterns,
            mockPatternsLoadPayload.skip,
            mockPatternsLoadPayload.limit
          ),
          mockPatterns
        ]
      ])
      .put(setPagesCount(pagesCount))
      .put(setPatterns(mockPatterns.items))
      .put(setPatternLoading(false))
      .hasFinalState({
        Pattern: {
          ...mockPatternsState,
          pagination: {
            ...mockPatternsState.pagination,
            pagesCount
          },
          list: mockPatterns.items
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(4);
      }));

  it('should load pattern by id', () =>
    expectSaga(handlePatternLoad, { payload: mockId })
      .withReducer(combineReducers({ Pattern }), { Pattern: mockPatternsState })
      .put(setPatternLoading(true))
      .provide([[call(getPatternById, mockId), mockPattern]])
      .put(setPattern(mockPattern))
      .put(setPatternLoading(false))
      .hasFinalState({
        Pattern: {
          ...mockPatternsState,
          pattern: mockPattern
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));

  it('should add pattern by input data', () =>
    expectSaga(handleAddPattern, { payload: mockInputPattern })
      .withReducer(combineReducers({ Pattern, Snackbar }), {
        Pattern: mockPatternsState,
        Snackbar: mockSnackarState
      })
      .put(setPatternLoading(true))
      .provide([[call(createPattern, mockInputPattern)]])
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(SUCCESS_ADD_STATUS))
      .put(setSnackBarStatus(true))
      .put(push('/patterns'))
      .hasFinalState({
        Pattern: {
          ...mockPatternsState,
          patternLoading: true
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
        expect(analysisPut).toHaveLength(5);
      }));

  it('should delete pattern by id', () =>
    expectSaga(handlePatternDelete, { payload: mockId })
      .withReducer(combineReducers({ Pattern, Snackbar }), {
        Pattern: {
          ...mockPatternsState,
          list: mockPatterns.items
        },
        Snackbar: mockSnackarState
      })
      .put(setPatternLoading(true))
      .provide([[call(deletePattern, mockId)]])
      .put(removePatternFromStore(mockId))
      .put(setPatternLoading(false))
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(SUCCESS_DELETE_STATUS))
      .put(setSnackBarStatus(true))
      .hasFinalState({
        Pattern: {
          ...mockPatternsState,
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
        expect(analysisPut).toHaveLength(6);
      }));

  it('should update pattern by input data', () =>
    expectSaga(handlePatternUpdate, { payload: mockInputPattern })
      .withReducer(combineReducers({ Pattern, Snackbar }), {
        Pattern: mockPatternsState,
        Snackbar: mockSnackarState
      })
      .put(setPatternLoading(true))
      .provide([[call(updatePattern, mockInputPattern)]])
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(SUCCESS_UPDATE_STATUS))
      .put(setSnackBarStatus(true))
      .put(push('/patterns'))
      .hasFinalState({
        Pattern: {
          ...mockPatternsState,
          patternLoading: true
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
        expect(analysisPut).toHaveLength(5);
      }));

  it('should handle pattern errors', () =>
    expectSaga(handlePatternError, mockError)
      .withReducer(combineReducers({ Pattern, Snackbar }), {
        Pattern: {
          ...mockPatternsState,
          patternLoading: true
        },
        Snackbar: mockSnackarState
      })
      .put(setPatternLoading(false))
      .put(setPatternError({ e: mockError }))
      .put(setSnackBarSeverity('error'))
      .put(setSnackBarMessage(mockError.message))
      .put(setSnackBarStatus(true))
      .hasFinalState({
        Pattern: {
          ...mockPatternsState,
          patternLoading: false,
          patternError: { e: mockError }
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
