import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  setCategories,
  setCategoryLoading,
  setCategory,
  setCategoryError,
  removeCategoryFromStore
} from './category.actions';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';

import {
  getAllCategories,
  deleteCategory,
  createCategory,
  updateCategory,
  getCategoryById
} from './category.operations';

import {
  GET_CATEGORIES,
  DELETE_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  GET_CATEGORY
} from './category.types';

import { config } from '../../configs';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = config.statuses;

export function* handleCategoriesLoad({ payload }) {
  try {
    yield put(setCategoryLoading(true));
    const categories = yield call(getAllCategories);
    yield put(setCategories(categories));
    yield put(setCategoryLoading(false));
  } catch (error) {
    yield call(handleCategoryError, error);
  }
}

export function* handleCategoryLoad({ payload }) {
  try {
    yield put(setCategoryLoading(true));
    const category = yield call(getCategoryById, payload);
    yield put(setCategory(category));
    yield put(setCategoryLoading(false));
  } catch (error) {
    yield call(handleCategoryError, error);
  }
}

export function* handleAddCategory({ payload }) {
  try {
    yield put(setCategoryLoading(true));
    yield call(createCategory, payload);
    yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
    yield put(push(config.routes.pathToCategories));
  } catch (error) {
    yield call(handleCategoryError, error);
  }
}

export function* handleCategoryDelete({ payload }) {
  try {
    yield put(setCategoryLoading(true));
    yield call(deleteCategory, payload);
    yield put(removeCategoryFromStore(payload));
    yield put(setCategoryLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (error) {
    yield call(handleCategoryError, error);
  }
}

export function* handleCategoryUpdate({ payload }) {
  try {
    yield put(setCategoryLoading(true));
    yield call(updateCategory, payload);
    yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
    yield put(push(config.routes.pathToCategories));
  } catch (error) {
    yield call(handleCategoryError, error);
  }
}

function* handleCategoryError(e) {
  yield put(setCategoryLoading(false));
  yield put(setCategoryError({ e }));
  yield call(handleErrorSnackbar, e.message);
}

export default function* CategoriesSaga() {
  yield takeEvery(GET_CATEGORIES, handleCategoriesLoad);
  yield takeEvery(DELETE_CATEGORY, handleCategoryDelete);
  yield takeEvery(GET_CATEGORY, handleCategoryLoad);
  yield takeEvery(ADD_CATEGORY, handleAddCategory);
  yield takeEvery(UPDATE_CATEGORY, handleCategoryUpdate);
}
