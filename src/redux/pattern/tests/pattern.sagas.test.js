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
  removePatternFromStore,
  setPatternError
} from '../pattern.actions';

import {
  mockPatternsState,
  mockPatternsLoadPayload,
  mockPatterns,
  mockId,
  mockPattern,
  statuses,
  mockInputPattern,
  mockError,
  mockTableState
} from './pattern.variables';

import {
  getPatternById,
  getAllPatterns,
  createPattern,
  deletePattern,
  updatePattern
} from '../pattern.operations';

import { setItemsCount, updatePagination } from '../../table/table.actions';

import Pattern from '../pattern.reducer';
import Table from '../../table/table.reducer';

import {
  handleSuccessSnackbar,
  handleErrorSnackbar
} from '../../snackbar/snackbar.sagas';

const { SUCCESS_ADD_STATUS, SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } =
  statuses;

describe('Test pattern sagas', () => {
  it.skip('should load all patterns', () =>
    expectSaga(handlePatternsLoad, { payload: mockPatternsLoadPayload })
      .withReducer(combineReducers({ Pattern, Table }), {
        Pattern: mockPatternsState,
        Table: mockTableState
      })
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
      .put(setItemsCount(mockPatterns.count))
      .put(setPatterns(mockPatterns.items))
      .put(setPatternLoading(false))
      .hasFinalState({
        Pattern: {
          ...mockPatternsState,
          list: mockPatterns.items
        },
        Table: {
          ...mockTableState,
          itemsCount: mockPatterns.count
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(4);
      }));

  it.skip('should get pattern by id', () =>
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

  it.skip('should add pattern by input data', () =>
    expectSaga(handleAddPattern, { payload: mockInputPattern })
      .withReducer(combineReducers({ Pattern }), {
        Pattern: mockPatternsState
      })
      .put(setPatternLoading(true))
      .provide([
        [call(createPattern, mockInputPattern)],
        [call(handleSuccessSnackbar, SUCCESS_ADD_STATUS)]
      ])
      .put(push('/patterns'))
      .hasFinalState({
        Pattern: {
          ...mockPatternsState,
          patternLoading: true
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(2);
      }));

  it.skip('should delete pattern by id', () =>
    expectSaga(handlePatternDelete, { payload: mockId })
      .withReducer(combineReducers({ Pattern }), {
        Pattern: {
          ...mockPatternsState,
          list: mockPatterns.items
        }
      })
      .put(setPatternLoading(true))
      .provide([
        [call(deletePattern, mockId)],
        [call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS)]
      ])
      .put(removePatternFromStore(mockId))
      .put(updatePagination())
      .put(setPatternLoading(false))
      .hasFinalState({
        Pattern: {
          ...mockPatternsState,
          list: []
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(4);
      }));

  it.skip('should update pattern by input data', () =>
    expectSaga(handlePatternUpdate, { payload: mockInputPattern })
      .withReducer(combineReducers({ Pattern }), {
        Pattern: mockPatternsState
      })
      .put(setPatternLoading(true))
      .provide([
        [call(updatePattern, mockInputPattern)],
        [call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS)]
      ])
      .put(push('/patterns'))
      .hasFinalState({
        Pattern: {
          ...mockPatternsState,
          patternLoading: true
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(2);
      }));

  it.skip('should handle pattern errors', () =>
    expectSaga(handlePatternError, mockError)
      .withReducer(combineReducers({ Pattern }), {
        Pattern: {
          ...mockPatternsState,
          patternLoading: true
        }
      })
      .provide([[call(handleErrorSnackbar, mockError.message)]])
      .put(setPatternLoading(false))
      .put(setPatternError({ e: mockError }))
      .hasFinalState({
        Pattern: {
          ...mockPatternsState,
          patternLoading: false,
          patternError: { e: mockError }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(2);
      }));
});
