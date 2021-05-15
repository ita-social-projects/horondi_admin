import { takeEvery, call, select, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  setCategories,
  setCategoryLoading,
  setCategory,
  setCategoryError,
  removeCategoryFromStore
} from './categories.actions';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';

import {
  getAllCategories,
  deleteCategoryById,
  createCategory,
  updateCategory,
  getCategoryById
} from './categories.operations';

import {
  GET_CATEGORIES,
  DELETE_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  GET_CATEGORY
} from './categories.types';

import { config } from '../../configs';
import { selectCategorySwitchAndDeleteId } from '../selectors/category.selectors';
import { setItemsCount } from '../table/table.actions';
import { AUTH_ERRORS } from '../../error-messages/auth';
import { handleAdminLogout } from '../auth/auth.sagas';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = config.statuses;

export function* handleCategoriesLoad({
  payload: { filter, pagination, sort }
}) {
  try {
    yield put(setCategoryLoading(true));
    const categories = yield call(getAllCategories, filter, pagination, sort);
    yield put(setItemsCount(categories?.count));
    yield put(setCategories(categories?.items));
    yield put(setCategoryLoading(false));
  } catch (error) {
    yield call(handleCategoryError, error);
  }
}

export function* handleCategoryLoad({ payload }) {
  try {
    yield put(setCategoryLoading(true));
    const category = yield call(getCategoryById, payload);

    if (category) {
      yield put(setCategory(category));
      yield put(setCategoryLoading(false));
    }
  } catch (error) {
    yield call(handleCategoryError, error);
  }
}

export function* handleAddCategory({ payload }) {
  try {
    yield put(setCategoryLoading(true));
    const category = yield call(createCategory, payload);
    if (category) {
      yield put(setCategoryLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
      yield put(push(config.routes.pathToCategories));
    }
  } catch (error) {
    yield call(handleCategoryError, error);
  }
}

export function* handleDeleteCategory() {
  try {
    yield put(setCategoryLoading(true));
    const { switchId, deleteId } = yield select(
      selectCategorySwitchAndDeleteId
    );
    const category = yield call(deleteCategoryById, deleteId, switchId);

    if (category) {
      yield put(removeCategoryFromStore(deleteId));
      yield put(setCategoryLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
    }
  } catch (error) {
    yield call(handleCategoryError, error);
  }
}

export function* handleCategoryUpdate({ payload }) {
  try {
    yield put(setCategoryLoading(true));

    const category = yield call(updateCategory, payload);

    if (category) {
      yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
      yield put(push(config.routes.pathToCategories));
    }
  } catch (error) {
    yield call(handleCategoryError, error);
  }
}

function* handleCategoryError(e) {
  if (
    e.message === AUTH_ERRORS.REFRESH_TOKEN_IS_NOT_VALID ||
    e.message === AUTH_ERRORS.USER_IS_BLOCKED
  ) {
    yield call(handleAdminLogout);
  } else {
    yield put(setCategoryLoading(false));
    yield put(setCategoryError({ e }));
    yield call(handleErrorSnackbar, e.message);
  }
}

export default function* CategoriesSaga() {
  yield takeEvery(GET_CATEGORIES, handleCategoriesLoad);
  yield takeEvery(DELETE_CATEGORY, handleDeleteCategory);
  yield takeEvery(GET_CATEGORY, handleCategoryLoad);
  yield takeEvery(ADD_CATEGORY, handleAddCategory);
  yield takeEvery(UPDATE_CATEGORY, handleCategoryUpdate);
}
