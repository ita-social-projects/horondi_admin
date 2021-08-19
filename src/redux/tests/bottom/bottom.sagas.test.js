import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { combineReducers } from 'redux';
import Bottom from '../../bottom/bottom.reducer';
import {
  handleBottomLoad,
  handleAddBottom,
  handleBottomDelete,
  handleBottomUpdate,
  handleBottomError
} from '../../bottom/bottom.sagas';

import {
  setBottomLoading,
  setBottom,
  removeBottomFromStore,
  setBottomError
} from '../../bottom/bottom.actions';

import {
  mockBottomsState,
  mockBottoms,
  mockId,
  mockBottom,
  statuses,
  mockInputBottom,
  mockError
} from './bottom.variables';

import {
  getBottomById,
  createBottom,
  deleteBottom,
  updateBottom
} from '../../bottom/bottom.operations';

import { updatePagination } from '../../table/table.actions';

import {
  handleSuccessSnackbar,
  handleErrorSnackbar
} from '../../snackbar/snackbar.sagas';

describe('Test Bottom sagas', () => {
  it('should get Bottom by id', async (done) => {
    expectSaga(handleBottomLoad, { payload: mockId })
      .withReducer(combineReducers({ Bottom }), { Bottom: mockBottomsState })
      .put(setBottomLoading(true))
      .provide([[call(getBottomById, mockId), mockBottom]])
      .put(setBottom(mockBottom))
      .put(setBottomLoading(false))
      .hasFinalState({
        Bottom: {
          ...mockBottomsState,
          bottom: mockBottom
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

  it('should add Bottom by input data', async (done) => {
    expectSaga(handleAddBottom, { payload: mockInputBottom })
      .withReducer(combineReducers({ Bottom }), {
        Bottom: mockBottomsState
      })
      .put(setBottomLoading(true))
      .provide([
        [call(createBottom, mockInputBottom)],
        [call(handleSuccessSnackbar, statuses.SUCCESS_ADD_STATUS)]
      ])
      .put(push('/bottoms'))
      .hasFinalState({
        Bottom: {
          ...mockBottomsState,
          bottomLoading: false
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

  it('should delete Bottom by id', async (done) => {
    expectSaga(handleBottomDelete, { payload: mockId })
      .withReducer(combineReducers({ Bottom }), {
        Bottom: {
          ...mockBottomsState,
          list: mockBottoms.items
        }
      })
      .put(setBottomLoading(true))
      .provide([
        [call(deleteBottom, mockId)],
        [call(handleSuccessSnackbar, statuses.SUCCESS_DELETE_STATUS)]
      ])
      .put(removeBottomFromStore(mockId))
      .put(updatePagination())
      .put(setBottomLoading(false))
      .hasFinalState({
        Bottom: {
          ...mockBottomsState,
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

  it('should update Bottom by input data', async (done) => {
    expectSaga(handleBottomUpdate, { payload: mockInputBottom })
      .withReducer(combineReducers({ Bottom }), {
        Bottom: mockBottomsState
      })
      .put(setBottomLoading(true))
      .provide([
        [call(updateBottom, mockInputBottom)],
        [call(handleSuccessSnackbar, statuses.SUCCESS_UPDATE_STATUS)]
      ])
      .put(push('/bottoms'))
      .hasFinalState({
        Bottom: {
          ...mockBottomsState,
          bottomLoading: false
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

  it('should handle Bottom errors', async (done) => {
    expectSaga(handleBottomError, mockError)
      .withReducer(combineReducers({ Bottom }), {
        Bottom: {
          ...mockBottomsState,
          bottomLoading: true
        }
      })
      .provide([[call(handleErrorSnackbar, mockError.message)]])
      .put(setBottomLoading(false))
      .put(setBottomError({ e: mockError }))
      .hasFinalState({
        Bottom: {
          ...mockBottomsState,
          bottomLoading: false,
          bottomError: { e: mockError }
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
