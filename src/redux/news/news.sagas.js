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
import {handleRefreshTokenPair} from "../auth/auth.sagas";

const {
    SUCCESS_ADD_STATUS,
    SUCCESS_DELETE_STATUS,
    SUCCESS_UPDATE_STATUS
} = config.statuses;

export function* handleNewsLoad({payload: {skip, limit}}) {
    try {
        yield put(setNewsLoading(true));
        const news = yield call(getAllNews, skip, limit);
        yield put(setItemsCount(news.count));
        yield put(setNews(news.items));
        yield put(setNewsLoading(false));
    } catch (error) {
        yield call(handleNewsError, error);
    }
}

export function* handleArticleLoad({payload}) {
    try {
        yield put(setNewsLoading(true));
        const newsArticle = yield call(getArticleById, payload);
        yield put(setArticle(newsArticle));
        yield put(setNewsLoading(false));
    } catch (error) {
        yield call(handleNewsError, error);
    }
}

export function* handleAddNews({payload}) {
    const {article: news, upload} = payload;
    try {
        yield put(setNewsLoading(true));
        const article = yield call(createArticle, news, upload);

        if (article?.message === AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID) {
            yield call(handleRefreshTokenPair);
            yield handleAddNews({payload})
        } else {
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

        const deletedArticle = yield call(deleteArticle, payload);

        if (deletedArticle?.message === AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID) {
            yield call(handleRefreshTokenPair);
            yield handleNewsDelete({payload})
        } else {
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
        const updatedArticle = yield call(updateArticle, id, newArticle, upload);

        if (updatedArticle?.message === AUTH_ERRORS.ACCESS_TOKEN_IS_NOT_VALID) {
            yield call(handleRefreshTokenPair);
            yield handleNewsUpdate({payload})
        } else {
            yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
            yield put(push(config.routes.pathToNews));
        }

    } catch (error) {
        yield call(handleNewsError, error);
    }
}

export function* handleNewsError(e) {
    yield put(setNewsLoading(false));
    yield put(setNewsError({e}));
    yield call(handleErrorSnackbar, e.message);
}

export default function* newsSaga() {
    yield takeEvery(GET_NEWS, handleNewsLoad);
    yield takeEvery(DELETE_ARTICLE, handleNewsDelete);
    yield takeEvery(GET_ARTICLE, handleArticleLoad);
    yield takeEvery(ADD_ARTICLE, handleAddNews);
    yield takeEvery(UPDATE_ARTICLE, handleNewsUpdate);
}
