import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { setNews, hideLoader, showLoader, setArticle } from './news.actions';
import {
  getAllNews,
  deleteArticle,
  createArticle,
  updateArticle,
  getArticleById
} from '../../utils/client';
import {
  GET_NEWS,
  DELETE_NEWS_ITEM,
  ADD_ARTICLE,
  UPDATE_NEWS_ITEM,
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
    yield put(showLoader());
    const news = yield call(getAllNews, null);
    yield put(setNews(news.data.getAllNews));
    yield put(hideLoader());
  } catch (error) {
    console.log(error);
  }
}

function* handleArticleLoad({ payload }) {
  try {
    yield put(showLoader());
    const newsArticle = yield call(getArticleById, payload);
    yield put(setArticle(newsArticle.data.getNewsById));
    yield put(hideLoader());
  } catch (error) {
    console.log(error);
  }
}

function* handleAddNews({ payload }) {
  try {
    yield put(showLoader());
    yield call(createArticle, payload);
    const news = yield call(getAllNews, null);
    yield put(setNews(news.data.getAllNews));
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
    yield put(showLoader());
    yield call(deleteArticle, payload);
    const news = yield call(getAllNews, null);
    yield put(setNews(news.data.getAllNews));
    yield put(hideLoader());
  } catch (error) {
    console.log(error);
  }
}

function* handleNewsUpdate({ payload }) {
  const { id, newArticle } = payload;
  try {
    yield put(showLoader());
    yield call(updateArticle, id, newArticle);
    const news = yield call(getAllNews, null);
    yield put(setNews(news.data.getAllNews));
    yield put(push('/'));
  } catch (error) {
    console.log(error);
  }
}

export default function* newsSaga() {
  yield takeEvery(GET_NEWS, handleNewsLoad);
  yield takeEvery(DELETE_NEWS_ITEM, handleNewsDelete);
  yield takeEvery(GET_ARTICLE, handleArticleLoad);
  yield takeEvery(ADD_ARTICLE, handleAddNews);
  yield takeEvery(UPDATE_NEWS_ITEM, handleNewsUpdate);
}
