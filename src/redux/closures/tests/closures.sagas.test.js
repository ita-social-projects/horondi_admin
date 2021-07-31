import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { combineReducers } from 'redux';
import Closures from '../closures.reducer';
import {
  handleClosuresLoad,
  handleClosuresAdd,
  handleClosureDelete,
  handleClosureUpdate,
  handleClosuresError
} from '../closures.sagas';

import {
  setClosures,
  setClosuresLoading,
  setClosure,
  removeClosureFromState
} from '../closures.actions';

import {
  mockClosuresState,
  mockClosures,
  mockId,
  statuses,
  mockInputClosure,
  mockError,
  mockTableState,
  payload,
  mockClosure
} from './mockClosures';

import {
  getClosureById,
  getAllClosures,
  createClosures,
  deleteClosure,
  updateClosure
} from '../closures.operations';

import { setItemsCount, updatePagination } from '../../table/table.actions';

import Table from '../../table/table.reducer';

import {
  handleSuccessSnackbar,
  handleErrorSnackbar
} from '../../snackbar/snackbar.sagas';

describe('Test Closure sagas', () => {
  it.skip('should load all Closures', async (done) => {
    expectSaga(handleClosuresLoad, { payload })
      .withReducer(combineReducers({ Closures, Table }), {
        Closures: mockClosuresState,
        Table: mockTableState
      })
      .put(setClosuresLoading(true))
      .provide([
        [
          call(
            getAllClosures,
            payload.skip,
            payload.limit
            // payload.filters
          ),
          mockClosures
        ]
      ])
      .put(setItemsCount(mockClosures.count))
      .put(setClosures(mockClosures.items))
      .put(setClosuresLoading(false))
      .hasFinalState({
        Closures: {
          ...mockClosuresState,
          list: mockClosures.items
        },
        Table: {
          ...mockTableState,
          itemsCount: mockClosures.count
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(4);
      });
    done();
  });

  it.skip('should get Closures by id', async (done) => {
    expectSaga(handleClosuresLoad, { payload: mockId })
      .withReducer(combineReducers({ Closures }), {
        Closures: mockClosuresState
      })
      .put(setClosuresLoading(true))
      .provide([[call(getClosureById, mockId), mockClosure]])
      .put(setClosure(mockClosure))
      .put(setClosuresLoading(false))
      .hasFinalState({
        Closures: {
          ...mockClosuresState,
          closure: mockClosure
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      });
    done();
  });

  it.skip('should add Closure by input data', async (done) => {
    expectSaga(handleClosuresAdd, { payload: mockInputClosure })
      .withReducer(combineReducers({ Closures }), {
        Closures: mockClosuresState
      })
      .put(setClosuresLoading(true))
      .provide([
        [call(createClosures, mockInputClosure)],
        [call(handleSuccessSnackbar, statuses.SUCCESS_ADD_STATUS)]
      ])
      .put(push('/Closures'))
      .hasFinalState({
        Closures: {
          ...mockClosuresState,
          ClosureLoading: false
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      });
    done();
  });

  it('should delete Closure by id', async (done) => {
    expectSaga(handleClosureDelete, { payload: mockId })
      .withReducer(combineReducers({ Closures }), {
        Closures: {
          ...mockClosuresState,
          list: mockClosures.items
        }
      })
      .put(setClosuresLoading(true))
      .provide([
        [call(deleteClosure, mockId)],
        [call(handleSuccessSnackbar, statuses.SUCCESS_DELETE_STATUS)]
      ])
      .put(removeClosureFromState(mockId))
      .put(updatePagination())
      .put(setClosuresLoading(false))
      .hasFinalState({
        Closures: {
          ...mockClosuresState,
          list: []
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(4);
      });
    done();
  });

  it.skip('should update Closure by input data', async (done) => {
    expectSaga(handleClosureUpdate, { payload: mockInputClosure })
      .withReducer(combineReducers({ Closures }), {
        Closures: mockClosuresState
      })
      .put(setClosuresLoading(true))
      .provide([
        [call(updateClosure, mockInputClosure)],
        [call(handleSuccessSnackbar, statuses.SUCCESS_UPDATE_STATUS)]
      ])
      .put(push('/Closures'))
      .hasFinalState({
        Closures: {
          ...mockClosuresState,
          ClosureLoading: false
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      });
    done();
  });

  it.skip('should handle Closure errors', async (done) => {
    expectSaga(handleClosuresError, mockError)
      .withReducer(combineReducers({ Closures }), {
        Closures: {
          ...mockClosuresState,
          closuresLoading: true
        }
      })
      .provide([[call(handleErrorSnackbar, mockError.message)]])
      .put(setClosuresLoading(false))
      // .put(setClosuresError({ e: mockError }))
      .hasFinalState({
        Closures: {
          ...mockClosuresState,
          closuresLoading: false,
          closuresError: { e: mockError }
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
