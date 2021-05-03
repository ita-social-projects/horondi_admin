import { getItems, setItems } from '../../utils/client';
import { config } from '../../configs';
import { commentsTranslations } from '../../translations/comments.translations';
import { GET_USER_COMMENTS, GET_PRODUCT_COMMENTS } from './comments.types';
import { loginAdmin } from '../auth/auth.operations';

const formError = (error) => error.message.replace('GraphQL error: ', '');

const getAllComments = async (filter, pagination) => {
  const query = `
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
    `;
  const result = await getItems(query, { filter, pagination });

  return result?.data?.getAllComments;
};

const getRecentComments = async (limit) => {
  const query = `
      query($limit: Int!) {
        getRecentComments(limit: $limit) {
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
            statusCode
            message
          }
        }
      }
    `;
  const result = await getItems(query, { limit });

  if (
    Object.keys(commentsTranslations).includes(
      result?.data?.getRecentComments?.message
    )
  ) {
    throw new Error(
      `${result.data.getRecentComments.statusCode} ${
        commentsTranslations[result.data.getRecentComments.message]
      }`
    );
  }

  return result?.data?.getRecentComments;
};

const deleteComment = async (id) => {
  const query = `
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
      `;

  const result = await setItems(query, { id });
  return result?.data?.deleteComment;
};

const getCommentById = async (id) => {
  const query = `
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
    `;

  const result = await getItems(query, { id });

  if (
    Object.keys(commentsTranslations).includes(
      result?.data?.getCommentById?.message
    )
  ) {
    throw new Error(
      `${result.data.getCommentById.statusCode} ${
        commentsTranslations[result.data.getCommentById.message]
      }`
    );
  }

  return result?.data?.getCommentById;
};

const updateComment = async (id, comment) => {
  const query = `
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
    `;

  const result = await setItems(query, { id, comment });

  if (
    Object.keys(commentsTranslations).includes(
      result?.data?.updateComment?.message
    )
  ) {
    throw new Error(
      `${result.data.updateComment.statusCode} ${
        commentsTranslations[result.data.updateComment.message]
      }`
    );
  }

  return result?.data?.updateComment;
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
};

const getCommentsByProduct = async (id) => {
  const query = `
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
              }
            ... on Error{
              message
              statusCode
            }
          }
        }
      `;
  const result = await getItems(query, { productId: id });
  return result?.data?.getAllCommentsByProduct;
};

const getCommentsByUser = async (userId) => {
  const query = `
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
      `;
  const result = await getItems(query, { userId });
  return result?.data?.getAllCommentsByUser;
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
