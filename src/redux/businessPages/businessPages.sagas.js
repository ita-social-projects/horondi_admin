import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  setBusinessPages,
  setLoading,
  setBusinessPagesError
} from './businessPages.actions';
import {
  getAllBusinessPages,
  createBusinessPage
} from './business-pages.operations';
import {
  ADD_BUSINESS_PAGE,
  GET_ALL_BUSINESS_PAGES
} from './businessPages.types';

import { config } from '../../configs';

import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../snackbar/snackbar.actions';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = config.statuses;

export function* handleBusinessPagesLoad() {
  try {
    yield put(setLoading(true));
    const businessPages = yield call(getAllBusinessPages);
    yield put(setBusinessPages(businessPages));
    yield put(setLoading(false));
  } catch (error) {
    yield call(handleBusinessPageError, error);
  }
}

function* handleAddBusinessPage({ payload }) {
  try {
    yield put(setLoading(true));
    yield call(createBusinessPage, payload);
    const businessPages = yield call(getAllBusinessPages);
    yield put(setBusinessPages(businessPages));
    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_ADD_STATUS));
    yield put(setSnackBarStatus(true));
    yield put(push('/business-pages'));
  } catch (error) {
    yield call(handleBusinessPageError, error);
  }
}

export function* handleBusinessPageError(e) {
  yield put(setLoading(false));
  yield put(setBusinessPagesError({ e }));
  yield put(setSnackBarSeverity('error'));
  yield put(setSnackBarMessage(e.message));
  yield put(setSnackBarStatus(true));
}

export default function* businessPagesSaga() {
  yield takeEvery(GET_ALL_BUSINESS_PAGES, handleBusinessPagesLoad);
  yield takeEvery(ADD_BUSINESS_PAGE, handleAddBusinessPage);
}
