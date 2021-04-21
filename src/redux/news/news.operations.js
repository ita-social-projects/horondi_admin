import { gql } from '@apollo/client';
import { client, getItems } from '../../utils/client';
import { newsTranslations } from '../../translations/news.translations';
import { getFromLocalStorage } from '../../services/local-storage.service';

const getAllNews = async (skip, limit) => {
  const query = `
      query($skip: Int, $limit: Int) {
        getAllNews(skip: $skip, limit: $limit) {
          items {
            _id
            author {
              name {
                lang
                value
              }
              image
            }
            title {
              lang
              value
            }
          }
          count
        }
      }
    `;

  const { data } = await getItems(query, {
    limit,
    skip
  });
  return data.getAllNews;
};

const getArticleById = async (id) => {
  const query = `
      query($id: ID!) {
        getNewsById(id: $id) {
          ... on News {
            title {
              lang
              value
            }
            text {
              lang
              value
            }
            image
            author {
              name {
                lang
                value
              }
              image
            }
            languages
            date
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const { data } = await getItems(query, { id });

  if (data.getNewsById.message) {
    throw new Error(
      `${data.getNewsById.statusCode} ${
        newsTranslations[data.getNewsById.message]
      }`
    );
  }

  return data.getNewsById;
};

const deleteArticle = async (id) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');

  const result = await client.mutate({
    variables: { id },
    context: { headers: { token } },
    mutation: gql`
      mutation($id: ID!) {
        deleteNews(id: $id) {
          ... on News {
            author {
              name {
                value
              }
            }
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  await client.resetStore();

  if (result.data.deleteNews.message) {
    throw new Error(
      `${result.data.deleteNews.statusCode} ${
        newsTranslations[result.data.deleteNews.message]
      }`
    );
  }

  return result.data.deleteNews;
};

const createArticle = async (news, upload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  const result = await client.mutate({
    variables: { news, upload },
    context: { headers: { token } },
    mutation: gql`
      mutation($news: NewsInput!, $upload: Upload) {
        addNews(news: $news, upload: $upload) {
          ... on News {
            author {
              name {
                value
              }
            }
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  });
  await client.resetStore();

  if (result.data.addNews.message) {
    throw new Error(
      `${result.data.addNews.statusCode} ${
        newsTranslations[result.data.addNews.message]
      }`
    );
  }

  return result.data.addNews;
};

const updateArticle = async (id, news, upload) => {
  const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');
  const result = await client.mutate({
    variables: {
      id,
      news,
      upload
    },
    context: { headers: { token } },
    mutation: gql`
      mutation($id: ID!, $news: NewsInput!, $upload: Upload) {
        updateNews(id: $id, news: $news, upload: $upload) {
          ... on News {
            author {
              name {
                value
              }
            }
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `
  });
  await client.resetStore();

  if (result.data.updateNews.message) {
    throw new Error(
      `${result.data.updateNews.statusCode} ${
        newsTranslations[result.data.updateNews.message]
      }`
    );
  }

  return result.data.updateNews;
};

export {
  getAllNews,
  deleteArticle,
  getArticleById,
  createArticle,
  updateArticle
};
