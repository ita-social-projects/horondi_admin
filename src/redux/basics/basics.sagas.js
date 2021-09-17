import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { config } from '../../configs';
import {
  createBasic,
  updateBasic,
  getAllBasics,
  getBasicById,
  deleteBasic
} from './basics.operations';
import {
  ADD_BASIC,
  GET_BASICS,
  GET_BASIC,
  UPDATE_BASIC,
  DELETE_BASIC
} from './basics.types';
import {
  removeBasicFromState,
  setBasicsLoading,
  setBasic,
  setBasics,
  setBasicError
} from './basics.actions';
import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';
import { setItemsCount, updatePagination } from '../table/table.actions';
import { AUTH_ERRORS } from '../../error-messages/auth';
import { handleAdminLogout } from '../auth/auth.sagas';

const { SUCCESS_ADD_STATUS, SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } =
  config.statuses;

export function* handleBasicsLoad({ payload: { pagination, filter } }) {
  try {
    yield put(setBasicsLoading(true));
    const basics = yield call(
      getAllBasics,
      pagination.limit,
      pagination.skip,
      filter
    );
    if (basics) {
      yield put(setBasics(basics));
      yield put(setItemsCount(basics?.count));
      yield put(setBasicsLoading(false));
    }
  } catch (error) {
    yield call(handleBasicsError, error);
  }
}

export function* handleBasicAdd({ payload }) {
  try {
    yield put(setBasicsLoading(true));
    const basic = yield call(createBasic, payload);
    if (basic) {
      yield put(setBasicsLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
      yield put(push(config.routes.pathToBasics));
    }
  } catch (e) {
    yield call(handleBasicsError, e);
  }
}

export function* handleBasicDelete({ payload }) {
  try {
    yield put(setBasicsLoading(true));
    const basic = yield call(deleteBasic, payload);
    if (basic) {
      yield put(removeBasicFromState(payload));
      yield put(setBasicsLoading(false));
      yield put(updatePagination());
      yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
    }
  } catch (error) {
    yield call(handleBasicsError, error);
  }
}

export function* handleBasicById({ payload }) {
  try {
    yield put(setBasicsLoading(true));
    const basic = yield call(getBasicById, payload);
    if (basic) {
      yield put(setBasic(basic));
      yield put(setBasicsLoading(false));
    }
  } catch (error) {
    yield call(handleBasicsError, error);
  }
}

export function* handleBasicUpdate({ payload }) {
  try {
    yield put(setBasicsLoading(true));
    const { id, basic, upload } = payload;
    const basicUpdate = yield call(updateBasic, id, basic, upload);
    if (basicUpdate) {
      yield put(setBasicsLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
      yield put(push(config.routes.pathToBasics));
    }
  } catch (error) {
    yield call(handleBasicsError, error);
  }
}

export function* handleBasicsError(e) {
  if (e.message === AUTH_ERRORS.REFRESH_TOKEN_IS_NOT_VALID) {
    yield call(handleAdminLogout);
  } else {
    yield put(setBasicsLoading(false));
    yield put(setBasicError({ e }));
    yield call(handleErrorSnackbar, e.message);
  }
}

export default function* basicsSaga() {
  yield takeEvery(ADD_BASIC, handleBasicAdd);
  yield takeEvery(GET_BASICS, handleBasicsLoad);
  yield takeEvery(DELETE_BASIC, handleBasicDelete);
  yield takeEvery(GET_BASIC, handleBasicById);
  yield takeEvery(UPDATE_BASIC, handleBasicUpdate);
}
