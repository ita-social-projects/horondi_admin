import { takeEvery, call, put } from 'redux-saga/effects';

import {
  setHistoryLoading,
  setHistoryRecords,
  setHistoryError
} from './history.actions';
import { getAllHistoryRecords } from './history.operations';
import { handleErrorSnackbar } from '../snackbar/snackbar.sagas';
import { GET_HISTORY_RECORDS } from './history.types';
import { setItemsCount } from '../table/table.actions';

export function* handleHistoryRecordsLoad({ payload }) {
  try {
    yield put(setHistoryLoading(true));
    const records = yield call(
      getAllHistoryRecords,
      payload.limit,
      payload.skip,
      payload.filter
    );
    yield put(setHistoryRecords(records.items));
    yield put(setItemsCount(records.count));
    yield put(setHistoryLoading(false));
  } catch (error) {
    yield call(handleHistoryError, error);
  }
}

function* handleHistoryError(e) {
  yield put(setHistoryLoading(false));
  yield put(setHistoryError({ e }));
  yield call(handleErrorSnackbar, e.message);
}

export default function* historySaga() {
  yield takeEvery(GET_HISTORY_RECORDS, handleHistoryRecordsLoad);
}
