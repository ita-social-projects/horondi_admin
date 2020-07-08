import { takeEvery, call, put } from 'redux-saga/effects';
import { setNews, hideLoader, showLoader } from './news.actions';
import { getAllNews, deleteNewsItem } from '../../utils/client';
import { GET_NEWS, DELETE_NEWS_ITEM } from './news.types';

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
}
