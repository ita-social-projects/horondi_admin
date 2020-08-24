import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  setNews,
  setNewsLoading,
  setArticle,
  setNewsError,
  setPagesCount,
  setCurrentPage
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

const { skip, limit, newsPerPage } = config.paginationPayload;

function* handleNewsLoad({
  payload = {
    skip: 1,
    limit: 1,
    newsPerPage: 1
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

function* handleArticleLoad({ payload }) {
  try {
    yield put(setNewsLoading(true));
    const newsArticle = yield call(getArticleById, payload);
    yield put(setArticle(newsArticle));
    yield put(setNewsLoading(false));
  } catch (error) {
    yield call(handleNewsError, error);
  }
}

function* handleAddNews({ payload }) {
  try {
    yield put(setNewsLoading(true));
    yield call(createArticle, payload);
    const news = yield call(getAllNews, skip, limit);
    yield put(setPagesCount(Math.ceil(news.count / newsPerPage)));
    yield put(setNews(news.items));
    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_ADD_STATUS));
    yield put(setSnackBarStatus(true));
    yield put(push('/'));
  } catch (error) {
    yield call(handleNewsError, error);
  }
}

function* handleNewsDelete({ payload }) {
  try {
    yield put(setNewsLoading(true));
    yield call(deleteArticle, payload);
    const news = yield call(getAllNews, skip, limit);
    yield put(setPagesCount(Math.ceil(news.count / newsPerPage)));
    yield put(setCurrentPage(1));
    yield put(setNews(news.items));
    yield put(setNewsLoading(false));
    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_DELETE_STATUS));
    yield put(setSnackBarStatus(true));
  } catch (error) {
    yield call(handleNewsError, error);
  }
}

function* handleNewsUpdate({ payload }) {
  const { id, newArticle } = payload;
  try {
    yield put(setNewsLoading(true));
    yield call(updateArticle, id, newArticle);
    const news = yield call(getAllNews, skip, limit);
    yield put(setPagesCount(Math.ceil(news.count / newsPerPage)));
    yield put(setNews(news.items));
    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_UPDATE_STATUS));
    yield put(setSnackBarStatus(true));
    yield put(push('/'));
  } catch (error) {
    yield call(handleNewsError, error);
  }
}

function* handleNewsError(e) {
  yield put(setNewsLoading(false));
  yield put(setNewsError({ e }));
  yield put(setSnackBarSeverity('error'));
  yield put(setSnackBarMessage(e.message));
  yield put(setSnackBarStatus(true));
}

export default function* newsSaga() {
  yield takeEvery(GET_NEWS, handleNewsLoad);
  yield takeEvery(DELETE_ARTICLE, handleNewsDelete);
  yield takeEvery(GET_ARTICLE, handleArticleLoad);
  yield takeEvery(ADD_ARTICLE, handleAddNews);
  yield takeEvery(UPDATE_ARTICLE, handleNewsUpdate);
}
