import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  setNews,
  setNewsLoading,
  setArticle,
  setNewsError,
  setPagesCount,
  setCurrentPage,
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

import { config } from '../../configs';

import routes from '../../configs/routes';
import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = config.statuses;

const { skip, limit, newsPerPage } = config.newsPaginationPayload;

export function* handleNewsLoad({
  payload = {
    skip,
    limit,
    newsPerPage
  }
}) {
  try {
    yield put(setNewsLoading(true));
    const news = yield call(getAllNews, payload.skip, payload.limit);
    yield put(setPagesCount(Math.ceil(news.count / payload.newsPerPage)));
    yield put(setNews(news.items));
    yield put(setNewsLoading(false));
  } catch (error) {
    yield call(handleNewsError, error);
  }
}

export function* handleArticleLoad({ payload }) {
  try {
    yield put(setNewsLoading(true));
    const newsArticle = yield call(getArticleById, payload);
    yield put(setArticle(newsArticle));
    yield put(setNewsLoading(false));
  } catch (error) {
    yield call(handleNewsError, error);
  }
}

export function* handleAddNews({ payload }) {
  const { article: news, upload } = payload;
  try {
    yield put(setNewsLoading(true));
    yield call(createArticle, news, upload);
    yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
    yield put(push(routes.pathToNews));
  } catch (error) {
    yield call(handleNewsError, error);
  }
}

export function* handleNewsDelete({ payload }) {
  try {
    yield put(setNewsLoading(true));
    yield call(deleteArticle, payload);
    yield put(setCurrentPage(1));
    yield put(removeArticleFromStore(payload));
    yield put(setNewsLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (error) {
    yield call(handleNewsError, error);
  }
}

export function* handleNewsUpdate({ payload }) {
  const { id, newArticle, upload } = payload;
  try {
    yield put(setNewsLoading(true));
    yield call(updateArticle, id, newArticle, upload);
    yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
    yield put(push(config.routes.pathToNews));
  } catch (error) {
    yield call(handleNewsError, error);
  }
}

export function* handleNewsError(e) {
  yield put(setNewsLoading(false));
  yield put(setNewsError({ e }));
  yield call(handleErrorSnackbar, e.message);
}

export default function* newsSaga() {
  yield takeEvery(GET_NEWS, handleNewsLoad);
  yield takeEvery(DELETE_ARTICLE, handleNewsDelete);
  yield takeEvery(GET_ARTICLE, handleArticleLoad);
  yield takeEvery(ADD_ARTICLE, handleAddNews);
  yield takeEvery(UPDATE_ARTICLE, handleNewsUpdate);
}
