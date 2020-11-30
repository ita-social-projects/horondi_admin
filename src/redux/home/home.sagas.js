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

import { config } from '../../configs';
import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';

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
    yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
    yield put(push('/home-page-edit'));
  } catch (error) {
    yield call(handleHomePageError, error);
  }
}

export function* handleHomePageError(e) {
  yield put(setHomePageDataLoading(false));
  yield put(setHomePageDataError({ e }));
  yield call(handleErrorSnackbar, e.message);
}

export default function* homePageSaga() {
  yield takeEvery(GET_HOME_PAGE_DATA, handleHomePageImagesLoad);
  yield takeEvery(UPDATE_HOME_PAGE_DATA, handleHomePageImagesUpdate);
}
