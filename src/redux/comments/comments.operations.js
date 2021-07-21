import { getItems, setItems } from '../../utils/client';
import { config } from '../../configs';
import { commentsTranslations } from '../../translations/comments.translations';
import { GET_USER_COMMENTS, GET_PRODUCT_COMMENTS } from './comments.types';

const formError = (error) => error.message.replace('GraphQL error: ', '');

const getAllComments = async (filter, pagination, sort) => {
  const query = `
      query($filter: CommentFilterInput, $pagination: Pagination,$sort: CommentsSortInput) {
        getAllComments(filter: $filter, pagination: $pagination,sort: $sort) {
          items {
            _id
            text
            date
            replyCommentsCount
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

  const result = await getItems(query, { filter, pagination, sort });

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
        mutation($comment: ID!,$id:ID) {
          deleteComment(id:$id,commentID: $comment) {
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

  const result = await setItems(query, { comment: id });

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
            replyCommentsCount
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

const getCommentsByProduct = async ({ filter, pagination, sort }) => {
  const query = `
        query($filter: ProductCommentFilterInput, $pagination: Pagination,$sort: CommentsSortInput) {
          getCommentsByProduct(filter: $filter, pagination: $pagination,sort: $sort) {
            ... on PaginatedComments {
              items{
                _id
                text
                date
                show
                rate
                verifiedPurchase
                replyCommentsCount 
                user {
                  _id
                  email
                  firstName
                  role
                }
              }
              count
            }
            ... on Error {
              statusCode
              message
            }
          }
        }
      `;

  const result = await getItems(query, { filter, pagination, sort });

  return result?.data?.getCommentsByProduct;
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

const getReplyComments = async ({ filter, pagination, sort }) => {
  const getReplyCommentsQuery = `
    query($filter: ReplyCommentFilterInput, $pagination: Pagination,$sort: ReplyCommentsSortInput) {
      getReplyCommentsByComment(filter: $filter, pagination: $pagination,sort: $sort) {
        ... on PaginatedComments {
          items{
            _id
            replyComments{
              _id
              replyText
              showReplyComment
              createdAt
              verifiedPurchase
              refToReplyComment
              answerer{
                _id
                firstName
                email
                role
              }
            }
          }
          count
          countAll
        }
        ... on Error {
          statusCode
          message
        }
      }
    }
  `;
  const result = await getItems(getReplyCommentsQuery, {
    filter,
    pagination,
    sort
  });
  return result?.data?.getReplyCommentsByComment;
};
const deleteReplyComment = async (payload) => {
  const deleteReplyForCommentMutation = `
    mutation($replyCommentId: ID!,$id:ID) {
      deleteReplyForComment(id:$id,replyCommentId: $replyCommentId) {
        ... on Comment {
          _id
        }
      }
    }
  `;
  const result = await setItems(deleteReplyForCommentMutation, {
    replyCommentId: payload
  });

  return result?.data?.deleteReplyForComment;
};

const addReplyForComment = async ({ id, commentId, replyCommentData }) => {
  const query = `
      mutation($id: ID!,$commentId: ID!, $replyCommentData: ReplyCommentInput!) {
        replyForComment(id:$id,commentId:$commentId , replyCommentData:$replyCommentData) {
          ... on Comment {
            _id
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `;

  const result = await setItems(query, { id, commentId, replyCommentData });

  if (
    Object.keys(commentsTranslations).includes(
      result?.data?.replyForComment?.message
    )
  ) {
    throw new Error(
      `${result.data.replyForComment.statusCode} ${
        commentsTranslations[result.data.replyForComment.message]
      }`
    );
  }

  return result?.data?.replyForComment;
};

const updateReplyComment = async (replyCommentId, replyCommentData) => {
  const query = `
      mutation($replyCommentId: ID!, $replyCommentData: ReplyCommentUpdateInput!) {
        updateReplyForComment(replyCommentId: $replyCommentId, replyCommentData: $replyCommentData) {
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

  const result = await setItems(query, { replyCommentId, replyCommentData });

  if (
    Object.keys(commentsTranslations).includes(
      result?.data?.updateReplyForComment?.message
    )
  ) {
    throw new Error(
      `${result.data.updateReplyForComment.statusCode} ${
        commentsTranslations[result.data.updateReplyForComment.message]
      }`
    );
  }

  return result?.data?.updateReplyForComment;
};

const getReplyComment = async (id) => {
  const query = `
      query($id: ID!) {
        getReplyCommentById(id: $id) {
          ... on Comment {
            _id
            replyComments{
              _id
              replyText
              showReplyComment
              createdAt
              verifiedPurchase
              refToReplyComment
              answerer{
                _id
                firstName
                email
                role
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
    Object.keys(commentsTranslations).includes(
      result?.data?.getReplyCommentById?.message
    )
  ) {
    throw new Error(
      `${result.data.getReplyCommentById.statusCode} ${
        commentsTranslations[result.data.getReplyCommentById.message]
      }`
    );
  }

  return result?.data?.getReplyCommentById;
};

export {
  getAllComments,
  deleteComment,
  updateComment,
  getCommentById,
  getCommentsByUser,
  getCommentsByProduct,
  getCommentsByType,
  getRecentComments,
  getReplyComments,
  deleteReplyComment,
  addReplyForComment,
  updateReplyComment,
  getReplyComment
};
