import { takeEvery, call, put, select } from 'redux-saga/effects';
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

import { config } from '../../configs';
import { selectCategorySwitchAndDeleteId } from '../selectors/category.selectors';
import { handleSuccessSnackbar } from '../snackbar/snackbar.sagas';

const {
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS,
  SUCCESS_CREATION_STATUS
} = config.statuses;

export function* handleCategoriesLoad() {
  try {
    yield put(setCategoriesLoading(true));
    const categories = yield call(getAllCategories);
    yield put(setCategories(categories));
  } catch (e) {
    yield put(push('/error-page'));
    yield setCategoriesError(e);
  }
}

export function* handleLoadCategoryById({ payload }) {
  try {
    yield put(setCategoriesLoading(true));
    const category = yield call(getCategoryById, payload);
    yield put(setCategory(category));
  } catch (e) {
    yield setCategoriesError(e);
  }
}

export function* handleCreateCategory({ payload }) {
  try {
    yield put(setCategoriesLoading(true));
    yield call(createCategory, payload);
    yield put(push('/categories'));
    yield call(handleSuccessSnackbar, SUCCESS_CREATION_STATUS);
  } catch (e) {
    yield setCategoriesError(e);
  }
}

export function* handleEditCategory({ payload }) {
  try {
    yield put(setCategoriesLoading(true));
    yield call(updateCategoryById, payload);
    yield put(setCategoriesLoading(false));
    yield put(push('/categories'));
    yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
  } catch (e) {
    yield setCategoriesError(e);
  }
}

export function* handleDeleteCategory() {
  try {
    yield put(setCategoriesLoading(true));
    const { switchId, deleteId } = yield select(
      selectCategorySwitchAndDeleteId
    );
    yield call(deleteCategoryById, deleteId, switchId);
    const categories = yield call(getAllCategories);
    yield put(setCategories(categories));
    yield put(setCategoriesLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (e) {
    yield setCategoriesError(e);
  }
}

export function* handleSubcategoriesLoad({ payload }) {
  try {
    yield put(setCategoriesLoading(true));
    const subcategories = yield call(getSubcategories, payload);
    yield put(setCategories(subcategories));
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
