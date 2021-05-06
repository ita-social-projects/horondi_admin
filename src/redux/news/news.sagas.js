import {takeEvery, call, put} from 'redux-saga/effects';
import {push} from 'connected-react-router';

import {setItemsCount, updatePagination} from '../table/table.actions';
import {
    setNews,
    setNewsLoading,
    setArticle,
    setNewsError,
    removeArticleFromStore
} from './news.actions';
import {
    getAllNews,
    deleteArticle,
    createArticle,
    updateArticle,
    getArticleById
} from './news.operations';
import {
    GET_NEWS,
    DELETE_ARTICLE,
    ADD_ARTICLE,
    UPDATE_ARTICLE,
    GET_ARTICLE
} from './news.types';
import {config} from '../../configs';
import routes from '../../configs/routes';
import {
    handleErrorSnackbar,
    handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';
import {AUTH_ERRORS} from "../../error-messages/auth";
import {handleAdminLogout} from "../auth/auth.sagas";

const {
    SUCCESS_ADD_STATUS,
    SUCCESS_DELETE_STATUS,
    SUCCESS_UPDATE_STATUS
} = config.statuses;

export function* handleNewsLoad({payload: {skip, limit, filter}}) {
    try {
        yield put(setNewsLoading(true));
        const news = yield call(getAllNews, skip, limit, filter);

        if (news) {
            yield put(setItemsCount(news?.count));
            yield put(setNews(news?.items));
            yield put(setNewsLoading(false));
        }

    } catch (error) {
        yield call(handleNewsError, error);
    }
}

export function* handleArticleLoad({payload}) {
    try {
        yield put(setNewsLoading(true));
        const newsArticle = yield call(getArticleById, payload);

        if (newsArticle) {
            yield put(setArticle(newsArticle));
            yield put(setNewsLoading(false));
        }

    } catch (error) {
        yield call(handleNewsError, error);
    }
}

export function* handleAddNews({payload}) {
    const {article: news, upload} = payload;
    try {
        yield put(setNewsLoading(true));
        const newsArticle = yield call(createArticle, news, upload);

        if (newsArticle) {
            yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
            yield put(push(routes.pathToNews));
        }
    } catch (error) {
        yield call(handleNewsError, error);
    }
}

export function* handleNewsDelete({payload}) {
    try {
        yield put(setNewsLoading(true));

        const newsArticle = yield call(deleteArticle, payload);

        if (newsArticle) {
            yield put(removeArticleFromStore(payload));
            yield put(setNewsLoading(false));
            yield put(updatePagination());
            yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
        }
    } catch (error) {
        yield call(handleNewsError, error);
    }
}

export function* handleNewsUpdate({payload}) {
    const {id, newArticle, upload} = payload;
    try {
        yield put(setNewsLoading(true));
        const newsArticle = yield call(updateArticle, id, newArticle, upload);

        if (newsArticle) {
            yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
            yield put(push(config.routes.pathToNews));
        }
    } catch (error) {
        yield call(handleNewsError, error);
    }
}

export function* handleNewsError(e) {
    if (e.message === AUTH_ERRORS.REFRESH_TOKEN_IS_NOT_VALID) {
        yield call(handleAdminLogout);
    } else {
        yield put(setNewsLoading(false));
        yield put(setNewsError({e}));
        yield call(handleErrorSnackbar, e.message);
    }
}

export default function* newsSaga() {
    yield takeEvery(GET_NEWS, handleNewsLoad);
    yield takeEvery(DELETE_ARTICLE, handleNewsDelete);
    yield takeEvery(GET_ARTICLE, handleArticleLoad);
    yield takeEvery(ADD_ARTICLE, handleAddNews);
    yield takeEvery(UPDATE_ARTICLE, handleNewsUpdate);
}
