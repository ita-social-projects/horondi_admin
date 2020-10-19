import { takeEvery, call, put } from 'redux-saga/effects';

import { config } from '../../configs';

import {
  getCommentsByType,
  getRecentComments,
  deleteComment
} from './comments.operations';

import {
  setComments,
  setCommentsLoading,
  setCommentError,
  setCommentsPagesCount,
  deleteCommentLocally
} from './comments.actions';

import {
  GET_COMMENTS_BY_TYPE,
  GET_RECENT_COMMENTS,
  DELETE_COMMENT
} from './comments.types';

import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../snackbar/snackbar.actions';

const { SUCCESS_DELETE_STATUS } = config.statuses;

export function* handleCommentsByTypeLoad({ payload }) {
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

export function* handleRecentCommentsLoad({
  payload = {
    skip: 0,
    limit: 20,
    commentsPerPage: 10
  }
}) {
  try {
    yield put(setCommentsLoading(true));

    const comments = yield call(getRecentComments, payload.skip, payload.limit);
    yield put(
      setCommentsPagesCount(Math.ceil(comments.count / payload.commentsPerPage))
    );
    yield put(setComments(comments.items));

    yield put(setCommentsLoading(false));
  } catch (error) {
    yield call(handleCommentsError, error);
  }
}

export function* handleCommentDelete({ payload }) {
  try {
    yield put(setCommentsLoading(true));

    yield call(deleteComment, payload);
    yield put(deleteCommentLocally(payload));

    yield put(setCommentsLoading(false));
    yield call(handleSnackBarSuccess, SUCCESS_DELETE_STATUS);
  } catch (error) {
    yield call(handleCommentsError, error);
  }
}

export function* handleCommentsError(error) {
  yield put(setCommentsLoading(false));
  yield put(setCommentError({ error }));

  yield put(setSnackBarSeverity('error'));
  yield put(setSnackBarMessage(error.message));
  yield put(setSnackBarStatus(true));
}

export function* handleSnackBarSuccess(status) {
  yield put(setSnackBarSeverity('success'));
  yield put(setSnackBarMessage(status));
  yield put(setSnackBarStatus(true));
}

export default function* commentsSaga() {
  yield takeEvery(GET_COMMENTS_BY_TYPE, handleCommentsByTypeLoad);
  yield takeEvery(GET_RECENT_COMMENTS, handleRecentCommentsLoad);
  yield takeEvery(DELETE_COMMENT, handleCommentDelete);
}
