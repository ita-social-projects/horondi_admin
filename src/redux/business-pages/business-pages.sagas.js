import { takeEvery, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  setBusinessPages,
  setLoading,
  setBusinessPagesError,
  setCurrentBusinessPage
} from './business-pages.actions';
import {
  getAllBusinessPages,
  getBusinessPageById,
  createBusinessPage,
  deleteBusinessPage,
  updateBusinessPage
} from './business-pages.operations';
import {
  ADD_BUSINESS_PAGE,
  DELETE_BUSINESS_PAGE,
  GET_ALL_BUSINESS_PAGES,
  GET_BUSINESS_PAGE_BY_ID,
  UPDATE_BUSINESS_PAGE
} from './business-pages.types';

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

function* handleCurrentBusinessPageLoad({ payload }) {
  try {
    yield put(setLoading(true));

    const businessPage = yield call(getBusinessPageById, payload);
    yield put(setCurrentBusinessPage(businessPage));

    yield put(setLoading(false));
  } catch (error) {
    yield call(handleBusinessPageError, error);
  }
}

function* handleAddBusinessPage({ payload }) {
  try {
    yield put(setLoading(true));
    yield call(createBusinessPage, payload);

    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_ADD_STATUS));
    yield put(setSnackBarStatus(true));

    yield put(setLoading(false));
    yield put(push('/business-pages'));
  } catch (error) {
    yield call(handleBusinessPageError, error);
  }
}

function* handleBusinessPageDelete({ payload }) {
  try {
    yield put(setLoading(true));
    yield call(deleteBusinessPage, payload);

    const businessPages = yield select(
      ({ BusinessPages }) => BusinessPages.list
    );
    yield put(
      setBusinessPages(businessPages.filter((page) => page._id !== payload))
    );

    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_DELETE_STATUS));
    yield put(setSnackBarStatus(true));

    yield put(setLoading(false));
  } catch (error) {
    yield call(handleBusinessPageError, error);
  }
}

function* handleBusinessPageUpdate({ payload }) {
  try {
    yield put(setLoading(true));
    yield call(updateBusinessPage, payload);

    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_UPDATE_STATUS));
    yield put(setSnackBarStatus(true));

    yield put(setLoading(false));
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
  yield takeEvery(DELETE_BUSINESS_PAGE, handleBusinessPageDelete);
  yield takeEvery(GET_BUSINESS_PAGE_BY_ID, handleCurrentBusinessPageLoad);
  yield takeEvery(UPDATE_BUSINESS_PAGE, handleBusinessPageUpdate);
}
