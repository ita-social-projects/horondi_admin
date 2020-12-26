import { gql } from '@apollo/client';
import { client } from '../../utils/client';
import { newsTranslations } from '../../translations/news.translations';
import { getFromLocalStorage } from '../../services/local-storage.service';

const getAllNews = async (skip, limit) => {
  const result = await client.query({
    variables: {
      skip,
      limit
    },
    query: gql`
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
    `
  });

  return result.data.getAllNews;
};

const getArticleById = async (id) => {
  const result = await client.query({
    variables: { id },
    query: gql`
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
    `,
    fetchPolicy: 'no-cache'
  });

  if (result.data.getNewsById.message) {
    throw new Error(
      `${result.data.getNewsById.statusCode} ${
        newsTranslations[result.data.getNewsById.message]
      }`
    );
  }

  return result.data.getNewsById;
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
