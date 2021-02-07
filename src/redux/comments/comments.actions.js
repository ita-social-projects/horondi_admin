import {
  SET_COMMENTS,
  GET_COMMENTS,
  DELETE_COMMENT,
  GET_COMMENTS_BY_PRODUCTS,
  GET_COMMENTS_BY_TYPE,
  SET_COMMENTS_CURRENT_PAGE,
  SET_COMMENTS_LOADING,
  SET_COMMENTS_ERROR,
  REMOVE_COMMENT_FROM_STORE
} from './comments.types';

const setComments = (comments) => ({
  type: SET_COMMENTS,
  payload: comments
});

const getComments = (payload) => ({
  type: GET_COMMENTS,
  payload
});

const deleteComment = (payload) => ({
  type: DELETE_COMMENT,
  payload
});

const getCommentsByProduct = (payload) => ({
  type: GET_COMMENTS_BY_PRODUCTS,
  payload
});

const getCommentsByType = (value, commentsType) => ({
  type: GET_COMMENTS_BY_TYPE,
  payload: {
    value,
    commentsType
  }
});

const setCommentsCurrentPage = (payload) => ({
  type: SET_COMMENTS_CURRENT_PAGE,
  payload
});

const setCommentsLoading = (payload) => ({
  type: SET_COMMENTS_LOADING,
  payload
});

const setCommentError = (payload) => ({
  type: SET_COMMENTS_ERROR,
  payload
});

const removeCommentFromStore = (payload) => ({
  type: REMOVE_COMMENT_FROM_STORE,
  payload
});

export {
  setComments,
  getComments,
  getCommentsByType,
  removeCommentFromStore,
  setCommentsLoading,
  deleteComment,
  setCommentError,
  setCommentsCurrentPage,
  getCommentsByProduct
};
