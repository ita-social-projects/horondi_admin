import { all } from 'redux-saga/effects';
import newsSaga from './news/news.sagas';
import adminSaga from './admin/admin.sagas';

export default function* rootSaga() {
  yield all([newsSaga(), adminSaga()]);
}
