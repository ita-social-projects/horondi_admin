import { gql } from '@apollo/client';
import { client } from '../../utils/client';

import { config } from '../../configs';

import { GET_USER_COMMENTS, GET_PRODUCT_COMMENTS } from './comments.types';

const formError = (error) => error.message.replace('GraphQL error: ', '');

const getCommentsByType = async (value, commentsType) => {
  try {
    if (commentsType === GET_USER_COMMENTS) {
      return await getCommentsByUser(value);
    }

    if (commentsType === GET_PRODUCT_COMMENTS) {
      return await getCommentsByProduct(value);
    }
  } catch (error) {
    throw new Error(`Помилка: ${config.errorMessages[formError(error)]}`);
  }
};

const getCommentsByUser = async (userEmail) => {
  const result = await client
    .query({
      variables: { userEmail },
      query: gql`
        query($userEmail: String!) {
          getAllCommentsByUser(userEmail: $userEmail) {
            _id
            text
            date
          }
        }
      `,
      fetchPolicy: 'no-cache'
    })
    .catch((error) => {
      throw new Error(`Помилка: ${config.errorMessages[formError(error)]}`);
    });

  const { data } = result;
  return data.getAllCommentsByUser;
};

const getCommentsByProduct = async ({ id, skip, limit }) => {
  const result = await client
    .query({
      variables: { productId: id, skip, limit },
      query: gql`
        query($productId: ID!, $skip: Int, $limit: Int) {
          getAllCommentsByProduct(
            productId: $productId
            skip: $skip
            limit: $limit
          ) {
            items {
              _id
              text
              date
              user {
                name
              }
            }
            count
          }
        }
      `,
      fetchPolicy: 'no-cache'
    })
    .catch((error) => {
      throw new Error(`Помилка: ${config.errorMessages[formError(error)]}`);
    });

  return result.data.getAllCommentsByProduct;
};

const getRecentComments = async (skip, limit) => {
  const result = await client
    .query({
      variables: {
        skip,
        limit
      },
      query: gql`
        query($skip: Int, $limit: Int) {
          getAllRecentComments(skip: $skip, limit: $limit) {
            items {
              _id
              text
              date
              user {
                name
              }
            }
            count
          }
        }
      `,
      fetchPolicy: 'no-cache'
    })
    .catch((error) => {
      throw new Error(`Помилка: ${config.errorMessages[formError(error)]}`);
    });

  const { data } = result;
  return data.getAllRecentComments;
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
  getRecentComments,
  deleteComment
};
