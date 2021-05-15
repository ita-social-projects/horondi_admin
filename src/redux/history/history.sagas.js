import { takeEvery, call, put } from 'redux-saga/effects';

import {
  setHistoryLoading,
  setHistoryRecords,
  setHistoryError,
  setRecordItemLoading,
  setRecordItem
} from './history.actions';
import { getAllHistoryRecords, getHistoryRecord } from './history.operations';
import { handleErrorSnackbar } from '../snackbar/snackbar.sagas';
import { GET_HISTORY_RECORDS, GET_RECORD_ITEM } from './history.types';
import { setItemsCount } from '../table/table.actions';
import { AUTH_ERRORS } from '../../error-messages/auth';
import { handleAdminLogout } from '../auth/auth.sagas';

export function* handleHistoryRecordsLoad({ payload }) {
  try {
    yield put(setHistoryLoading(true));

    const records = yield call(
      getAllHistoryRecords,
      payload.limit,
      payload.skip,
      payload.filter
    );

    if (records) {
      yield put(setHistoryRecords(records?.items));
      yield put(setItemsCount(records?.count));
      yield put(setHistoryLoading(false));
    }
  } catch (error) {
    yield call(handleHistoryError, error);
  }
}

export function* handleHistoryRecordByIdLoad({ payload }) {
  try {
    yield put(setRecordItemLoading(true));
    const record = yield call(getHistoryRecord, payload);

    if (record) {
      yield put(setRecordItem(record));
      yield put(setRecordItemLoading(false));
    }
  } catch (error) {
    yield call(handleHistoryError, error);
  }
}

function* handleHistoryError(e) {
  if (
    e.message === AUTH_ERRORS.REFRESH_TOKEN_IS_NOT_VALID ||
    e.message === AUTH_ERRORS.USER_IS_BLOCKED
  ) {
    yield call(handleAdminLogout);
  } else {
    yield put(setHistoryLoading(false));
    yield put(setHistoryError({ e }));
    yield call(handleErrorSnackbar, e.message);
  }
}

export default function* historySaga() {
  yield takeEvery(GET_HISTORY_RECORDS, handleHistoryRecordsLoad);
  yield takeEvery(GET_RECORD_ITEM, handleHistoryRecordByIdLoad);
}
