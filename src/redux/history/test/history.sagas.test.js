import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import Table from '../../table/table.reducer';
import { setItemsCount } from '../../table/table.actions';
import historyReducer from '../history.reducer';

import {
  setHistoryRecords,
  setHistoryLoading,
  setHistoryError,
  setRecordItem,
  setRecordItemLoading
} from '../history.actions';

import { getAllHistoryRecords, getHistoryRecord } from '../history.operations';

import {
  handleHistoryRecordsLoad,
  handleHistoryError,
  handleHistoryRecordByIdLoad
} from '../history.sagas';

import { handleErrorSnackbar } from '../../snackbar/snackbar.sagas';

import {
  historyId,
  error,
  mockHistoryState,
  mockHistoryRecordsLoadPayload,
  mockTableState,
  mockHistoryRecords
} from './history.variables';

describe('Tests of history saga', () => {
  it('should handle history error', () => {
    expectSaga(handleHistoryError, error)
      .withReducer(combineReducers({ historyReducer }), {
        History: {
          ...mockHistoryState,
          historyLoading: true
        }
      })
      .provide([[call(handleErrorSnackbar, error.message)]])
      .put(setHistoryLoading(false))
      .put(setHistoryError({ e: error }))
      .hasFinalState({
        History: {
          ...mockHistoryState,
          historyLoading: false,
          historyError: { e: error }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(2);
        expect(analysisCall).toHaveLength(1);
      });
  });

  it('should load history record by id', () => {
    expectSaga(handleHistoryRecordByIdLoad, {
      payload: historyId
    })
      .withReducer(historyReducer)
      .put(setRecordItemLoading(true))
      .provide([[call(getHistoryRecord, historyId), historyId]])
      .put(setRecordItem(historyId))
      .put(setRecordItemLoading(false))
      .hasFinalState({
        ...mockHistoryState,
        recordItem: historyId
      })
      .run();
  });

  it('should load all records', async (done) => {
    expectSaga(handleHistoryRecordsLoad, {
      payload: mockHistoryRecordsLoadPayload
    })
      .withReducer(combineReducers({ historyReducer, Table }), {
        History: mockHistoryState,
        Table: mockTableState
      })
      .put(setHistoryLoading(true))
      .provide([
        [
          await call(
            getAllHistoryRecords,
            mockHistoryRecordsLoadPayload.filter,
            mockHistoryRecordsLoadPayload.skip,
            mockHistoryRecordsLoadPayload.limit
          ),
          mockHistoryRecords
        ]
      ])

      .put(setHistoryRecords(mockHistoryRecords.items))
      .put(setItemsCount(mockHistoryRecords.count))
      .put(setHistoryLoading(false))
      .hasFinalState({
        History: {
          ...mockHistoryState,
          list: mockHistoryRecords.items
        },
        Table: {
          ...mockTableState,
          itemsCount: mockHistoryRecords.count
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
});
