import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { setNews, setLoading, setArticle } from './news.actions';
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

const { SUCCESS_ADD_STATUS } = config.statuses;

function* handleNewsLoad() {
  try {
    yield put(setLoading(true));
    const news = yield call(getAllNews, null);
    yield put(setNews(news));
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
}

function* handleArticleLoad({ payload }) {
  try {
    yield put(setLoading(true));
    const newsArticle = yield call(getArticleById, payload);
    yield put(setArticle(newsArticle));
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
}

function* handleAddNews({ payload }) {
  try {
    yield put(setLoading(true));
    yield call(createArticle, payload);
    const news = yield call(getAllNews, null);
    yield put(setNews(news));
    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_ADD_STATUS));
    yield put(setSnackBarStatus(true));
    yield put(push('/'));
  } catch (err) {
    console.log(err);
  }
}

function* handleNewsDelete({ payload }) {
  try {
    yield put(setLoading(true));
    yield call(deleteArticle, payload);
    const news = yield call(getAllNews, null);
    yield put(setNews(news));
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
}

function* handleNewsUpdate({ payload }) {
  const { id, newArticle } = payload;
  try {
    yield put(setLoading(true));
    yield call(updateArticle, id, newArticle);
    const news = yield call(getAllNews, null);
    yield put(setNews(news));
    yield put(push('/'));
  } catch (error) {
    console.log(error);
  }
}

export default function* newsSaga() {
  yield takeEvery(GET_NEWS, handleNewsLoad);
  yield takeEvery(DELETE_ARTICLE, handleNewsDelete);
  yield takeEvery(GET_ARTICLE, handleArticleLoad);
  yield takeEvery(ADD_ARTICLE, handleAddNews);
  yield takeEvery(UPDATE_ARTICLE, handleNewsUpdate);
}
