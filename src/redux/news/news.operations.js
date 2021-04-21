import {getItems, setItems} from '../../utils/client';
import {newsTranslations} from '../../translations/news.translations';

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

    const {data} = await getItems(query, {
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

    const {data} = await getItems(query, {id});

    if (Object.keys(newsTranslations).includes(data.getNewsById?.message)) {
        throw new Error(
            `${data.getNewsById.statusCode} ${
                newsTranslations[data.getNewsById.message]
            }`
        );
    }

    return data.getNewsById;
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

    const {data} = await setItems(query, {id});

    if (Object.keys(newsTranslations).includes(data.deleteNews?.message)) {
        throw new Error(
            `${data.deleteNews.statusCode} ${
                newsTranslations[data.deleteNews.message]
            }`
        );
    }

    return data.deleteNews;
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

    const {data} = await setItems(query, {news, upload});


    if (Object.keys(newsTranslations).includes(data.addNews?.message)) {
        throw new Error(
            `${data.addNews.statusCode} ${
                newsTranslations[data.addNews.message]
            }`
        );
    }

    return data.addNews;
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
    const {data} = await setItems(query, {id, news, upload});

    if (Object.keys(newsTranslations).includes(data.updateNews?.message)) {
        throw new Error(
            `${data.updateNews.statusCode} ${
                newsTranslations[data.updateNews.message]
            }`
        );
    }

    return data.updateNews;
};

export {
    getAllNews,
    deleteArticle,
    getArticleById,
    createArticle,
    updateArticle
};
