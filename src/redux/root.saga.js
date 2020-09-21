import { all } from 'redux-saga/effects';
import newsSaga from './news/news.sagas';
import authSaga from './auth/auth.sagas';
import themeSaga from './theme/theme.sagas';
import materialSaga from './material/material.sagas';
import productsSaga from './products/products.sagas';
import categorySaga from './categories/categories.sagas';
import usersSaga from './users/users.saga';
import contactsSaga from './contact/contact.sagas';

export default function* rootSaga() {
  yield all([
    newsSaga(),
    authSaga(),
    themeSaga(),
    usersSaga(),
    categorySaga(),
    materialSaga(),
    productsSaga(),
    contactsSaga()
  ]);
}
