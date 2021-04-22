import { getItems, setItems } from '../../utils/client';
import { config } from '../../configs';
import { commentsTranslations } from '../../translations/comments.translations';
import { GET_USER_COMMENTS, GET_PRODUCT_COMMENTS } from './comments.types';

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
  const { data } = await getItems(query, { filter, pagination });

  return data.getAllComments;
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
  const { data } = await getItems(query, { limit });

  if (
    Object.keys(commentsTranslations).includes(data.getRecentComments?.message)
  ) {
    throw new Error(
      `${data.getRecentComments.statusCode} ${
        commentsTranslations[data.getRecentComments.message]
      }`
    );
  }

  return data.getRecentComments;
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

  const { data } = await setItems(query, { id });

  return data.deleteComment;
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

  const { data } = await getItems(query, { id });

  if (
    Object.keys(commentsTranslations).includes(data.getCommentById?.message)
  ) {
    throw new Error(
      `${data.getCommentById.statusCode} ${
        commentsTranslations[data.getCommentById.message]
      }`
    );
  }

  return data.getCommentById;
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

  const { data } = await setItems(query, { id, comment });

  if (Object.keys(commentsTranslations).includes(data.updateComment?.message)) {
    throw new Error(
      `${data.updateComment.statusCode} ${
        commentsTranslations[data.updateComment.message]
      }`
    );
  }

  return data.updateComment;
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
            ... on Error{
              message
              statusCode
            }
          }
        }
      `;

  const { data } = await getItems(query, { productId: id });

  return data.getAllCommentsByProduct;
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
  const { data } = await getItems(query, { userId });

  return data.getAllCommentsByUser;
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
