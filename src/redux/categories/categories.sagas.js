import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  GET_CATEGORIES,
  GET_CATEGORY,
  CREATE_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  GET_SUBCATEGORIES
} from './categories.types';
import {
  setCategories,
  setCategoriesError,
  setCategoriesLoading,
  setCategory
} from './categories.actions';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
  getSubcategories
} from './categories.operations';

function* handleCategoriesLoad() {
  try {
    yield put(setCategoriesLoading(true));
    const categories = yield call(getAllCategories);
    yield put(setCategories(categories.data.getAllCategories));
  } catch (e) {
    yield put(push('/error-page'));
    yield setCategoriesError(e);
  }
}

function* handleLoadCategoryById({ payload }) {
  try {
    yield put(setCategoriesLoading(true));
    const category = yield call(getCategoryById, payload);
    yield put(setCategory(category.data.getCategoryById));
  } catch (e) {
    yield setCategoriesError(e);
  }
}

function* handleCreateCategory({ payload }) {
  try {
    yield put(setCategoriesLoading(true));
    yield call(createCategory, payload);
    yield put(push('/categories'));
  } catch (e) {
    yield setCategoriesError(e);
  }
}

function* handleEditCategory({ payload }) {
  try {
    yield put(setCategoriesLoading(true));
    yield call(updateCategoryById, payload);
    yield put(setCategoriesLoading(false));
    yield put(push('/categories'));
  } catch (e) {
    yield setCategoriesError(e);
  }
}

function* handleDeleteCategory({ payload }) {
  try {
    yield put(setCategoriesLoading(true));
    yield call(deleteCategoryById, payload);
    // FETCH AGAIN
    const categories = yield call(getAllCategories);
    yield put(setCategories(categories.data.getAllCategories));

    yield put(setCategoriesLoading(false));
  } catch (e) {
    yield setCategoriesError(e);
  }
}

function* handleSubcategoriesLoad({ payload }) {
  try {
    yield put(setCategoriesLoading(true));
    const subcategories = yield call(getSubcategories, payload);
    yield put(setCategories(subcategories.data.getSubcategories));
  } catch (e) {
    yield setCategoriesError(e);
  }
}

export default function* newsSaga() {
  yield takeEvery(GET_CATEGORIES, handleCategoriesLoad);
  yield takeEvery(GET_CATEGORY, handleLoadCategoryById);
  yield takeEvery(CREATE_CATEGORY, handleCreateCategory);
  yield takeEvery(EDIT_CATEGORY, handleEditCategory);
  yield takeEvery(DELETE_CATEGORY, handleDeleteCategory);
  yield takeEvery(GET_SUBCATEGORIES, handleSubcategoriesLoad);
}
