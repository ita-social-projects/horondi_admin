import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  getHomePageLooksImages,
  addHomePageLooksImages,
  updateHomePageLooksImage,
  deleteHomePageLooksImage
} from './home.operations';

import {
  setHomePageData,
  setHomePageDataLoading,
  addHomePageDataInStore,
  updateHomePageImagesInStore,
  deleteHomePageImagesInStore,
  setHomePageDataError
} from './home.actions';

import {
  GET_HOME_PAGE_DATA,
  ADD_HOME_PAGE_DATA,
  UPDATE_HOME_PAGE_DATA,
  DELETE_HOME_PAGE_DATA
} from './home.types';

import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../snackbar/snackbar.actions';

import { config } from '../../configs';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = config.statuses;

export function* handleHomePageImagesLoad() {
  try {
    yield put(setHomePageDataLoading(true));
    const homePageImages = yield call(getHomePageLooksImages);

    yield put(setHomePageData(homePageImages));
    yield put(setHomePageDataLoading(false));
  } catch (error) {
    yield call(handleHomePageError, error);
  }
}

export function* handleHomePageImagesAdd({ payload }) {
  try {
    yield put(setHomePageDataLoading(true));
    yield call(addHomePageLooksImages, payload.newImages);
    yield put(addHomePageDataInStore(payload.newImages));
    yield put(setHomePageDataLoading(false));

    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_ADD_STATUS));
    yield put(setSnackBarStatus(true));
    yield put(push('/home-page-edit'));
  } catch (error) {
    yield call(handleHomePageError, error);
  }
}

export function* handleHomePageImagesUpdate({ payload }) {
  const { id, updatedImages } = payload;

  try {
    yield put(setHomePageDataLoading(true));

    yield call(updateHomePageLooksImage, id, updatedImages);
    yield put(updateHomePageImagesInStore(id, updatedImages));

    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_UPDATE_STATUS));
    yield put(setSnackBarStatus(true));
    yield put(push('/home-page-edit'));
  } catch (error) {
    yield call(handleHomePageError, error);
  }
}

export function* handleHomePageImagesDelete({ payload }) {
  try {
    yield put(setHomePageDataLoading(true));

    yield call(deleteHomePageLooksImage, payload);
    yield put(deleteHomePageImagesInStore(payload));
    const homePageImages = yield call(getHomePageLooksImages);
    yield put(setHomePageData(homePageImages));

    yield put(setHomePageDataLoading(false));

    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_DELETE_STATUS));
    yield put(setSnackBarStatus(true));
  } catch (error) {
    yield call(handleHomePageError, error);
  }
}

export function* handleHomePageError(e) {
  yield put(setHomePageDataLoading(false));
  yield put(setHomePageDataError({ e }));
  yield put(setSnackBarSeverity('error'));
  yield put(setSnackBarMessage(e.message));
  yield put(setSnackBarStatus(true));
}

export default function* homePageSaga() {
  yield takeEvery(GET_HOME_PAGE_DATA, handleHomePageImagesLoad);
  yield takeEvery(ADD_HOME_PAGE_DATA, handleHomePageImagesAdd);
  yield takeEvery(UPDATE_HOME_PAGE_DATA, handleHomePageImagesUpdate);
  yield takeEvery(DELETE_HOME_PAGE_DATA, handleHomePageImagesDelete);
}
