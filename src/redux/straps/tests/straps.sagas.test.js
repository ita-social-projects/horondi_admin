import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { combineReducers } from 'redux';

import {
  handleStrapsLoad,
  handleStrapAdd,
  handleStrapUpdate,
  handleStrapDelete,
  handleStrapsError,
  handleGetStrapById
} from '../straps.sagas';

import {
  getAllStraps,
  getStrapById,
  updateStrap,
  createStrap,
  deleteStrap
} from '../straps.operations';

import Strap from '../straps.reducer';

import {
  removeStrapFromState,
  setStrap,
  setStrapsLoading,
  setStraps,
  setStrapsError
} from '../straps.actions';

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

const mockStrapsState = {
  list: [],
  filter: { search: '' },
  strap: null,
  showStrapsDialogWindow: false,
  strapsLoading: false,
  strapsError: null
};
const mockSizes = {
  items: [
    {
      _id: '',
      name: [
        {
          lang: 'ua',
          value: 'large'
        },
        {
          lang: 'en',
          value: 'великий'
        }
      ],
      description: [
        {
          lang: 'ua',
          value: 'test'
        },
        {
          lang: 'en',
          value: 'test'
        }
      ],
      sizes: []
    }
  ]
};
describe('straps sagas tests', () => {
  it('should load all straps', () => {
    expectSaga(handleStrapsLoad)
      .withReducer(combineReducers({ Strap }), { Strap: mockStrapsState })
      .put(setStrapsLoading(true))
      .provide([[call(getAllStraps), mockSizes]])
      .put(setStraps(mockSizes))
      .put(setStrapsLoading(false))
      .hasFinalState({
        Strap: {
          ...mockStrapsState,
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
  it('should handle one strap load id', () => {
    expectSaga(handleGetStrapById, { payload: 2 })
      .withReducer(combineReducers({ Strap }), { Strap: mockStrapsState })
      .put(setStrapsLoading(true))
      .provide([[call(getStrapById, 2), [10]]])
      .put(setStrap([10]))
      .put(setStrapsLoading(false))
      .hasFinalState({
        Strap: {
          ...mockStrapsState,
          strap: [10]
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
  it('should add strap', () => {
    expectSaga(handleStrapAdd, { payload: [10] })
      .withReducer(combineReducers({ Strap }), { Strap: mockStrapsState })
      .put(setStrapsLoading(true))
      .provide([
        [call(createStrap, [10])],
        [call(handleSuccessSnackbar, SUCCESS_ADD_STATUS)]
      ])
      .put(setStrapsLoading(false))
      .put(push(config.routes.pathToStraps))
      .hasFinalState({
        Strap: {
          ...mockStrapsState,
          strapsLoading: false
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
    expectSaga(handleStrapDelete, { payload: 10 })
      .withReducer(combineReducers({ Strap }), {
        Strap: mockStrapsState
      })
      .put(setStrapsLoading(true))
      .provide([
        [call(deleteStrap, { name: '' })],
        [call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS)]
      ])
      .put(removeStrapFromState({ name: '' }))
      .put(setStrapsLoading(false))
      .hasFinalState({
        Size: {
          ...mockStrapsState,
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

  it('should update a specific strap', () => {
    expectSaga(handleStrapUpdate, { payload: 10 })
      .withReducer(combineReducers({ Strap }), {
        Size: mockStrapsState
      })
      .put(setStrapsLoading(true))
      .provide([
        [call(updateStrap, 'mockPayloadToUpdateSize.id', {})],
        [call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS)]
      ])
      .put(push(config.routes.pathToStraps))
      .hasFinalState({
        Size: {
          ...mockStrapsState,
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
    expectSaga(handleStrapsError, 'mockError')
      .withReducer(combineReducers({ Strap }), {
        Strap: {
          ...mockStrapsState,
          sizeLoading: true
        }
      })
      .provide([[call(handleErrorSnackbar, 'mockError.message')]])
      .put(setStrapsLoading(false))
      .put(setStrapsError({ e: 'asd' }))
      .hasFinalState({
        Size: {
          ...mockStrapsState,
          sizeLoading: true,
          strapsError: { e: 'asd' }
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
