import { takeEvery, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { config } from '../../configs';

import {
  deleteComment,
  updateComment,
  getCommentById,
  getCommentsByType,
  getRecentComments,
  getAllComments,
  getReplyComments,
  deleteReplyComment,
  addReplyForComment
} from './comments.operations';

import {
  setComments,
  setCommentsLoading,
  setCommentError,
  removeCommentFromStore,
  setComment,
  setRecentComments,
  setReplyComments,
  removeReplyCommentFromStore,
  getReplyComments as getReplyCommentsAction
} from './comments.actions';

import {
  GET_COMMENTS,
  DELETE_COMMENT,
  GET_COMMENT,
  UPDATE_COMMENT,
  GET_COMMENTS_BY_TYPE,
  GET_RECENT_COMMENTS,
  GET_REPLY_COMMENTS,
  DELETE_REPLY_COMMENT,
  ADD_REPLY_COMMENT
} from './comments.types';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';

import { setItemsCount, updatePagination } from '../table/table.actions';
import { AUTH_ERRORS } from '../../error-messages/auth';
import { handleAdminLogout } from '../auth/auth.sagas';

const { SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS, SUCCESS_ADD_STATUS } =
  config.statuses;

export function* handleCommentsLoad({ payload: { filter, pagination } }) {
  try {
    yield put(setCommentsLoading(true));
    const comments = yield call(getAllComments, filter, pagination);

    if (comments) {
      yield put(setItemsCount(comments?.count));
      yield put(setComments(comments?.items));
      yield put(setCommentsLoading(false));
    }
  } catch (error) {
    yield call(handleCommentsError, error);
  }
}

export function* handleRecentCommentsLoad({ payload }) {
  try {
    yield put(setCommentsLoading(true));

    const comments = yield call(getRecentComments, payload.pagination.limit);

    if (comments) {
      yield put(setRecentComments(comments));
      yield put(setCommentsLoading(false));
    }
  } catch (error) {
    yield call(handleCommentsError, error);
  }
}

export function* handleCommentLoad({ payload }) {
  try {
    yield put(setCommentsLoading(true));
    const comment = yield call(getCommentById, payload.id);

    if (comment) {
      yield put(setComment(comment));
      yield put(setItemsCount(comment?.replyCommentsCount));
      yield put(getReplyCommentsAction(payload.reply));
      yield put(setCommentsLoading(false));
    }
  } catch (error) {
    yield call(handleCommentsError, error);
  }
}

export function* handleCommentDelete({ payload }) {
  try {
    yield put(setCommentsLoading(true));

    const comment = yield call(deleteComment, payload);

    if (comment) {
      yield put(removeCommentFromStore(payload));
      yield put(updatePagination());
      yield put(setCommentsLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
    }
  } catch (error) {
    yield call(handleCommentsError, error);
  }
}

export function* handleCommentUpdate({ payload }) {
  const { id, comment } = payload;
  try {
    yield put(setCommentsLoading(true));
    const commentData = yield call(updateComment, id, comment);

    if (commentData) {
      yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
      yield put(push(config.routes.pathToComments));
    }
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

    if (comments) {
      yield put(setComments(comments));
      yield put(setCommentsLoading(false));
    }
  } catch (error) {
    yield call(handleCommentsError, error);
  }
}

export function* handleGetReplyComments({ payload: { filter, pagination } }) {
  try {
    yield put(setCommentsLoading(true));
    const replyComments = yield call(getReplyComments, { filter, pagination });

    if (replyComments?.items[0]?.replyComments) {
      yield put(setReplyComments(replyComments?.items[0]?.replyComments));
      yield put(setCommentsLoading(false));
    }
  } catch (e) {
    yield call(handleCommentsError, e);
  }
}

export function* handleCommentsError(e) {
  if (
    e.message === AUTH_ERRORS.REFRESH_TOKEN_IS_NOT_VALID ||
    e.message === AUTH_ERRORS.USER_IS_BLOCKED
  ) {
    yield call(handleAdminLogout);
  } else {
    yield put(setCommentsLoading(false));
    yield put(setCommentError({ e }));
    yield call(handleErrorSnackbar, e.message);
  }
}

export function* handleReplyCommentDelete({ payload }) {
  try {
    yield put(setCommentsLoading(true));

    const comment = yield call(deleteReplyComment, payload);

    if (comment) {
      yield put(removeReplyCommentFromStore(payload));
      yield put(updatePagination());
      yield put(setCommentsLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
    }
  } catch (error) {
    yield call(handleCommentsError, error);
  }
}

export function* handleAddReplyComment({ payload }) {
  try {
    yield put(setCommentsLoading(true));
    const { currentPage, rowsPerPage } = yield select(({ Table }) => ({
      currentPage: Table.pagination.currentPage,
      rowsPerPage: Table.pagination.rowsPerPage
    }));
    const reply = yield call(addReplyForComment, payload);
    if (reply) {
      yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
      yield put(
        getReplyCommentsAction({
          filter: {
            filters: true,
            commentId: payload.commentId
          },
          pagination: {
            limit: rowsPerPage,
            skip: currentPage * rowsPerPage
          }
        })
      );
    }
    yield put(setCommentsLoading(false));
  } catch (error) {
    yield call(handleCommentsError, error);
  }
}

export default function* commentsSaga() {
  yield takeEvery(GET_COMMENTS, handleCommentsLoad);
  yield takeEvery(GET_RECENT_COMMENTS, handleRecentCommentsLoad);
  yield takeEvery(DELETE_COMMENT, handleCommentDelete);
  yield takeEvery(UPDATE_COMMENT, handleCommentUpdate);
  yield takeEvery(GET_COMMENT, handleCommentLoad);
  yield takeEvery(GET_COMMENTS_BY_TYPE, handleCommentsByTypeLoad);
  yield takeEvery(GET_REPLY_COMMENTS, handleGetReplyComments);
  yield takeEvery(DELETE_REPLY_COMMENT, handleReplyCommentDelete);
  yield takeEvery(ADD_REPLY_COMMENT, handleAddReplyComment);
}
