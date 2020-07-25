import { gql } from 'apollo-boost';
import { client } from '../../utils/client';

const getAllNews = async () => {
  try {
    const result = await client.query({
      query: gql`
        {
          getAllNews {
            _id
            author {
              name {
                lang
                value
              }
              image {
                small
              }
            }
            title {
              lang
              value
            }
          }
        }
      `
    });
    const { data } = result;
    return data.getAllNews;
  } catch (e) {
    return e;
  }
};

const getArticleById = async (id) => {
  try {
    const result = await client.query({
      variables: { id },
      query: gql`
        query($id: ID!) {
          getNewsById(id: $id) {
            ... on News {
              __typename
              title {
                lang
                value
              }
              text {
                lang
                value
              }
              images {
                primary {
                  medium
                }
                additional {
                  large
                }
              }
              video
              author {
                name {
                  lang
                  value
                }
                image {
                  small
                }
              }
              date
            }
            ... on Error {
              __typename
              message {
                lang
                value
              }
              statusCode
            }
          }
        }
      `,
      fetchPolicy: 'no-cache'
    });
    const { data } = result;
    return data.getNewsById;
  } catch (e) {
    return e;
  }
};

const deleteArticle = async (id) => {
  try {
    const result = await client.mutate({
      variables: { id },
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
              message {
                lang
              }
              statusCode
            }
          }
        }
      `,
      fetchPolicy: 'no-cache'
    });
    client.resetStore();
    const { data } = result;
    return data.deleteNews;
  } catch (e) {
    return e;
  }
};

const createArticle = async (news) => {
  try {
    const result = await client.mutate({
      mutation: gql`
        mutation($news: NewsInput!) {
          addNews(news: $news) {
            author {
              name {
                value
              }
            }
          }
        }
      `,
      variables: { news }
    });
    client.resetStore();
    const { data } = result;
    return data.addNews;
  } catch (e) {
    return e;
  }
};

const updateArticle = async (id, news) => {
  try {
    const result = await client.mutate({
      variables: {
        id,
        news
      },
      mutation: gql`
        mutation($id: ID!, $news: NewsInput!) {
          updateNews(id: $id, news: $news) {
            ... on News {
              author {
                name {
                  value
                }
              }
            }
            ... on Error {
              message {
                lang
                value
              }
              statusCode
            }
          }
        }
      `,
      fetchPolicy: 'no-cache'
    });
    client.resetStore();
    const { data } = result;
    return data.updateNews;
  } catch (e) {
    return e;
  }
};

export {
  getAllNews,
  deleteArticle,
  getArticleById,
  createArticle,
  updateArticle
};
