import { all } from 'redux-saga/effects';
import newsSaga from './news/news.sagas';
import newsAddSaga from './news/news-add/news-add.sagas';

export default function* rootSaga() {
  yield all([newsSaga(), newsAddSaga()]);
}
