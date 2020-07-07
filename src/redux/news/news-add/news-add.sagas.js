import { takeEvery, call } from 'redux-saga/effects';
import { createNewsItem } from '../../../utils/client';
import { ADD_NEWS_ITEM } from './news-add.types';

function* handleAddNews({ payload }) {
  try {
    yield call(createNewsItem, payload);
  } catch (err) {
    console.log(err);
  }
}

export default function* newsAddSaga() {
  yield takeEvery(ADD_NEWS_ITEM, handleAddNews);
}
