import {
  SET_COMMENTS,
  GET_COMMENTS,
  GET_COMMENT,
  SET_COMMENT,
  DELETE_COMMENT,
  SET_COMMENTS_LOADING,
  SET_COMMENTS_ERROR,
  REMOVE_COMMENT_FROM_STORE,
  GET_COMMENTS_BY_TYPE,
  GET_USER_COMMENTS,
  GET_PRODUCT_COMMENTS,
  GET_COMMENTS_BY_PRODUCTS,
  SET_COMMENTS_CURRENT_PAGE,
  UPDATE_COMMENT,
  SET_FILTER,
  CLEAR_FILTERS,
  GET_RECENT_COMMENTS,
  SET_RECENT_COMMENTS,
  SET_REPLY_COMMENT,
  GET_REPLY_COMMENTS,
  DELETE_REPLY_COMMENT,
  REMOVE_REPLY_COMMENT_FROM_STORE,
  CLEAR_COMMENT,
  ADD_REPLY_COMMENT
} from '../comments.types';

import {
  setComments,
  setComment,
  getComment,
  getComments,
  deleteComment,
  getCommentsByProduct,
  getUserComments,
  getProductComments,
  getCommentsByType,
  setCommentsCurrentPage,
  setCommentsLoading,
  setCommentError,
  removeCommentFromStore,
  updateComment,
  setFilter,
  clearFilters,
  setRecentComments,
  getRecentComments,
  setReplyComments,
  getReplyComments,
  deleteReplyComment,
  removeReplyCommentFromStore,
  clearComment,
  addReplyComment
} from '../comments.actions';

import {
  filter,
  pagination,
  comments,
  commentId,
  singleComment,
  productId,
  userId,
  currentPage,
  commentsLoadingStatus,
  commentsErrorExample,
  addReplyData,
  replyCommentsData,
  replyFilter,
  replyCommentId
} from './comments.variables';

describe('comments action tests', () => {
  it('should get all comments', () => {
    expect(getComments({ filter, pagination })).toEqual({
      type: GET_COMMENTS,
      payload: {
        filter,
        pagination
      }
    });
  });
  it('should set all comments', () => {
    expect(setComments(comments.list)).toEqual({
      type: SET_COMMENTS,
      payload: comments.list
    });
  });
  it('should get a specific comment', () => {
    expect(getComment(commentId)).toEqual({
      type: GET_COMMENT,
      payload: commentId
    });
  });
  it('should set a specific comment', () => {
    expect(setComment(singleComment)).toEqual({
      type: SET_COMMENT,
      payload: singleComment
    });
  });
  it('should delete a specific comment', () => {
    expect(deleteComment(commentId)).toEqual({
      type: DELETE_COMMENT,
      payload: commentId
    });
  });
  it('should get all comments related to a specific product', () => {
    expect(getCommentsByProduct(productId)).toEqual({
      type: GET_COMMENTS_BY_PRODUCTS,
      payload: productId
    });
  });
  it('should get all comments of a specific user', () => {
    expect(getUserComments(userId)).toEqual({
      type: GET_USER_COMMENTS,
      payload: userId
    });
  });
  it('should get all product comments', () => {
    expect(getProductComments(productId)).toEqual({
      type: GET_PRODUCT_COMMENTS,
      payload: productId
    });
  });
  it('should get all comments of a specific type', () => {
    expect(getCommentsByType({ productId, GET_PRODUCT_COMMENTS })).toEqual({
      type: GET_COMMENTS_BY_TYPE,
      payload: {
        productId,
        GET_PRODUCT_COMMENTS
      }
    });
  });
  it('should set a current page for the given comments list', () => {
    expect(setCommentsCurrentPage(currentPage)).toEqual({
      type: SET_COMMENTS_CURRENT_PAGE,
      payload: currentPage
    });
  });
  it('should check whether comments are loading', () => {
    expect(setCommentsLoading(commentsLoadingStatus)).toEqual({
      type: SET_COMMENTS_LOADING,
      payload: commentsLoadingStatus
    });
  });
  it('should set an error if there is any problem with loading comments', () => {
    expect(setCommentError(commentsErrorExample)).toEqual({
      type: SET_COMMENTS_ERROR,
      payload: commentsErrorExample
    });
  });
  it('should remove the given comment from the current store', () => {
    expect(removeCommentFromStore(commentId)).toEqual({
      type: REMOVE_COMMENT_FROM_STORE,
      payload: commentId
    });
  });
  it('should update the given comment', () => {
    expect(updateComment(singleComment)).toEqual({
      type: UPDATE_COMMENT,
      payload: singleComment
    });
  });
  it('should set a filter to be applied to the given list of comments', () => {
    expect(setFilter(filter)).toEqual({
      type: SET_FILTER,
      payload: filter
    });
  });
  it('should clear all comments filters', () => {
    expect(clearFilters()).toEqual({
      type: CLEAR_FILTERS
    });
  });

  it('should get recent comments', () => {
    expect(getRecentComments(pagination)).toEqual({
      type: GET_RECENT_COMMENTS,
      payload: pagination
    });
  });

  it('should set recent comments', () => {
    expect(setRecentComments(comments.list)).toEqual({
      type: SET_RECENT_COMMENTS,
      payload: comments.list
    });
  });

  it('should set reply comments', () => {
    expect(setReplyComments(replyCommentsData)).toEqual({
      type: SET_REPLY_COMMENT,
      payload: replyCommentsData
    });
  });

  it('should get reply comments', () => {
    expect(getReplyComments({ replyFilter, pagination })).toEqual({
      type: GET_REPLY_COMMENTS,
      payload: { replyFilter, pagination }
    });
  });

  it('should delete reply comment', () => {
    expect(deleteReplyComment(replyCommentId)).toEqual({
      type: DELETE_REPLY_COMMENT,
      payload: replyCommentId
    });
  });

  it('should delete reply comment from list', () => {
    expect(removeReplyCommentFromStore(replyCommentId)).toEqual({
      type: REMOVE_REPLY_COMMENT_FROM_STORE,
      payload: replyCommentId
    });
  });

  it('should clear comment', () => {
    expect(clearComment()).toEqual({
      type: CLEAR_COMMENT
    });
  });

  it('should add reply comment data', () => {
    expect(addReplyComment(addReplyData)).toEqual({
      type: ADD_REPLY_COMMENT,
      payload: addReplyData
    });
  });
});
