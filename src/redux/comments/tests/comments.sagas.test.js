import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
  handleCommentsByTypeLoad,
  handleRecentCommentsLoad,
  handleCommentDelete
} from '../comments.sagas';

import {
  setComments,
  setCommentsLoading,
  setCommentError,
  setCommentsPagesCount,
  deleteCommentLocally
} from '../comments.actions';

import { GET_USER_COMMENTS, GET_PRODUCT_COMMENTS } from '../comments.types';

import {
  commentId,
  commentsPagesCount,
  recentCommentsMock,
  commentsByUserMock,
  commentDeleteMock,
  initialState,
  commentsByProductMock,
  productId,
  userId
} from './comments.variables';

import {
  getCommentsByType,
  getRecentComments,
  deleteComment
} from '../comments.operations';

describe('Comments sagas tests', () => {
  it('Should not throw error during execution', () => {
    expect(handleRecentCommentsLoad).not.toThrow();
    expect(handleCommentsByTypeLoad).not.toThrow();
    expect(handleCommentDelete).not.toThrow();
    expect(setComments).not.toThrow();
    expect(deleteComment).not.toThrow();
    expect(setCommentError).not.toThrow();
  });

  it('Should receive all comments and set them to store', () => {
    expectSaga(handleRecentCommentsLoad, initialState.pagination)
      .provide([[matchers.call.fn(getRecentComments), recentCommentsMock]])
      .put(setCommentsLoading(true))
      .put(setComments(recentCommentsMock))
      .put(setCommentsLoading(false))
      .run();
  });

  it('Should receive comments by user and set to store', () => {
    expectSaga(handleCommentsByTypeLoad, userId, GET_USER_COMMENTS)
      .provide([[matchers.call.fn(getCommentsByType), commentsByUserMock]])
      .put(setCommentsLoading(true))
      .put(setComments(commentsByUserMock))
      .put(setCommentsPagesCount(commentsPagesCount - 1))
      .put(setCommentsLoading(false))
      .run();
  });

  it('Should receive comments by product and set to store', () => {
    expectSaga(handleCommentsByTypeLoad, productId, GET_PRODUCT_COMMENTS)
      .provide([[matchers.call.fn(getCommentsByType), commentsByProductMock]])
      .put(setCommentsLoading(true))
      .put(setComments(commentsByProductMock))
      .put(setCommentsPagesCount(commentsPagesCount - 1))
      .put(setCommentsLoading(false))
      .run();
  });

  it('Should delete comment and remove it from store', () => {
    expectSaga(handleCommentDelete, commentId)
      .provide([[matchers.call.fn(deleteComment), commentDeleteMock]])
      .put(setCommentsLoading(true))
      .put(setComments(commentDeleteMock))
      .put(deleteCommentLocally(commentId))
      .put(setCommentsPagesCount(commentsPagesCount - 1))
      .put(setCommentsLoading(false))
      .run();
  });
});
