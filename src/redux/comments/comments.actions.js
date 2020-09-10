import {
  GET_COMMENTS_BY_TYPE,
  SET_COMMENTS,
  DELETE_COMMENT,
  DELETE_COMMENT_LOCALLY,
  SET_COMMENTS_LOADING,
  SET_COMMENTS_ERROR
} from './comments.types';

const getCommentsByType = (value, commentsType) => {
  console.log('FROM ACTION', value, commentsType);
  return {
    type: GET_COMMENTS_BY_TYPE,
    payload: {
      value,
      commentsType
    }
  };
};

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

export {
  getCommentsByType,
  setComments,
  setCommentsLoading,
  deleteComment,
  deleteCommentLocally,
  setCommentError
};
