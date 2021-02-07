import { takeEvery, call, put } from 'redux-saga/effects';

import { config } from '../../configs';

import { getAllComments, deleteComment } from './comments.operations';

import {
  setComments,
  setCommentsLoading,
  setCommentError,
  removeCommentFromStore
} from './comments.actions';

import { GET_COMMENTS, DELETE_COMMENT } from './comments.types';

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

export default function* commentsSaga() {
  yield takeEvery(GET_COMMENTS, handleCommentsLoad);
  yield takeEvery(DELETE_COMMENT, handleCommentDelete);
}
