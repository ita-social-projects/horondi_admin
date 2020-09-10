import { gql } from '@apollo/client';
import { client } from '../../utils/client';

import { config } from '../../configs';

import { GET_USER_COMMENTS, GET_PRODUCT_COMMENTS } from './comments.types';

const formError = (error) => error.message.replace('GraphQL error: ', '');

const getCommentsByType = async (value, commentsType) => {
  try {
    if (commentsType === GET_USER_COMMENTS) {
      console.log('FROM OPERATIONS', value, commentsType);
      return await getCommentsByUser(value);
    }

    if (commentsType === GET_PRODUCT_COMMENTS) {
      return await getCommentsByProduct(value);
    }
  } catch (error) {
    console.log('FROM OPERATIONS', value, commentsType);

    throw new Error(`Помилка: ${config.errorMessages[formError(error)]}`);
  }
};

const getCommentsByUser = async (userEmail) => {
  const result = await client
    .query({
      variables: { userEmail },
      query: gql`
        query($userEmail: String!) {
          getCommentsByUser(userEmail: $userEmail) {
            ... on Comment {
              text
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
    })
    .catch((error) => {
      throw new Error(`Помилка: ${config.errorMessages[formError(error)]}`);
    });

  const { data } = result;

  return data.getUserById;
};

const getCommentsByProduct = async (id) => {
  const result = await client
    .query({
      variables: { id },
      query: gql`
        query($id: ID!) {
          getCommentsByProduct(id: $id) {
            ... on Comment {
              text
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
    })
    .catch((error) => {
      throw new Error(`Помилка: ${config.errorMessages[formError(error)]}`);
    });

  const { data } = result;

  return data.getUserById;
};

const deleteComment = async (id) => {
  const result = await client
    .mutate({
      variables: { id },
      mutation: gql`
        mutation($id: ID!) {
          deleteComment(id: $id) {
            ... on Comment {
              date
              text
            }
            ... on Error {
              message
              statusCode
            }
          }
        }
      `,
      fetchPolicy: 'no-cache'
    })
    .catch((error) => {
      throw new Error(`Помилка: ${config.errorMessages[formError(error)]}`);
    });

  client.resetStore();
  const { data } = result;

  return data.deleteComment;
};

export {
  getCommentsByType,
  getCommentsByUser,
  getCommentsByProduct,
  deleteComment
};
