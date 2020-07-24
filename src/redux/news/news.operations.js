import { gql } from 'apollo-boost';
import { client } from '../../utils/client';

const getAllNews = () =>
  client.query({
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

const getArticleById = (id) =>
  client.query({
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

const deleteArticle = async (id) => {
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
  return result;
};

const createArticle = async (news) => {
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
  return result;
};

const updateArticle = async (id, news) => {
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
  return result;
};

export {
  getAllNews,
  deleteArticle,
  getArticleById,
  createArticle,
  updateArticle
};
