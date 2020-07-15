import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { setNews, hideLoader, showLoader } from './news.actions';
import { getAllNews, deleteNewsItem, createNewsItem } from '../../utils/client';
import { GET_NEWS, DELETE_NEWS_ITEM, ADD_NEWS_ITEM } from './news.types';
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

function* handleAddNews({ payload }) {
  try {
    yield call(createNewsItem, payload);
    yield put(push('/'));
    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_ADD_STATUS));
    yield put(setSnackBarStatus(true));
  } catch (err) {
    console.log(err);
  }
}

function* handleNewsDelete({ payload }) {
  try {
    yield put(showLoader());
    yield call(deleteNewsItem, payload);
    const news = yield call(getAllNews, null);
    yield put(setNews(news.data.getAllNews));
    yield put(hideLoader());
  } catch (error) {
    console.log(error);
  }
}

export default function* newsSaga() {
  yield takeEvery(GET_NEWS, handleNewsLoad);
  yield takeEvery(DELETE_NEWS_ITEM, handleNewsDelete);
  yield takeEvery(ADD_NEWS_ITEM, handleAddNews);
}
