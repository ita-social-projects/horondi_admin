import {takeEvery, call, put} from 'redux-saga/effects';
import {push} from 'connected-react-router';

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

import {GET_HOME_PAGE_DATA, UPDATE_HOME_PAGE_DATA} from './home.types';

import {config} from '../../configs';
import {
    handleErrorSnackbar,
    handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';
import {AUTH_ERRORS} from '../../error-messages/auth';
import {handleRefreshTokenPair} from '../auth/auth.sagas';
import routes from '../../configs/routes';

const {SUCCESS_UPDATE_STATUS} = config.statuses;

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

export function* handleHomePageImagesUpdate({payload: {id, upload}}) {
    try {
        yield put(setHomePageDataLoading(true));

        const data = yield call(updateHomePageLooksImage, id, upload);

        if (data?.message === AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID) {
            yield call(handleRefreshTokenPair);
            yield handleHomePageImagesUpdate({payload: {id, upload}});
        } else {
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
    yield put(setHomePageDataLoading(false));
    yield put(setHomePageDataError({e}));
    yield call(handleErrorSnackbar, e.message);
}

export default function* homePageSaga() {
    yield takeEvery(GET_HOME_PAGE_DATA, handleHomePageImagesLoad);
    yield takeEvery(UPDATE_HOME_PAGE_DATA, handleHomePageImagesUpdate);
}
