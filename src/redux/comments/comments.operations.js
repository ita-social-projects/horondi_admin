import { getItems, setItems } from '../../utils/client';
import { config } from '../../configs';
import { commentsErrors } from '../../configs/error-modal-messages';
import { GET_USER_COMMENTS, GET_PRODUCT_COMMENTS } from './comments.types';

const formError = (error) => error.message.replace('GraphQL error: ', '');

const getAllCommentsByUser = async (filter, pagination, sort, userId) => {
  const query = `
    query($filter: CommentFilterInput, $pagination: Pagination, $sort: CommentsSortInput, $userId: ID!) {
      getCommentsByUser(filter: $filter, pagination: $pagination, sort: $sort, userId: $userId) {
        items {
          _id
          text
          date
          replyCommentsCount
          product {
            _id
            name {
              value
            }
          }
          show
        }
        count
      }
    }
  `;

  const result = await getItems(query, { filter, pagination, sort, userId });

  return result?.data?.getCommentsByUser;
};

const getAllCommentsRepliesByUser = async (
  filter,
  pagination,
  sort,
  userId
) => {
  const query = `
    query($filter: ReplyCommentFilterInput, $pagination: Pagination, $sort: ReplyCommentsSortInput, $userId: ID!) {
      getCommentsRepliesByUser(filter: $filter, pagination: $pagination, sort: $sort, userId: $userId) {
        items {
            _id
            replyText
            createdAt
            refToReplyComment
            verifiedPurchase
            showReplyComment
        }
        count
      }
    }
  `;

  const result = await getItems(query, { filter, pagination, sort, userId });

  return result?.data?.getCommentsRepliesByUser;
};

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
            rate
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
    Object.keys(commentsErrors).includes(
      result?.data?.getRecentComments?.message
    )
  ) {
    throw new Error(
      `${result.data.getRecentComments.statusCode} ${
        commentsErrors[result.data.getRecentComments.message]
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
    Object.keys(commentsErrors).includes(result?.data?.getCommentById?.message)
  ) {
    throw new Error(
      `${result.data.getCommentById.statusCode} ${
        commentsErrors[result.data.getCommentById.message]
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
    Object.keys(commentsErrors).includes(result?.data?.updateComment?.message)
  ) {
    throw new Error(
      `${result.data.updateComment.statusCode} ${
        commentsErrors[result.data.updateComment.message]
      }`
    );
  }

  return result?.data?.updateComment;
};

const getCommentsByType = (value, commentsType) => {
  const createErrorMsg = (error) =>
    new Error(`Помилка: ${config.errorMessages[formError(error)]}`);

  if (commentsType === GET_USER_COMMENTS) {
    return getCommentsByUser(value).catch((error) => {
      throw createErrorMsg(error);
    });
  }
  if (commentsType === GET_PRODUCT_COMMENTS) {
    return getCommentsByProduct(value).catch((error) => {
      throw createErrorMsg(error);
    });
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
    Object.keys(commentsErrors).includes(result?.data?.replyForComment?.message)
  ) {
    throw new Error(
      `${result.data.replyForComment.statusCode} ${
        commentsErrors[result.data.replyForComment.message]
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
    Object.keys(commentsErrors).includes(
      result?.data?.updateReplyForComment?.message
    )
  ) {
    throw new Error(
      `${result.data.updateReplyForComment.statusCode} ${
        commentsErrors[result.data.updateReplyForComment.message]
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
    Object.keys(commentsErrors).includes(
      result?.data?.getReplyCommentById?.message
    )
  ) {
    throw new Error(
      `${result.data.getReplyCommentById.statusCode} ${
        commentsErrors[result.data.getReplyCommentById.message]
      }`
    );
  }

  return result?.data?.getReplyCommentById;
};

export {
  getAllCommentsByUser,
  getAllCommentsRepliesByUser,
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
