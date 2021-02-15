import {
  SET_COMMENTS,
  GET_COMMENTS,
  DELETE_COMMENT,
  GET_COMMENTS_BY_PRODUCTS,
  GET_COMMENTS_BY_TYPE,
  SET_COMMENTS_CURRENT_PAGE,
  SET_COMMENTS_LOADING,
  SET_COMMENTS_ERROR,
  REMOVE_COMMENT_FROM_STORE,
  UPDATE_COMMENT,
  SET_COMMENT,
  GET_COMMENT,
  GET_USER_COMMENTS,
  GET_PRODUCT_COMMENTS
} from './comments.types';

const setComments = (comments) => ({
  type: SET_COMMENTS,
  payload: comments
});

const setComment = (payload) => ({
  type: SET_COMMENT,
  payload
});

const getComment = (payload) => ({
  type: GET_COMMENT,
  payload
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

const getUserComments = (payload) => ({
  type: GET_USER_COMMENTS,
  payload
});

const getProductComments = (payload) => ({
  type: GET_PRODUCT_COMMENTS,
  payload
});

const getCommentsByType = (payload) => ({
  type: GET_COMMENTS_BY_TYPE,
  payload
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

const updateComment = (payload) => ({
  type: UPDATE_COMMENT,
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
  getCommentsByProduct,
  updateComment,
  setComment,
  getComment,
  getUserComments,
  getProductComments
};
