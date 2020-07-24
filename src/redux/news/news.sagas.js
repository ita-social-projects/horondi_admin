import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { setNews, setNewsLoading, setArticle } from './news.actions';
import { setError } from '../error/error.actions';

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
const { errorsLanguage } = config;

function* handleNewsLoad() {
  try {
    yield put(setNewsLoading(true));
    const news = yield call(getAllNews, null);
    yield put(setNews(news.data.getAllNews));
    yield put(setNewsLoading(false));
  } catch (error) {
    yield call(handleNewsError, error);
  }
}

function* handleArticleLoad({ payload }) {
  try {
    yield put(setNewsLoading(true));
    const newsArticle = yield call(getArticleById, payload);
    if (newsArticle.data.getNewsById.author) {
      yield put(setArticle(newsArticle.data.getNewsById));
    }
    if (newsArticle.data.getNewsById.message) {
      yield call(
        handleCustomNewsError,
        newsArticle.data.getNewsById.message[errorsLanguage].value
      );
    }
    yield put(setNewsLoading(false));
  } catch (error) {
    yield call(handleNewsError, error);
  }
}

function* handleAddNews({ payload }) {
  try {
    yield put(setNewsLoading(true));
    const result = yield call(createArticle, payload);
    if (result.data.addNews.message) {
      yield call(
        handleCustomNewsError,
        result.data.addNews.message[errorsLanguage].value
      );
    }
    const news = yield call(getAllNews, null);
    yield put(setNews(news.data.getAllNews));
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
    const result = yield call(deleteArticle, payload);
    if (result.data.deleteNews.message) {
      yield call(
        handleCustomNewsError,
        result.data.deleteNews.message[errorsLanguage].value
      );
    }
    const news = yield call(getAllNews, null);
    yield put(setNews(news.data.getAllNews));
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
    const result = yield call(updateArticle, id, newArticle);
    if (result.data.updateNews.message) {
      yield call(
        handleCustomNewsError,
        result.data.updateNews.message[errorsLanguage].value
      );
    }
    const news = yield call(getAllNews, null);
    yield put(setNews(news.data.getAllNews));
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
  yield put(setError({ e }));
  yield put(setSnackBarSeverity('error'));
  yield put(setSnackBarMessage(e.message));
  yield put(setSnackBarStatus(true));
}

function* handleCustomNewsError(e) {
  yield put(setNewsLoading(false));
  yield put(setError({ e }));
  yield put(setSnackBarSeverity('error'));
  yield put(setSnackBarMessage(e));
  yield put(setSnackBarStatus(true));
}

export default function* newsSaga() {
  yield takeEvery(GET_NEWS, handleNewsLoad);
  yield takeEvery(DELETE_ARTICLE, handleNewsDelete);
  yield takeEvery(GET_ARTICLE, handleArticleLoad);
  yield takeEvery(ADD_ARTICLE, handleAddNews);
  yield takeEvery(UPDATE_ARTICLE, handleNewsUpdate);
}
