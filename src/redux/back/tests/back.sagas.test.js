import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { combineReducers } from 'redux';
import {
  handleBackLoad,
  handleBacksLoad,
  handleAddBack,
  handleBackDelete,
  handleBackUpdate,
  handleBackError
} from '../back.sagas';

import {
  setBacks,
  setBackLoading,
  setBack,
  removeBackFromStore,
  setBackError
} from '../back.actions';

import {
  mockBacksState,
  mockBacksLoadPayload,
  mockBacks,
  mockId,
  mockBack,
  statuses,
  mockInputBack,
  mockError,
  mockTableState
} from './back.variables';

import {
  getBackById,
  getAllBacks,
  createBack,
  deleteBack,
  updateBack
} from '../back.operations';

import { setItemsCount, updatePagination } from '../../table/table.actions';

import Back from '../back.reducer';
import Table from '../../table/table.reducer';

import {
  handleSuccessSnackbar,
  handleErrorSnackbar
} from '../../snackbar/snackbar.sagas';

describe('Test Back sagas', () => {
  it.skip('should load all Backs', () =>
    expectSaga(handleBacksLoad, { payload: mockBacksLoadPayload })
      .withReducer(combineReducers({ Back, Table }), {
        Back: mockBacksState,
        Table: mockTableState
      })
      .put(setBackLoading(true))
      .provide([
        [
          call(
            getAllBacks,
            mockBacksLoadPayload.skip,
            mockBacksLoadPayload.limit
          ),
          mockBacks
        ]
      ])
      .put(setItemsCount(mockBacks.count))
      .put(setBacks(mockBacks.items))
      .put(setBackLoading(false))
      .hasFinalState({
        Back: {
          ...mockBacksState,
          list: mockBacks.items
        },
        Table: {
          ...mockTableState,
          itemsCount: mockBacks.count
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(4);
      }));

  it('should get Back by id', () =>
    expectSaga(handleBackLoad, { payload: mockId })
      .withReducer(combineReducers({ Back }), { Back: mockBacksState })
      .put(setBackLoading(true))
      .provide([[call(getBackById, mockId), mockBack]])
      .put(setBack(mockBack))
      .put(setBackLoading(false))
      .hasFinalState({
        Back: {
          ...mockBacksState,
          back: mockBack
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));

  it.skip('should add Back by input data', () =>
    expectSaga(handleAddBack, { payload: mockInputBack })
      .withReducer(combineReducers({ Back }), {
        Back: mockBacksState
      })
      .put(setBackLoading(true))
      .provide([
        [call(createBack, mockInputBack)],
        [call(handleSuccessSnackbar, statuses.SUCCESS_ADD_STATUS)]
      ])
      .put(push('/backs'))
      .hasFinalState({
        Back: {
          ...mockBacksState,
          backLoading: true
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(2);
      }));

  it('should delete Back by id', () =>
    expectSaga(handleBackDelete, { payload: mockId })
      .withReducer(combineReducers({ Back }), {
        Back: {
          ...mockBacksState,
          list: mockBacks.items
        }
      })
      .put(setBackLoading(true))
      .provide([
        [call(deleteBack, mockId)],
        [call(handleSuccessSnackbar, statuses.SUCCESS_DELETE_STATUS)]
      ])
      .put(removeBackFromStore(mockId))
      .put(updatePagination())
      .put(setBackLoading(false))
      .hasFinalState({
        Back: {
          ...mockBacksState,
          list: []
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(4);
      }));

  it('should update Back by input data', () =>
    expectSaga(handleBackUpdate, { payload: mockInputBack })
      .withReducer(combineReducers({ Back }), {
        Back: mockBacksState
      })
      .put(setBackLoading(true))
      .provide([
        [call(updateBack, mockInputBack)],
        [call(handleSuccessSnackbar, statuses.SUCCESS_UPDATE_STATUS)]
      ])
      .put(push('/backs'))
      .hasFinalState({
        Back: {
          ...mockBacksState,
          backLoading: false
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));

  it('should handle Back errors', () =>
    expectSaga(handleBackError, mockError)
      .withReducer(combineReducers({ Back }), {
        Back: {
          ...mockBacksState,
          backLoading: true
        }
      })
      .provide([[call(handleErrorSnackbar, mockError.message)]])
      .put(setBackLoading(false))
      .put(setBackError({ e: mockError }))
      .hasFinalState({
        Back: {
          ...mockBacksState,
          backLoading: false,
          backError: { e: mockError }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(2);
      }));
});
