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
  SET_REPLY_COMMENTS,
  GET_REPLY_COMMENTS,
  DELETE_REPLY_COMMENT,
  REMOVE_REPLY_COMMENT_FROM_STORE,
  CLEAR_COMMENT,
  ADD_REPLY_COMMENT,
  SET_COMMENT_SORT,
  SET_COMMENT_SORT_LABEL,
  SET_REPLY_FILTER,
  SET_REPLY_SORT,
  SET_REPLY_SORT_LABEL,
  CLEAR_REPLY_FILTERS,
  UPDATE_REPLY,
  GET_REPLY,
  SET_REPLY,
  SET_REPLY_LOADING
} from '../../comments/comments.types';

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
  addReplyComment,
  setSort,
  setSortLabel,
  setReplyFilter,
  setReplySort,
  setReplySortLabel,
  clearReplyFilters,
  updateReply,
  getReply,
  setReply,
  setReplyLoading
} from '../../comments/comments.actions';

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
  replyCommentId,
  sortDataLabel,
  sortData,
  replyItem
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
      type: SET_REPLY_COMMENTS,
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

  it('should add filter to comment', () => {
    expect(setSort(sortData)).toEqual({
      type: SET_COMMENT_SORT,
      payload: sortData
    });
  });

  it('should add filter label to comment', () => {
    expect(setSortLabel(sortDataLabel)).toEqual({
      type: SET_COMMENT_SORT_LABEL,
      payload: sortDataLabel
    });
  });

  it('should add filter to reply', () => {
    expect(setReplyFilter(replyFilter)).toEqual({
      type: SET_REPLY_FILTER,
      payload: replyFilter
    });
  });
  it('should set sort to reply', () => {
    expect(setReplySort(sortData)).toEqual({
      type: SET_REPLY_SORT,
      payload: sortData
    });
  });
  it('should add filter label to reply', () => {
    expect(setReplySortLabel(sortDataLabel)).toEqual({
      type: SET_REPLY_SORT_LABEL,
      payload: sortDataLabel
    });
  });
  it('should clear reply filters', () => {
    expect(clearReplyFilters()).toEqual({
      type: CLEAR_REPLY_FILTERS
    });
  });
  it('should get reply', () => {
    expect(getReply()).toEqual({
      type: GET_REPLY
    });
  });
  it('should set reply', () => {
    expect(setReply(replyItem)).toEqual({
      type: SET_REPLY,
      payload: replyItem
    });
  });
  it('should set reply loading', () => {
    expect(setReplyLoading(commentsLoadingStatus)).toEqual({
      type: SET_REPLY_LOADING,
      payload: commentsLoadingStatus
    });
  });
  it('should update reply', () => {
    expect(updateReply(replyItem)).toEqual({
      type: UPDATE_REPLY,
      payload: replyItem
    });
  });
});
