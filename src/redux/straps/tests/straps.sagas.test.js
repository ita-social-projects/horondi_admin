import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { combineReducers } from 'redux';
import {
  handleStrapsLoad,
  handleGetStrapById,
  handleStrapAdd,
  handleStrapDelete,
  handleStrapUpdate,
  handleStrapsError
} from '../straps.sagas';

import {
  mockId,
  mockStraps,
  mockStrap,
  mockStrapsLoadPayload,
  mockError,
  statuses,
  mockStrapsState,
  mockStrapToUpdate,
  mockTableState
} from './straps.variables';

import {
  setStraps,
  setStrapsLoading,
  setStrap,
  setStrapsError,
  removeStrapFromState
} from '../straps.actions';

import { setItemsCount, updatePagination } from '../../table/table.actions';

import {
  getAllStraps,
  deleteStrap,
  createStrap,
  updateStrap,
  getStrapById
} from '../straps.operations';

import {
  handleSuccessSnackbar,
  handleErrorSnackbar
} from '../../snackbar/snackbar.sagas';

import Straps from '../straps.reducer';
import Table from '../../table/table.reducer';

const { SUCCESS_ADD_STATUS, SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } =
  statuses;

describe('Test straps sagas', () => {
  it('should load all straps', async (done) => {
    expectSaga(handleStrapsLoad, { payload: mockStrapsLoadPayload })
      .withReducer(combineReducers({ Straps, Table }), {
        Straps: mockStrapsState,
        Table: mockTableState
      })
      .put(setStrapsLoading(true))
      .provide([
        [
          call(
            getAllStraps,
            mockStrapsLoadPayload.pagination.skip,
            mockStrapsLoadPayload.pagination.limit,
            mockStrapsLoadPayload.filter
          ),
          mockStraps.items
        ]
      ])
      .put(setStraps(mockStraps.items))
      .put(setItemsCount(mockStraps.count))
      .put(setStrapsLoading(false))
      .hasFinalState({
        Straps: {
          ...mockStrapsState,
          list: mockStraps.items
        },
        Table: {
          ...mockTableState,
          itemsCount: mockStraps.count
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
    done();
  });

  it('should load strap by id', async (done) => {
    expectSaga(handleGetStrapById, { payload: mockId })
      .withReducer(combineReducers({ Straps }), { Straps: mockStrapsState })
      .put(setStrapsLoading(true))
      .provide([[call(getStrapById, mockId), mockStrap]])
      .put(setStrap(mockStrap))
      .put(setStrapsLoading(false))
      .hasFinalState({
        Straps: {
          ...mockStrapsState,
          strap: mockStrap
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
    done();
  });

  it('should add strap', async (done) => {
    expectSaga(handleStrapAdd, { payload: mockStrap })
      .withReducer(combineReducers({ Straps }), {
        Straps: mockStrapsState
      })
      .put(setStrapsLoading(true))
      .provide([[call(createStrap, mockStrap)]])
      .put(setStrapsLoading(false))
      .call(handleSuccessSnackbar, SUCCESS_ADD_STATUS)
      .put(push('/straps'))
      .hasFinalState({
        Straps: {
          ...mockStrapsState,
          strapsLoading: false
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');

        expect(analysisPut).toHaveLength(2);
        expect(analysisCall).toHaveLength(2);
      });
    done();
  });

  it('should delete strap', async (done) => {
    expectSaga(handleStrapDelete, { payload: mockId })
      .withReducer(combineReducers({ Straps }), {
        Straps: {
          ...mockStrapsState,
          list: mockStraps.items
        }
      })
      .put(setStrapsLoading(true))
      .provide([[call(deleteStrap, mockId)]])
      .put(removeStrapFromState(mockId))
      .put(setStrapsLoading(false))
      .put(updatePagination())
      .call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS)
      .hasFinalState({
        Straps: {
          ...mockStrapsState,
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
      });
    done();
  });

  it('should update strap', async (done) => {
    expectSaga(handleStrapUpdate, { payload: mockStrapToUpdate })
      .withReducer(combineReducers({ Straps }), {
        Straps: mockStrapsState
      })
      .put(setStrapsLoading(true))
      .provide([[call(updateStrap, mockStrapToUpdate)]])
      .put(setStrapsLoading(false))
      .call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS)
      .put(push('/straps'))
      .hasFinalState({
        Straps: {
          ...mockStrapsState,
          strapsLoading: false
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');

        expect(analysisPut).toHaveLength(2);
        expect(analysisCall).toHaveLength(2);
      });
    done();
  });

  it('should handle straps error', async (done) => {
    expectSaga(handleStrapsError, mockError)
      .withReducer(combineReducers({ Straps }), {
        Straps: {
          ...mockStrapsState,
          strapsLoading: true
        }
      })
      .provide([[call(handleErrorSnackbar, mockError.message)]])
      .put(setStrapsLoading(false))
      .put(setStrapsError({ e: mockError }))
      .hasFinalState({
        Straps: {
          ...mockStrapsState,
          strapsLoading: false,
          strapsError: { e: mockError }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');

        expect(analysisPut).toHaveLength(2);
      });
    done();
  });
});
