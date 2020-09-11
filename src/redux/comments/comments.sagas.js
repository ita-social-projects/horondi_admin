import { takeEvery, call, put } from 'redux-saga/effects';

import { config } from '../../configs';

import { getCommentsByType, deleteComment } from './comments.operations';

import {
  setComments,
  setCommentsLoading,
  setCommentError,
  deleteCommentLocally
} from './comments.actions';

import { GET_COMMENTS_BY_TYPE, DELETE_COMMENT } from './comments.types';

import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../snackbar/snackbar.actions';

const { SUCCESS_DELETE_STATUS } = config.statuses;

function* handleCommentsByTypeLoad({ payload }) {
  try {
    yield put(setCommentsLoading(true));
    const comments = yield call(
      getCommentsByType,
      payload.value,
      payload.commentsType
    );
    yield put(setComments(comments));

    yield put(setCommentsLoading(false));
  } catch (error) {
    yield call(handleCommentsError, error);
  }
}

function* handleCommentDelete({ payload }) {
  try {
    yield put(setCommentsLoading(true));

    yield console.log('FROM SAGA', payload);
    yield call(deleteComment, payload);
    yield put(deleteCommentLocally(payload));

    yield put(setCommentsLoading(false));
    yield call(handleSnackBarSuccess, SUCCESS_DELETE_STATUS);
  } catch (error) {
    yield call(handleCommentsError, error);
  }
}

function* handleCommentsError(error) {
  yield put(setCommentsLoading(false));
  yield put(setCommentError({ error }));

  yield put(setSnackBarSeverity('error'));
  yield put(setSnackBarMessage(error.message));
  yield put(setSnackBarStatus(true));
}

function* handleSnackBarSuccess(status) {
  yield put(setSnackBarSeverity('success'));
  yield put(setSnackBarMessage(status));
  yield put(setSnackBarStatus(true));
}

export default function* commentsSaga() {
  yield takeEvery(GET_COMMENTS_BY_TYPE, handleCommentsByTypeLoad);
  yield takeEvery(DELETE_COMMENT, handleCommentDelete);
}
