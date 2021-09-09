import { all } from 'redux-saga/effects';
import newsSaga from './news/news.sagas';
import authSaga from './auth/auth.sagas';
import { themeSaga } from './theme/theme.sagas';
import materialSaga from './material/material.sagas';
import patternSaga from './pattern/pattern.sagas';
import businessPagesSaga from './business-pages/business-pages.sagas';
import productsSaga from './products/products.sagas';
import categorySaga from './categories/categories.sagas';
import usersSaga from './users/users.saga';
import currenciesSaga from './currencies/currencies.saga';
import commentsSaga from './comments/comments.sagas';
import sizesSaga from './sizes/sizes.sagas';
import contactsSaga from './contact/contact.sagas';
import ordersSaga from './orders/orders.sagas';
import modelSaga from './model/model.sagas';
import homePageSaga from './home/home.sagas';
import statsSaga from './stats/stats.sagas';
import emailQuestionSaga from './email-questions/email-questions.sagas';
import headerSaga from './header/header.sagas';
import homePageSlideSaga from './home-page-slides/home-page-slides.sagas';
import colorsSaga from './color/color.sagas';
import constructorSaga from './constructor/constructor.sagas';
import snackbarSaga from './snackbar/snackbar.sagas';
import historySaga from './history/history.sagas';
import pocketsSaga from './pockets/pockets.sagas';
import backSaga from './back/back.sagas';
import bottomSaga from './bottom/bottom.sagas';
import positionSaga from './position/position.sagas';
import closuresSaga from './closures/closures.sagas';
import basicsSaga from './basics/basics.sagas';

export function* rootSaga() {
  yield all([
    historySaga(),
    newsSaga(),
    authSaga(),
    themeSaga(),
    categorySaga(),
    usersSaga(),
    materialSaga(),
    patternSaga(),
    businessPagesSaga(),
    productsSaga(),
    contactsSaga(),
    commentsSaga(),
    sizesSaga(),
    homePageSaga(),
    emailQuestionSaga(),
    statsSaga(),
    modelSaga(),
    headerSaga(),
    ordersSaga(),
    homePageSlideSaga(),
    colorsSaga(),
    constructorSaga(),
    snackbarSaga(),
    backSaga(),
    bottomSaga(),
    snackbarSaga(),
    pocketsSaga(),
    positionSaga(),
    closuresSaga(),
    currenciesSaga(),
    basicsSaga()
  ]);
}
