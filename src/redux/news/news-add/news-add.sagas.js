import { takeEvery, call } from 'redux-saga/effects';
import { gql } from 'apollo-boost';
import { client } from '../../../utils/client';
import { ADD_NEWS_ITEM } from './news-add.types';

function* handleAddNews({ payload }) {
  // yield call(
  //     createItems,
  //     `
  //     mutation($news: NewsInput!) {
  //       addNews(news: $news) {
  //          video
  //        }
  //      }
  // `
  // );

  yield call(
    client.mutate({
      variables: { news: payload },
      mutation: gql`
        mutation($news: NewsInput!) {
          addNews(news: $news) {
            video
          }
        }
      `
    })
  );
}

export default function* newsAddSaga() {
  yield takeEvery(ADD_NEWS_ITEM, handleAddNews);
}
