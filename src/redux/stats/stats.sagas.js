import { call, takeEvery, put } from 'redux-saga/effects';

import { GET_SALES_BY_CATEGORY } from './stats.types';
import { setDoughnutData, setStatsLoading } from './stats.actions';
import { getSalesByCategory } from './stats.operations';

import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
} from '../snackbar/snackbar.actions';

function* handleSalesByCategoryLoad() {
  try {
    yield put(setStatsLoading(true));
    const sales = yield call(getSalesByCategory);
    yield put(setDoughnutData(sales.categories));
    yield put(setStatsLoading(false));
  } catch (e) {
    handleStatsErrors(e);
  }
}

export function* handleStatsErrors(e) {
  yield put(setStatsLoading(false));
  yield put(setSnackBarSeverity('error'));
  yield put(setSnackBarMessage(e.message));
  yield put(setSnackBarStatus(true));
}

export default function* statsSaga() {
  yield takeEvery(GET_SALES_BY_CATEGORY, handleSalesByCategoryLoad);
}
