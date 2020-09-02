import { all } from 'redux-saga/effects';
import newsSaga from './news/news.sagas';
import authSaga from './auth/auth.sagas';
import themeSaga from './theme/theme.sagas';
import usersSaga from './users/users.saga';

export default function* rootSaga() {
  yield all([newsSaga(), authSaga(), themeSaga(), usersSaga()]);
}
