import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  getHomePageLooksImages,
  updateHomePageLooksImage
} from './home.operations';

import {
  setHomePageData,
  setHomePageDataLoading,
  updateHomePageImagesInStore,
  setHomePageDataError
} from './home.actions';

import { GET_HOME_PAGE_DATA, UPDATE_HOME_PAGE_DATA } from './home.types';

import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../snackbar/snackbar.actions';

import { config } from '../../configs';

const { SUCCESS_UPDATE_STATUS } = config.statuses;

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

export function* handleHomePageImagesUpdate({ payload }) {
  const { id, upload } = payload;

  try {
    yield put(setHomePageDataLoading(true));

    yield call(updateHomePageLooksImage, id, upload);
    yield put(updateHomePageImagesInStore(id, upload));

    yield put(setHomePageDataLoading(false));
    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_UPDATE_STATUS));
    yield put(setSnackBarStatus(true));
    yield put(push('/home-page-edit'));
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
  yield takeEvery(UPDATE_HOME_PAGE_DATA, handleHomePageImagesUpdate);
}
