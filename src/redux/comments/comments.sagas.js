import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { config } from '../../configs';

import {
  deleteComment,
  updateComment,
  getCommentById,
  getCommentsByType,
  getRecentComments
} from './comments.operations';

import {
  setComments,
  setCommentsLoading,
  setCommentError,
  removeCommentFromStore,
  setComment
} from './comments.actions';

import {
  GET_COMMENTS,
  DELETE_COMMENT,
  GET_COMMENT,
  UPDATE_COMMENT,
  GET_COMMENTS_BY_TYPE
} from './comments.types';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';

import { updatePagination } from '../table/table.actions';

const { SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } = config.statuses;

export function* handleCommentsLoad({ payload }) {
  try {
    yield put(setCommentsLoading(true));
    const comments = yield call(getRecentComments, payload.pagination.limit);
    yield put(setComments(comments));
    yield put(setCommentsLoading(false));
  } catch (error) {
    yield call(handleCommentsError, error);
  }
}

export function* handleCommentLoad({ payload }) {
  try {
    yield put(setCommentsLoading(true));
    const comment = yield call(getCommentById, payload);
    yield put(setComment(comment));
    yield put(setCommentsLoading(false));
  } catch (error) {
    yield call(handleCommentsError, error);
  }
}

export function* handleCommentDelete({ payload }) {
  try {
    yield put(setCommentsLoading(true));

    yield call(deleteComment, payload);
    yield put(removeCommentFromStore(payload));
    yield put(updatePagination());
    yield put(setCommentsLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (error) {
    yield call(handleCommentsError, error);
  }
}

export function* handleCommentUpdate({ payload }) {
  const { id, comment } = payload;
  try {
    yield put(setCommentsLoading(true));
    yield call(updateComment, id, comment);
    yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
    yield put(push(config.routes.pathToComments));
  } catch (error) {
    yield call(handleCommentsError, error);
  }
}

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

export function* handleCommentsError(e) {
  yield put(setCommentsLoading(false));
  yield put(setCommentError({ e }));
  yield call(handleErrorSnackbar, e.message);
}

export default function* commentsSaga() {
  yield takeEvery(GET_COMMENTS, handleCommentsLoad);
  yield takeEvery(DELETE_COMMENT, handleCommentDelete);
  yield takeEvery(UPDATE_COMMENT, handleCommentUpdate);
  yield takeEvery(GET_COMMENT, handleCommentLoad);
  yield takeEvery(GET_COMMENTS_BY_TYPE, handleCommentsByTypeLoad);
}
