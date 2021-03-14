import { gql } from '@apollo/client';
import { client } from '../../utils/client';

import { config } from '../../configs';
import { getFromLocalStorage } from '../../services/local-storage.service';
import { commentsTranslations } from '../../translations/comments.translations';

import { GET_USER_COMMENTS, GET_PRODUCT_COMMENTS } from './comments.types';

const formError = (error) => error.message.replace('GraphQL error: ', '');

const getAllComments = async (filter, pagination) => {
  const result = await client.query({
    variables: {
      filter,
      pagination
    },
    query: gql`
      query($filter: FilterInputComponent, $pagination: Pagination) {
        getAllComments(filter: $filter, pagination: $pagination) {
          items {
            _id
            text
            date
            user {
              _id
              firstName
              email
            }
            product {
              _id
            }
            show
          }
          count
        }
      }
    `
  });
  client.resetStore();

  return result.data.getAllComments;
};

const getRecentComments = async (id, commentDate) => {
  const result = await client.query({
    variables: {
      id,
      commentDate
    },
    query: gql`
      query($id: ID!, $commentDate: date) {
        getRecentComments(id: $id, date: $commentDate) {
          ... on Comment {
            _id
            text
            date
            user {
              _id
              firstName
              email
            }
            product {
              _id
            }
            show
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
  client.resetStore();

  return result.data.getRecentComments;
};

const deleteComment = async (id) => {
  const token = getFromLocalStorage(config.tokenName);
  const result = await client
    .mutate({
      context: { headers: { token } },
      variables: { id },
      mutation: gql`
        mutation($id: ID!) {
          deleteComment(id: $id) {
            ... on Comment {
              _id
              text
              date
              user {
                _id
                email
              }
              product {
                _id
              }
              show
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

  return result.data.deleteComment;
};

const getCommentById = async (id) => {
  const result = await client.query({
    variables: { id },
    query: gql`
      query($id: ID!) {
        getCommentById(id: $id) {
          ... on Comment {
            _id
            text
            date
            user {
              _id
              firstName
              email
            }
            product {
              _id
            }
            show
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
  client.resetStore();
  if (result.data.getCommentById.message) {
    throw new Error(
      `${result.data.getCommentById.statusCode} ${
        commentsTranslations[result.data.getCommentById.message]
      }`
    );
  }

  return result.data.getCommentById;
};

const updateComment = async (id, comment) => {
  const token = getFromLocalStorage(config.tokenName);
  const result = await client.mutate({
    context: { headers: { token } },
    variables: {
      id,
      comment
    },
    mutation: gql`
      mutation($id: ID!, $comment: CommentUpdateInput!) {
        updateComment(id: $id, comment: $comment) {
          ... on Comment {
            _id
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
  });
  client.resetStore();

  if (result.data.updateComment.message) {
    throw new Error(
      `${result.data.updateComment.statusCode} ${
        commentsTranslations[result.data.updateComment.message]
      }`
    );
  }

  return result.data.updateComment;
};

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
  client.resetStore();
};

const getCommentsByProduct = async (id) => {
  const result = await client
    .query({
      variables: { productId: id },
      query: gql`
        query($productId: ID!) {
          getAllCommentsByProduct(
            productId: $productId
          ) {
            ... on Comment{
              _id
              text
              date
              user {
                firstName
                email
              }
            ... on Error{
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

  return result.data.getAllCommentsByProduct;
};

const getCommentsByUser = async (userId) => {
  const result = await client
    .query({
      variables: { userId },
      query: gql`
        query($userId: ID!) {
          getAllCommentsByUser(userId: $userId) {
            ... on Comment {
              _id
              text
              user {
                _id
                firstName
              }
              product {
                _id
              }
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
  client.resetStore();
  return result.data.getAllCommentsByUser;
};

export {
  getAllComments,
  deleteComment,
  updateComment,
  getCommentById,
  getCommentsByUser,
  getCommentsByProduct,
  getCommentsByType,
  getRecentComments
};
