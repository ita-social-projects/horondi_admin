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
import routes from '../../configs/routes';
import { AUTH_ERRORS } from '../../error-messages/auth';
import { handleAdminLogout } from '../auth/auth.sagas';

const { SUCCESS_UPDATE_STATUS } = config.statuses;

export function* handleHomePageImagesLoad() {
  try {
    yield put(setHomePageDataLoading(true));
    const homePageImages = yield call(getHomePageLooksImages);

    if (homePageImages) {
      yield put(setHomePageData(homePageImages));
      yield put(setHomePageDataLoading(false));
    }
  } catch (error) {
    yield call(handleHomePageError, error);
  }
}

export function* handleHomePageImagesUpdate({ payload: { id, upload } }) {
  try {
    yield put(setHomePageDataLoading(true));

    const data = yield call(updateHomePageLooksImage, id, upload);

    if (data) {
      yield put(updateHomePageImagesInStore(id, data));
      yield put(setHomePageDataLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
      yield put(push(routes.pathToHomePageEdit));
    }
  } catch (error) {
    yield call(handleHomePageError, error);
  }
}

export function* handleHomePageError(e) {
  if (
    e.message === AUTH_ERRORS.REFRESH_TOKEN_IS_NOT_VALID ||
    e.message === AUTH_ERRORS.USER_IS_BLOCKED
  ) {
    yield call(handleAdminLogout);
  } else {
    yield put(setHomePageDataLoading(false));
    yield put(setHomePageDataError({ e }));
    yield call(handleErrorSnackbar, e.message);
  }
}

export default function* homePageSaga() {
  yield takeEvery(GET_HOME_PAGE_DATA, handleHomePageImagesLoad);
  yield takeEvery(UPDATE_HOME_PAGE_DATA, handleHomePageImagesUpdate);
}
