import {
  GET_COMMENTS_BY_TYPE,
  GET_RECENT_COMMENTS,
  SET_COMMENTS,
  DELETE_COMMENT,
  DELETE_COMMENT_LOCALLY,
  SET_COMMENTS_LOADING,
  SET_COMMENTS_ERROR,
  SET_COMMENTS_CURRENT_PAGE,
  SET_COMMENTS_PER_PAGE,
  SET_COMMENTS_PAGES_COUNT
} from './comments.types';

const getCommentsByType = (value, commentsType) => ({
  type: GET_COMMENTS_BY_TYPE,
  payload: {
    value,
    commentsType
  }
});

const getRecentComments = (payload) => ({
  type: GET_RECENT_COMMENTS,
  payload
});

const setComments = (comments) => ({
  type: SET_COMMENTS,
  payload: comments
});

const setCommentsLoading = (loading) => ({
  type: SET_COMMENTS_LOADING,
  payload: loading
});

const deleteComment = (payload) => ({
  type: DELETE_COMMENT,
  payload
});

const deleteCommentLocally = (id) => ({
  type: DELETE_COMMENT_LOCALLY,
  payload: id
});

const setCommentError = (error) => ({
  type: SET_COMMENTS_ERROR,
  payload: error
});

const setCommentsCurrentPage = (payload) => ({
  type: SET_COMMENTS_CURRENT_PAGE,
  payload
});

const setCommentsPerPage = (payload) => ({
  type: SET_COMMENTS_PER_PAGE,
  payload
});

const setCommentsPagesCount = (payload) => ({
  type: SET_COMMENTS_PAGES_COUNT,
  payload
});

export {
  getCommentsByType,
  getRecentComments,
  setComments,
  setCommentsLoading,
  deleteComment,
  deleteCommentLocally,
  setCommentError,
  setCommentsCurrentPage,
  setCommentsPerPage,
  setCommentsPagesCount
};
