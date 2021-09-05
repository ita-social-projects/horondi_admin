import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { combineReducers } from 'redux';
import Basic from '../basics.reducer';
import {
  handleBasicById,
  handleBasicAdd,
  handleBasicsError,
  handleBasicDelete,
  handleBasicUpdate,
  handleBasicsLoad
} from '../basics.sagas';

import {
  removeBasicFromState,
  setBasicsLoading,
  setBasic,
  setBasics,
  setBasicError
} from '../basics.actions';

import {
  mockBasicsState,
  mockBasics,
  mockBasic,
  mockInputBasic,
  mockId,
  statuses,
  mockError,
  mockTableState,
  payload
} from './basics.variables';

import {
  createBasic,
  updateBasic,
  getAllBasics,
  getBasicById,
  deleteBasic
} from '../basics.operations';

import { setItemsCount, updatePagination } from '../../table/table.actions';

import Table from '../../table/table.reducer';

import {
  handleSuccessSnackbar,
  handleErrorSnackbar
} from '../../snackbar/snackbar.sagas';

describe('Basics Sagas Tests', () => {
  it('should get Basic by id', async (done) => {
    expectSaga(handleBasicById, { payload: mockId })
      .withReducer(combineReducers({ Basic }), { Basic: mockBasicsState })
      .put(setBasicsLoading(true))
      .provide([[call(getBasicById, mockId), mockBasic]])
      .put(setBasic(mockBasic))
      .put(setBasicsLoading(false))
      .hasFinalState({
        Basic: {
          ...mockBasicsState,
          basic: mockBasic
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

  it('should add Basic by input data', async (done) => {
    expectSaga(handleBasicAdd, { payload: mockInputBasic })
      .withReducer(combineReducers({ Basic }), {
        Basic: mockBasicsState
      })
      .put(setBasicsLoading(true))
      .provide([
        [call(createBasic, mockInputBasic)],
        [call(handleSuccessSnackbar, statuses.SUCCESS_ADD_STATUS)]
      ])
      .put(push('/basics'))
      .hasFinalState({
        Basic: {
          ...mockBasicsState,
          basicsLoading: false
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

  it('should delete Basic by id', async (done) => {
    expectSaga(handleBasicDelete, { payload: mockId })
      .withReducer(combineReducers({ Basic }), {
        Basic: {
          ...mockBasicsState,
          list: mockBasics.items
        }
      })
      .put(setBasicsLoading(true))
      .provide([
        [call(deleteBasic, mockId)],
        [call(handleSuccessSnackbar, statuses.SUCCESS_DELETE_STATUS)]
      ])
      .put(removeBasicFromState(mockId))
      .put(updatePagination())
      .put(setBasicsLoading(false))
      .hasFinalState({
        Basic: {
          ...mockBasicsState,
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

  it('should update Basic by input data', async (done) => {
    expectSaga(handleBasicUpdate, { payload: mockInputBasic })
      .withReducer(combineReducers({ Basic }), {
        Basic: mockBasicsState
      })
      .put(setBasicsLoading(true))
      .provide([
        [call(updateBasic, mockInputBasic)],
        [call(handleSuccessSnackbar, statuses.SUCCESS_UPDATE_STATUS)]
      ])
      .put(push('/basics'))
      .hasFinalState({
        Basic: {
          ...mockBasicsState,
          basicsLoading: false
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

  it('should handle Basic errors', async (done) => {
    expectSaga(handleBasicsError, mockError)
      .withReducer(combineReducers({ Basic }), {
        Basic: {
          ...mockBasicsState,
          basicsLoading: true
        }
      })
      .provide([[call(handleErrorSnackbar, mockError.message)]])
      .put(setBasicsLoading(false))
      .put(setBasicError({ e: mockError }))
      .hasFinalState({
        Basic: {
          ...mockBasicsState,
          basicsLoading: false,
          basicsErrors: { e: mockError }
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

  it('should load all Basics', async (done) => {
    expectSaga(handleBasicsLoad, { payload })
      .withReducer(combineReducers({ Basic, Table }), {
        Basic: mockBasicsState,
        Table: mockTableState
      })
      .put(setBasicsLoading(true))
      .provide([
        [
          call(getAllBasics, payload.skip, payload.limit, payload.filters),
          mockBasics
        ]
      ])
      .put(setItemsCount(mockBasics.count))
      .put(setBasics(mockBasics.items))
      .put(setBasicsLoading(false))
      .hasFinalState({
        Basic: {
          ...mockBasicsState,
          list: mockBasics.items
        },
        Table: {
          ...mockTableState,
          itemsCount: mockBasics.count
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
});
