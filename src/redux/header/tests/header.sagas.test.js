import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import {
  handleAddHeader,
  handleHeaderDelete,
  handleHeaderLoad,
  handleHeadersLoad,
  handleHeaderUpdate
} from '../header.sagas';

import Header, { initialState } from '../header.reducer';
import {
  createHeader,
  getAllHeaders,
  getHeaderById,
  updateHeader
} from '../header.operations';

import { headers, id, mockHeader } from './header.variables';
import { config } from '../../../configs';
import { handleSuccessSnackbar } from '../../snackbar/snackbar.sagas';

import {
  deleteHeader,
  removeHeaderFromStore,
  setHeader,
  setHeaderLoading,
  setHeaders
} from '../header.actions';

const { SUCCESS_ADD_STATUS, SUCCESS_UPDATE_STATUS } = config.statuses;

describe('header sagas tests', () => {
  it('should load all headers', () => {
    expectSaga(handleHeadersLoad)
      .withReducer(combineReducers({ Header }), { Header: initialState })
      .put(setHeaderLoading(true))
      .provide([[call(getAllHeaders)], headers])
      .put(setHeaders(headers))
      .put(setHeaderLoading(false))
      .hasFinalState({
        Header: {
          ...initialState,
          list: headers
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      });
  });

  it('should handle one header load', () => {
    expectSaga(handleHeaderLoad, { payload: id })
      .withReducer(combineReducers({ Header }), { Header: initialState })
      .put(setHeaderLoading(true))
      .provide([[call(getHeaderById, id), mockHeader]])
      .put(setHeader(mockHeader))
      .put(setHeaderLoading(false))
      .hasFinalState({
        Header: {
          ...initialState,
          list: [],
          header: mockHeader
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      });
  });

  it('should add header to the store', () => {
    expectSaga(handleAddHeader, { payload: mockHeader })
      .withReducer(combineReducers({ Header }), { Header: initialState })
      .put(setHeaderLoading(true))
      .provide([
        [call(createHeader, mockHeader)],
        [call(handleSuccessSnackbar, SUCCESS_ADD_STATUS)]
      ])
      .put(setHeaderLoading(false))
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      });
  });

  it('should delete header from store', () => {
    expectSaga(handleHeaderDelete, { payload: id })
      .withReducer(combineReducers({ Header }), { Header: initialState })
      .put(setHeaderLoading(true))
      .provide([
        [call(deleteHeader, id)],
        [call(handleSuccessSnackbar, SUCCESS_ADD_STATUS)]
      ])
      .put(removeHeaderFromStore(id))
      .put(setHeaderLoading(false))
      .hasFinalState({
        Header: {
          ...initialState,
          list: []
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      });
  });

  it('should update header', () => {
    expectSaga(handleHeaderDelete, { payload: mockHeader })
      .withReducer(combineReducers({ Header }), { Header: initialState })
      .put(setHeaderLoading(true))
      .provide([
        [call(updateHeader, mockHeader), mockHeader],
        [call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS)]
      ])
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(6);
      });
  });
});
