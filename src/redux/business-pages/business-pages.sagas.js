import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  setBusinessPages,
  setLoading,
  setBusinessPagesError,
  setCurrentBusinessPage,
  removeBusinessPageFromStore
} from './business-pages.actions';
import {
  getAllBusinessPages,
  getBusinessTextByCodeWithPopulatedTranslationsKey,
  createBusinessPage,
  deleteBusinessPage,
  updateBusinessPage
} from './business-pages.operations';
import {
  ADD_BUSINESS_PAGE,
  DELETE_BUSINESS_PAGE,
  GET_ALL_BUSINESS_PAGES,
  GET_BUSINESS_PAGE_BY_CODE,
  UPDATE_BUSINESS_PAGE
} from './business-pages.types';

import { config } from '../../configs';

import {
  handleSuccessSnackbar,
  handleErrorSnackbar
} from '../snackbar/snackbar.sagas';
import { AUTH_ERRORS } from '../../error-messages/auth';
import { handleAdminLogout } from '../auth/auth.sagas';

const { SUCCESS_ADD_STATUS, SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } =
  config.statuses;

const { routes } = config;

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

export function* handleCurrentBusinessPageLoad({ payload }) {
  try {
    yield put(setLoading(true));
    const businessPage = yield call(
      getBusinessTextByCodeWithPopulatedTranslationsKey,
      payload
    );
    yield put(setCurrentBusinessPage(businessPage));
    yield put(setLoading(false));
  } catch (error) {
    yield call(handleBusinessPageError, error);
  }
}

export function* handleAddBusinessPage({ payload }) {
  try {
    yield put(setLoading(true));
    const businessPage = yield call(createBusinessPage, payload);

    if (businessPage) {
      yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
      yield put(setLoading(false));
      yield put(push(routes.pathToBusinessPages));
    }
  } catch (error) {
    yield call(handleBusinessPageError, error);
  }
}

export function* handleBusinessPageDelete({ payload }) {
  try {
    yield put(setLoading(true));
    const businessPage = yield call(deleteBusinessPage, payload);

    if (businessPage) {
      yield put(removeBusinessPageFromStore(payload));
      yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
      yield put(setLoading(false));
    }
  } catch (error) {
    yield call(handleBusinessPageError, error);
  }
}

export function* handleBusinessPageUpdate({ payload }) {
  try {
    yield put(setLoading(true));
    const businessPage = yield call(updateBusinessPage, payload);

    if (businessPage) {
      yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
      yield put(setLoading(false));
      yield put(push(routes.pathToMainPage));
    }
  } catch (error) {
    yield call(handleBusinessPageError, error);
  }
}

export function* handleBusinessPageError(e) {
  if (
    e.message === AUTH_ERRORS.REFRESH_TOKEN_IS_NOT_VALID ||
    e.message === AUTH_ERRORS.USER_IS_BLOCKED
  ) {
    yield call(handleAdminLogout);
  } else {
    yield put(setLoading(false));
    yield put(setBusinessPagesError({ e }));
    yield call(handleErrorSnackbar, e.message);
  }
}

export default function* businessPagesSaga() {
  yield takeEvery(GET_ALL_BUSINESS_PAGES, handleBusinessPagesLoad);
  yield takeEvery(ADD_BUSINESS_PAGE, handleAddBusinessPage);
  yield takeEvery(DELETE_BUSINESS_PAGE, handleBusinessPageDelete);
  yield takeEvery(GET_BUSINESS_PAGE_BY_CODE, handleCurrentBusinessPageLoad);
  yield takeEvery(UPDATE_BUSINESS_PAGE, handleBusinessPageUpdate);
}
