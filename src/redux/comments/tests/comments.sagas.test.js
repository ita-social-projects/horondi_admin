import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import {
  handleCommentsByTypeLoad,
  handleRecentCommentsLoad,
  handleCommentDelete
} from '../comments.sagas';

import {
  setComments,
  setCommentsLoading,
  deleteCommentLocally
} from '../comments.actions';

import { GET_USER_COMMENTS, GET_PRODUCT_COMMENTS } from '../comments.types';

import {
  commentId,
  initialState,
  productId,
  comment,
  commentRes,
  skip,
  limit,
  userEmail,
  pagination
} from './comments.variables';

import {
  getCommentsByType,
  getRecentComments,
  deleteComment
} from '../comments.operations';

import commentsReducer from '../comments.reducer';

describe('Comments sagas tests', () => {
  it('Should receive all comments and set them to store', () =>
    expectSaga(handleRecentCommentsLoad, initialState.pagination)
      .withReducer(commentsReducer)
      .provide([[call(getRecentComments, skip, limit), commentRes]])
      .put(setCommentsLoading(true))
      .put(setComments(commentRes.items))
      .put(setCommentsLoading(false))
      .hasFinalState({
        ...initialState,
        list: commentRes.items,
        pagination
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisCall).toHaveLength(1);
        expect(analysisPut).toHaveLength(4);
      }));

  it('Should receive comments by user and set to store', () =>
    expectSaga(handleCommentsByTypeLoad, {
      payload: { value: userEmail, commentsType: GET_USER_COMMENTS }
    })
      .withReducer(commentsReducer)
      .provide([
        [call(getCommentsByType, userEmail, GET_USER_COMMENTS), [comment]]
      ])
      .put(setCommentsLoading(true))
      .put(setComments([comment]))
      .put(setCommentsLoading(false))
      .hasFinalState({
        ...initialState,
        list: [comment],
        pagination
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisCall).toHaveLength(1);
        expect(analysisPut).toHaveLength(3);
      }));

  it('Should receive comments by product and set to store', () =>
    expectSaga(handleCommentsByTypeLoad, {
      payload: { value: productId, commentsType: GET_PRODUCT_COMMENTS }
    })
      .withReducer(commentsReducer)
      .provide([
        [call(getCommentsByType, productId, GET_PRODUCT_COMMENTS), [comment]]
      ])
      .put(setCommentsLoading(true))
      .put(setComments([comment]))
      .put(setCommentsLoading(false))
      .hasFinalState({
        ...initialState,
        list: [comment],
        pagination
      })
      .run()
      .then((res) => {
        const { allEffects: analysis } = res;
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);
      }));

  it('Should delete comment and remove it from store', () =>
    expectSaga(handleCommentDelete, { payload: commentId })
      .withReducer(commentsReducer)
      .provide([[call(deleteComment, commentId)]])
      .put(setCommentsLoading(true))
      .put(deleteCommentLocally(commentId))
      .put(setCommentsLoading(false))
      .hasFinalState({
        ...initialState,
        list: [],
        pagination
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisCall).toHaveLength(3);
        expect(analysisPut).toHaveLength(6);
      }));
});
