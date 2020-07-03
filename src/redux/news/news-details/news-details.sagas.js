import { takeEvery, call } from 'redux-saga/effects';
import { createItems } from '../../../utils/client';
import { GET_ARTICLE } from './news-details.types';

function* handleArticleLoad({ payload }) {
  yield call(
    createItems,
    `
        mutation($news: NewsInput!) {
          addNews(news: ${payload}) {
             video
           }
         }
    `
  );
}

export default function* newsDetailsSaga() {
  yield takeEvery(GET_ARTICLE, handleArticleLoad);
}
