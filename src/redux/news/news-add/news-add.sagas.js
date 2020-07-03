import { takeEvery, call } from 'redux-saga/effects';
import { createItems } from '../../../utils/client';
import { ADD_NEWS_ITEM } from './news-add.types';

function* handleAddNews({ payload }) {
  const { video, author, title, text, images, date } = payload;
  const { name, image } = author;
  try {
    // Error: call: argument of type {context, fn} has undefined or null `fn`

    // But added newsItem into database

    // Benefit: you can add obj into news, and when you want to modify input obj - you modify only graphQL on back-end and inputs on page, without hardcoding

    // yield call(
    //   client.mutate({
    //     mutation: gql`
    //       mutation($news: NewsInput!) {
    //         addNews(news: $news) {
    //           video
    //         }
    //       }
    //     `,
    //     variables: { news: payload }
    //   })
    // );

    // works without errors
    // Is it hardcode?

    yield call(
      createItems,
      `
      mutation {
        addNews(
          news: {
            video: "${video}",
            author: {
              name: [
                { lang: "${name[0].lang}", value: "${name[0].value}" }
                { lang: "${name[1].lang}", value: "${name[1].value}" }
              ]
              image: { small: "${image.small}" }
            }
            title: [
              { lang: "${title[0].lang}", value: "${title[0].value}" }
              { lang: "${title[1].lang}", value: "${title[1].value}" }
            ]
            text: [
              { lang: "${text[0].lang}", value: "${text[0].value}" }
              { lang: "${text[1].lang}", value: "${text[1].value}" }
            ]
            images: {
              primary: { large: "${images.primary.large}" }
              additional: { large: "${images.additional.large}" }
            }
            date: "${date}"
          }
        ) {
          video
        }
      }
      `
    );
  } catch (err) {
    console.log(err);
  }
}

export default function* newsAddSaga() {
  yield takeEvery(ADD_NEWS_ITEM, handleAddNews);
}
