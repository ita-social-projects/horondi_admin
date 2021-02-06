import { takeEvery, call, put } from 'redux-saga/effects';

import { config } from '../../configs';

import {
  getAllComments,
  // getCommentsByType,
  deleteComment
  // getCommentsByProduct
} from './comments.operations';

import {
  setComments,
  setCommentsLoading,
  setCommentError,
  removeCommentFromStore
  // setCommentsPagesCount
} from './comments.actions';

import {
  GET_COMMENTS,
  // GET_COMMENTS_BY_TYPE,
  // GET_RECENT_COMMENTS,
  DELETE_COMMENT
  // GET_COMMENTS_BY_PRODUCTS
} from './comments.types';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';

import { setItemsCount, updatePagination } from '../table/table.actions';

const { SUCCESS_DELETE_STATUS } = config.statuses;

export function* handleCommentsLoad({ payload }) {
  try {
    yield put(setCommentsLoading(true));
    const comments = yield call(getAllComments, payload.skip, payload.limit);
    yield put(setItemsCount(comments.count));
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
    yield put(removeCommentFromStore(payload));
    yield put(updatePagination());
    yield put(setCommentsLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (error) {
    yield call(handleCommentsError, error);
  }
}

export function* handleCommentsError(e) {
  yield put(setCommentsLoading(false));
  yield put(setCommentError({ e }));
  yield call(handleErrorSnackbar, e.message);
}

/*
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

export function* handleCommentsByProduct({
  payload = {
    skip: 0,
    limit: 20,
    commentsPerPage: 10
  }
}) {
  try {
    yield put(setCommentsLoading(true));

    const comments = yield call(getCommentsByProduct, payload);
    yield put(
      setCommentsPagesCount(Math.ceil(comments.count / payload.commentsPerPage))
    );
    yield put(setComments(comments.items));

    yield put(setCommentsLoading(false));
  } catch (error) {
    yield call(handleCommentsError, error);
  }
}
*/

export default function* commentsSaga() {
  yield takeEvery(GET_COMMENTS, handleCommentsLoad);
  // yield takeEvery(GET_COMMENTS_BY_TYPE, handleCommentsByTypeLoad);
  yield takeEvery(DELETE_COMMENT, handleCommentDelete);
  // yield takeEvery(GET_COMMENTS_BY_PRODUCTS, handleCommentsByProduct);
}
