import { all } from 'redux-saga/effects';
import newsSaga from './news/news.sagas';
import newsDetailsSaga from './news/news-details/news-details.sagas';

export default function* rootSaga() {
  yield all([newsSaga(), newsDetailsSaga()]);
}
