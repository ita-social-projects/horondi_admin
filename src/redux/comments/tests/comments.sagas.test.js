import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { push } from 'connected-react-router';
import { throwError } from 'redux-saga-test-plan/providers';
import {
  handleCommentsLoad,
  handleCommentsUserLoad,
  handleRepliesCommentsUserLoad,
  handleCommentLoad,
  handleCommentDelete,
  handleCommentUpdate,
  handleCommentsByTypeLoad,
  handleCommentsError,
  handleRecentCommentsLoad,
  handleGetReplyComments,
  handleAddReplyComment,
  handleReplyCommentDelete
} from '../comments.sagas';

import {
  deleteComment,
  updateComment,
  getCommentById,
  getCommentsByType,
  getAllComments,
  getAllCommentsByUser,
  getAllCommentsRepliesByUser,
  getRecentComments,
  getReplyComments,
  addReplyForComment,
  deleteReplyComment
} from '../comments.operations';

import {
  setComments,
  setCommentsUser,
  setRepliesCommentsUser,
  setCommentsLoading,
  setCommentError,
  removeCommentFromStore,
  setComment,
  setRecentComments,
  setReplyComments,
  removeReplyCommentFromStore,
  getReplyComments as getReplyCommentsAction
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
  snackBarError,
  filter,
  getReplyCommentsData,
  addReplyData,
  snackBarSuccess,
  mockSuccess,
  replyCommentId,
  mockSuccessDelete,
  tablePagination,
  sortData,
  replyFilter,
  commentFilterUser,
  replyFilterUser,
  userComments,
  userReplies
} from './comments.variables';

import { setItemsCount, updatePagination } from '../../table/table.actions';

import Table from '../../table/table.reducer';

import { handleSuccessSnackbar } from '../../snackbar/snackbar.sagas';

import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../../snackbar/snackbar.actions';

import Snackbar from '../../snackbar/snackbar.reducer';

const { SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } = config.statuses;

describe('get user comments sagas tests', () => {
  it('should handle user comments load', () => {
    expectSaga(handleCommentsUserLoad, {
      payload: commentFilterUser
    })
      .withReducer(combineReducers({ Table, commentsReducer }), {
        commentsReducer: initialState,
        Table: mockTableState
      })
      .put(setCommentsLoading(true))
      .provide([
        [
          call(
            getAllCommentsByUser,
            commentFilterUser.filter,
            commentFilterUser.pagination,
            commentFilterUser.sort,
            commentFilterUser.userId
          ),
          userComments
        ]
      ])
      .put(setItemsCount(userComments.count))
      .put(setCommentsUser(userComments.items))
      .put(setCommentsLoading(false))
      .hasFinalState({
        commentsReducer: {
          ...initialState,
          listUser: userComments.items
        },
        Table: {
          ...mockTableState,
          itemsCount: userComments.count
        }
      })
      .run();
  });

  it('should throw an error', () => {
    expectSaga(handleRepliesCommentsUserLoad, {
      payload: commentFilterUser
    })
      .withReducer(combineReducers({ Table, commentsReducer }), {
        commentsReducer: initialState,
        Table: mockTableState
      })
      .provide([
        [
          call(
            getAllCommentsRepliesByUser,
            commentFilterUser.filter,
            commentFilterUser.pagination,
            commentFilterUser.sort,
            commentFilterUser.userId
          ),
          throwError(mockError)
        ]
      ])
      .put(setCommentsLoading(false))
      .put(setCommentError({ e: mockError }))
      .put(setSnackBarSeverity(snackBarError))
      .put(setSnackBarMessage(mockError.message))
      .put(setSnackBarStatus(true))
      .run();
  });
});

describe('get user replies sagas tests', () => {
  it('should handle user replies load', () => {
    expectSaga(handleRepliesCommentsUserLoad, {
      payload: replyFilterUser
    })
      .withReducer(combineReducers({ Table, commentsReducer }), {
        commentsReducer: initialState,
        Table: mockTableState
      })
      .put(setCommentsLoading(true))
      .provide([
        [
          call(
            getAllCommentsRepliesByUser,
            replyFilterUser.filter,
            replyFilterUser.pagination,
            replyFilterUser.sort,
            replyFilterUser.userId
          ),
          userReplies
        ]
      ])
      .put(setItemsCount(userReplies.count))
      .put(setRepliesCommentsUser(userReplies.items))
      .put(setCommentsLoading(false))
      .hasFinalState({
        commentsReducer: {
          ...initialState,
          listRepliesUser: userReplies.items
        },
        Table: {
          ...mockTableState,
          itemsCount: userReplies.count
        }
      })
      .run();
  });

  it('should throw an error', () => {
    expectSaga(handleRepliesCommentsUserLoad, {
      payload: replyFilterUser
    })
      .withReducer(combineReducers({ Table, commentsReducer }), {
        commentsReducer: initialState,
        Table: mockTableState
      })
      .provide([
        [
          call(
            getAllCommentsRepliesByUser,
            replyFilterUser.filter,
            replyFilterUser.pagination,
            replyFilterUser.sort,
            replyFilterUser.userId
          ),
          throwError(mockError)
        ]
      ])
      .put(setCommentsLoading(false))
      .put(setCommentError({ e: mockError }))
      .put(setSnackBarSeverity(snackBarError))
      .put(setSnackBarMessage(mockError.message))
      .put(setSnackBarStatus(true))
      .run();
  });
});

describe('get comments sagas tests', () => {
  it('should handle comments load', () => {
    expectSaga(handleCommentsLoad, {
      payload: { filter, pagination, sort: sortData }
    })
      .withReducer(combineReducers({ Table, commentsReducer }), {
        commentsReducer: initialState,
        Table: mockTableState
      })
      .put(setCommentsLoading(true))
      .provide([
        [call(getAllComments, filter, pagination, sortData), commentRes]
      ])
      .put(setItemsCount(commentRes.count))
      .put(setComments(commentRes.items))
      .put(setCommentsLoading(false))
      .hasFinalState({
        commentsReducer: {
          ...initialState,
          list: commentRes.items
        },
        Table: {
          ...mockTableState,
          itemsCount: commentRes.count
        }
      })
      .run();
  });

  it('should throw an error', () => {
    expectSaga(handleCommentsLoad, {
      payload: { filter, pagination, sort: sortData }
    })
      .withReducer(combineReducers({ Table, commentsReducer }), {
        commentsReducer: initialState,
        Table: mockTableState
      })
      .provide([
        [
          call(getAllComments, filter, pagination, sortData),
          throwError(mockError)
        ]
      ])
      .put(setCommentsLoading(false))
      .put(setCommentError({ e: mockError }))
      .put(setSnackBarSeverity(snackBarError))
      .put(setSnackBarMessage(mockError.message))
      .put(setSnackBarStatus(true))
      .run();
  });
});

describe('get comment sagas tests', () => {
  it('should handle the load of one specific comment by its id', () => {
    expectSaga(handleCommentLoad, {
      payload: { id: commentId, reply: { filter, pagination } }
    })
      .withReducer(commentsReducer)
      .put(setCommentsLoading(true))
      .provide([[call(getCommentById, commentId), singleComment]])
      .put(setComment(singleComment))
      .put(setCommentsLoading(false))
      .put(getReplyCommentsAction({ filter, pagination }))
      .hasFinalState({
        ...initialState,
        comment: singleComment
      })
      .run();
  });

  it('should throw an error', () =>
    expectSaga(handleCommentLoad, {
      payload: { id: commentId, reply: { filter, pagination } }
    })
      .withReducer(commentsReducer)
      .provide([[call(getCommentById, commentId), throwError(mockError)]])
      .put(setCommentsLoading(false))
      .put(setCommentError({ e: mockError }))
      .put(setSnackBarSeverity(snackBarError))
      .put(setSnackBarMessage(mockError.message))
      .put(setSnackBarStatus(true))
      .run());
});

describe('delete comment sagas tests', () => {
  it('should handle the delition of one comment by id', () => {
    expectSaga(handleCommentDelete, { payload: commentId })
      .withReducer(commentsReducer)
      .put(setCommentsLoading(true))
      .provide([
        [call(deleteComment, commentId), commentId],
        [call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS)]
      ])
      .put(removeCommentFromStore(commentId))
      .put(updatePagination())
      .put(setCommentsLoading(false))
      .hasFinalState({
        ...initialState
      })
      .run();
  });

  it('should throw an error', () =>
    expectSaga(handleCommentDelete, { payload: commentId })
      .withReducer(commentsReducer)
      .provide([[call(deleteComment, commentId), throwError(mockError)]])
      .put(setCommentsLoading(false))
      .put(setCommentError({ e: mockError }))
      .put(setSnackBarSeverity(snackBarError))
      .put(setSnackBarMessage(mockError.message))
      .put(setSnackBarStatus(true))
      .run());
});

describe('update comment sagas tests', () => {
  it('should update a specific comment', () => {
    expectSaga(handleCommentUpdate, {
      payload: { id: singleComment._id, comment: singleComment }
    })
      .withReducer(commentsReducer)
      .put(setCommentsLoading(true))
      .provide([
        [call(updateComment, singleComment._id, singleComment), singleComment],
        [call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS)]
      ])
      .put(push(config.routes.pathToComments))
      .hasFinalState({
        ...initialState,
        commentsLoading: true
      })
      .run();
  });

  it('should throw an error', () =>
    expectSaga(handleCommentUpdate, {
      payload: { id: singleComment._id, comment: singleComment }
    })
      .withReducer(commentsReducer)
      .provide([
        [
          call(updateComment, singleComment._id, singleComment),
          throwError(mockError)
        ]
      ])
      .put(setCommentsLoading(false))
      .put(setCommentError({ e: mockError }))
      .put(setSnackBarSeverity(snackBarError))
      .put(setSnackBarMessage(mockError.message))
      .put(setSnackBarStatus(true))
      .run());
});

describe('handle comment by type sagas tests', () => {
  it('should handle the loading of comments by type', () => {
    expectSaga(handleCommentsByTypeLoad, {
      payload: {
        value: {
          filter: {
            filters: true,
            productId
          },
          pagination,
          sort: sortData
        },
        commentsType: GET_PRODUCT_COMMENTS
      }
    })
      .withReducer(commentsReducer)
      .put(setCommentsLoading(true))
      .provide([
        [
          call(
            getCommentsByType,
            {
              filter: {
                filters: true,
                productId
              },
              pagination,
              sort: sortData
            },
            GET_PRODUCT_COMMENTS
          ),
          commentRes
        ]
      ])
      .put(setComments(commentRes.items))
      .put(setCommentsLoading(false))
      .hasFinalState({
        ...initialState,
        list: commentRes.items
      })
      .run();
  });

  it('should throw an error', () =>
    expectSaga(handleCommentsByTypeLoad, {
      payload: {
        value: {
          filter: {
            filters: true,
            productId
          },
          pagination,
          sort: sortData
        },
        commentsType: GET_PRODUCT_COMMENTS
      }
    })
      .withReducer(commentsReducer)
      .provide([
        [
          call(
            getCommentsByType,
            {
              filter: {
                filters: true,
                productId
              },
              pagination,
              sort: sortData
            },
            GET_PRODUCT_COMMENTS
          ),
          throwError(mockError)
        ]
      ])
      .put(setCommentsLoading(false))
      .put(setCommentError({ e: mockError }))
      .put(setSnackBarSeverity(snackBarError))
      .put(setSnackBarMessage(mockError.message))
      .put(setSnackBarStatus(true))
      .run());
});

describe('handle recent comment sagas tests', () => {
  it('should handle recent comment', () => {
    expectSaga(handleRecentCommentsLoad, {
      payload: { pagination }
    })
      .withReducer(commentsReducer)
      .put(setCommentsLoading(true))
      .provide([[call(getRecentComments, pagination.limit), singleComment]])
      .put(setRecentComments(singleComment))
      .put(setCommentsLoading(false))
      .hasFinalState({
        ...initialState,
        recentComments: singleComment
      })
      .run();
  });

  it('should throw an error', () =>
    expectSaga(handleRecentCommentsLoad, { payload: { pagination } })
      .withReducer(commentsReducer)
      .provide([
        [call(getRecentComments, pagination.limit), throwError(mockError)]
      ])
      .put(setCommentsLoading(false))
      .put(setCommentError({ e: mockError }))
      .put(setSnackBarSeverity(snackBarError))
      .put(setSnackBarMessage(mockError.message))
      .put(setSnackBarStatus(true))
      .run());
});

describe('handle get reply comments sagas tests', () => {
  it('should get reply  comments', () => {
    expectSaga(handleGetReplyComments, {
      payload: { filter: replyFilter, pagination, sort: sortData }
    })
      .withReducer(commentsReducer)
      .put(setCommentsLoading(true))
      .provide([
        [
          call(getReplyComments, {
            filter: replyFilter,
            pagination,
            sort: sortData
          }),
          getReplyCommentsData
        ]
      ])
      .put(setReplyComments(getReplyCommentsData.items[0].replyComments))
      .put(setCommentsLoading(false))
      .hasFinalState({
        ...initialState,
        replyComments: getReplyCommentsData.items[0].replyComments
      })
      .run();
  });

  it('should throw an error', () =>
    expectSaga(handleGetReplyComments, {
      payload: {
        filter: replyFilter,
        pagination,
        sort: sortData
      }
    })
      .withReducer(commentsReducer)
      .provide([
        [
          call(getReplyComments, {
            filter: replyFilter,
            pagination,
            sort: sortData
          }),
          throwError(mockError)
        ]
      ])
      .put(setCommentsLoading(false))
      .put(setCommentError({ e: mockError }))
      .put(setSnackBarSeverity(snackBarError))
      .put(setSnackBarMessage(mockError.message))
      .put(setSnackBarStatus(true))
      .run());
});

describe('handle add reply comment sagas tests', () => {
  it('should add reply comment', () =>
    expectSaga(handleAddReplyComment, {
      payload: addReplyData
    })
      .withReducer(combineReducers({ Table, commentsReducer }), {
        commentsReducer: initialState,
        Table: mockTableState
      })
      .put(setCommentsLoading(true))
      .provide([[call(addReplyForComment, addReplyData), commentId]])
      .put(setSnackBarSeverity(snackBarSuccess))
      .put(setSnackBarMessage(mockSuccess.message))
      .put(setSnackBarStatus(true))
      .put(
        getReplyCommentsAction({
          filter: { filters: true, commentId: addReplyData.commentId },
          pagination: tablePagination
        })
      )
      .put(setCommentsLoading(false))
      .run());

  it('should throw an error', () =>
    expectSaga(handleAddReplyComment, {
      payload: addReplyData
    })
      .withReducer(combineReducers({ Table, commentsReducer }), {
        commentsReducer: initialState,
        Table: mockTableState
      })
      .provide([
        [call(addReplyForComment, addReplyData), throwError(mockError)]
      ])
      .put(setCommentsLoading(false))
      .put(setCommentError({ e: mockError }))
      .put(setSnackBarSeverity(snackBarError))
      .put(setSnackBarMessage(mockError.message))
      .put(setSnackBarStatus(true))
      .run());
});

describe('handle delete reply comment sagas tests', () => {
  it('should delete reply comment', () => {
    expectSaga(handleReplyCommentDelete, {
      payload: replyCommentId
    })
      .put(setCommentsLoading(true))
      .provide([[call(deleteReplyComment, replyCommentId), replyCommentId]])
      .put(removeReplyCommentFromStore(replyCommentId))
      .put(updatePagination())
      .put(setCommentsLoading(false))
      .put(setSnackBarSeverity(snackBarSuccess))
      .put(setSnackBarMessage(mockSuccessDelete.message))
      .put(setSnackBarStatus(true))
      .run();
  });

  it('should throw an error', () =>
    expectSaga(handleReplyCommentDelete, {
      payload: replyCommentId
    })
      .withReducer(commentsReducer)
      .provide([
        [call(deleteReplyComment, replyCommentId), throwError(mockError)]
      ])
      .put(setCommentsLoading(false))
      .put(setCommentError({ e: mockError }))
      .put(setSnackBarSeverity(snackBarError))
      .put(setSnackBarMessage(mockError.message))
      .put(setSnackBarStatus(true))
      .run());
});

describe('handle comment saga error tests', () => {
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
      .run();
  });
});
