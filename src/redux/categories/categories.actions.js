import {
  GET_CATEGORIES,
  SET_CATEGORIES,
  SET_CATEGORIES_ERROR,
  SET_CATEGORIES_LOADING,
  GET_CATEGORY,
  DELETE_CATEGORY,
  CREATE_CATEGORY,
  SET_CATEGORY,
  RESET_NEW_CATEGORY,
  EDIT_CATEGORY
} from './categories.types';

export const getCategories = () => ({
  type: GET_CATEGORIES
});

export const setCategories = (payload) => ({
  type: SET_CATEGORIES,
  payload
});

export const setCategoriesLoading = (payload) => ({
  type: SET_CATEGORIES_LOADING,
  payload
});

export const setCategoriesError = (payload) => ({
  type: SET_CATEGORIES_ERROR,
  payload
});

export const getCategory = (payload) => ({
  type: GET_CATEGORY,
  payload
});

export const createCategory = (category) => ({
  type: CREATE_CATEGORY,
  payload: category
});

export const setCategory = (payload) => ({
  type: SET_CATEGORY,
  payload
});

export const resetNewCategory = () => ({
  type: RESET_NEW_CATEGORY
});

export const editCategory = (payload) => ({
  type: EDIT_CATEGORY,
  payload
});

export const deleteCategory = (payload) => ({
  type: DELETE_CATEGORY,
  payload
});
