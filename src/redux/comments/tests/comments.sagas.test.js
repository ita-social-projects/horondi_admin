import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { push } from 'connected-react-router';

import {
  handleCommentsLoad,
  handleCommentLoad,
  handleCommentDelete,
  handleCommentUpdate,
  handleCommentsByTypeLoad,
  handleCommentsError
} from '../comments.sagas';

import {
  getRecentComments,
  deleteComment,
  updateComment,
  getCommentById,
  getCommentsByType
} from '../comments.operations';

import {
  setComments,
  setCommentsLoading,
  setCommentError,
  removeCommentFromStore,
  setComment
} from '../comments.actions';

import { GET_PRODUCT_COMMENTS } from '../comments.types';

import { config } from '../../../configs';

import commentsReducer, { initialState } from '../comments.reducer';

import {
  pagination,
  mockTableState,
  commentRes,
  commentId,
  singleComment,
  productId,
  mockError,
  mockSnackbarState,
  effectCallType,
  effectPutType,
  snackBarError
} from './comments.variables';

import { updatePagination } from '../../table/table.actions';

import Table from '../../table/table.reducer';

import { handleSuccessSnackbar } from '../../snackbar/snackbar.sagas';

import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../../snackbar/snackbar.actions';

import Snackbar from '../../snackbar/snackbar.reducer';

const { SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } = config.statuses;

const testsPromiseResults = (result) => {
  const { allEffects: analysis } = result;
  const analysisPut = analysis.filter((e) => e.type === effectPutType);
  const analysisCall = analysis.filter((e) => e.type === effectCallType);
  expect(analysis).toHaveLength(4);
  expect(analysisPut).toHaveLength(3);
  expect(analysisCall).toHaveLength(1);
};

describe('comments sagas tests', () => {
  it('should handle comments load', () => {
    expectSaga(handleCommentsLoad, { payload: { pagination } })
      .withReducer(combineReducers({ Table, commentsReducer }), {
        commentsReducer: initialState,
        Table: mockTableState
      })
      .put(setCommentsLoading(true))
      .provide([[call(getRecentComments, pagination), commentRes]])
      .put(setComments(commentRes))
      .put(setCommentsLoading(false))
      .hasFinalState({
        commentsReducer: {
          ...initialState,
          list: commentRes.list
        },
        Table: {
          ...mockTableState,
          itemsCount: commentRes.count
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisCall = analysis.filter((e) => e.type === effectCallType);
        const analysisPut = analysis.filter((e) => e.type === effectPutType);
        expect(analysis).toHaveLength(5);
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(1);
      });
  });
  it('should handle the load of one specific comment by its id', () => {
    expectSaga(handleCommentLoad, { payload: commentId })
      .withReducer(commentsReducer)
      .put(setCommentsLoading(true))
      .provide([[call(getCommentById, commentId), singleComment]])
      .put(setComment(singleComment))
      .put(setCommentsLoading(false))
      .hasFinalState({
        ...initialState,
        comment: singleComment
      })
      .run()
      .then(testsPromiseResults);
  });
  it('should handle the delition of one comment by id', () => {
    expectSaga(handleCommentDelete, { payload: commentId })
      .withReducer(commentsReducer)
      .put(setCommentsLoading(true))
      .provide([
        [call(deleteComment, commentId)],
        [call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS)]
      ])
      .put(removeCommentFromStore(commentId))
      .put(updatePagination())
      .put(setCommentsLoading(false))
      .hasFinalState({
        ...initialState
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === effectPutType);
        const analysisCall = analysis.filter((e) => e.type === effectCallType);
        expect(analysis).toHaveLength(6);
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(2);
      });
  });
  it('should update a specific comment', () => {
    expectSaga(handleCommentUpdate, {
      payload: { id: singleComment._id, comment: singleComment }
    })
      .withReducer(commentsReducer)
      .put(setCommentsLoading(true))
      .provide([
        [call(updateComment, singleComment._id, singleComment)],
        [call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS)]
      ])
      .put(push(config.routes.pathToComments))
      .hasFinalState({
        ...initialState,
        commentsLoading: true
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === effectPutType);
        const analysisCall = analysis.filter((e) => e.type === effectCallType);
        expect(analysis).toHaveLength(4);
        expect(analysisPut).toHaveLength(2);
        expect(analysisCall).toHaveLength(2);
      });
  });
  it('should handle the loading of comments by type', () => {
    expectSaga(handleCommentsByTypeLoad, {
      payload: { value: productId, commentsType: GET_PRODUCT_COMMENTS }
    })
      .withReducer(commentsReducer)
      .put(setCommentsLoading(true))
      .provide([
        [
          call(getCommentsByType, productId, GET_PRODUCT_COMMENTS),
          singleComment
        ]
      ])
      .put(setComments(singleComment))
      .put(setCommentsLoading(false))
      .hasFinalState({
        ...initialState,
        list: singleComment
      })
      .run()
      .then(testsPromiseResults);
  });
  it('should handle comments error', () => {
    expectSaga(handleCommentsError, mockError)
      .withReducer(combineReducers({ commentsReducer, Snackbar }), {
        commentsReducer: {
          ...initialState,
          commentsLoading: true
        },
        Snackbar: mockSnackbarState
      })
      .put(setCommentsLoading(false))
      .put(setCommentError({ e: mockError }))
      .put(setSnackBarSeverity(snackBarError))
      .put(setSnackBarMessage(mockError.message))
      .put(setSnackBarStatus(true))
      .hasFinalState({
        commentsReducer: {
          ...initialState,
          commentsLoading: false,
          commentsError: { e: mockError }
        },
        Snackbar: {
          snackBarStatus: true,
          snackBarSeverity: snackBarError,
          snackBarMessage: mockError.message
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === effectPutType);
        expect(analysisPut).toHaveLength(5);
      });
  });
});
