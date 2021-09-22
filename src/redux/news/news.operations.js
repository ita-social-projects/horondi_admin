import { getItems, setItems } from '../../utils/client';
import { newsTranslations } from '../../configs/error-modal-messages';

const getAllNews = async (skip, limit, filter) => {
  const query = `
      query($skip: Int, $limit: Int, $filter:NewsFilterInput) {
        getAllNews(skip: $skip, limit: $limit, filter:$filter) {
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

  const result = await getItems(query, {
    limit,
    skip,
    filter
  });
  return result?.data?.getAllNews;
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

  const result = await getItems(query, { id });

  if (
    Object.keys(newsTranslations).includes(result?.data?.getNewsById?.message)
  ) {
    throw new Error(
      `${result.data.getNewsById.statusCode} ${
        newsTranslations[result.data.getNewsById.message]
      }`
    );
  }

  return result?.data?.getNewsById;
};
const deleteArticle = async (id) => {
  const query = `
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
    `;

  const result = await setItems(query, { id });

  if (
    Object.keys(newsTranslations).includes(result?.data?.deleteNews?.message)
  ) {
    throw new Error(
      `${result.data.deleteNews.statusCode} ${
        newsTranslations[result.data.deleteNews.message]
      }`
    );
  }

  return result?.data?.deleteNews;
};
const createArticle = async (news, upload) => {
  const query = `
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
    `;

  const result = await setItems(query, { news, upload });

  if (Object.keys(newsTranslations).includes(result?.data?.addNews?.message)) {
    throw new Error(
      `${result.data.addNews.statusCode} ${
        newsTranslations[result.data.addNews.message]
      }`
    );
  }

  return result?.data?.addNews;
};
const updateArticle = async (id, news, upload) => {
  const query = `
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
    `;
  const result = await setItems(query, { id, news, upload });

  if (
    Object.keys(newsTranslations).includes(result?.data?.updateNews?.message)
  ) {
    throw new Error(
      `${result.data.updateNews.statusCode} ${
        newsTranslations[result.data.updateNews.message]
      }`
    );
  }

  return result?.data?.updateNews;
};

export {
  getAllNews,
  deleteArticle,
  getArticleById,
  createArticle,
  updateArticle
};
