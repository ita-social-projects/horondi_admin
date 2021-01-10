import {
  GET_CATEGORIES,
  SET_CATEGORIES,
  SET_CATEGORY_LOADING,
  DELETE_CATEGORY,
  ADD_CATEGORY,
  GET_CATEGORY,
  SET_CATEGORY,
  UPDATE_CATEGORY,
  SET_CATEGORY_ERROR,
  REMOVE_CATEGORY_FROM_STORE,
  TOGGLE_CATEGORY_DELETE_DIALOG,
  SET_CATEGORY_DELETE_ID,
  SET_CATEGORY_SWITCH_ID
} from './categories.types';

export const setCategories = (payload) => ({
  type: SET_CATEGORIES,
  payload
});

export const getCategories = (payload) => ({
  type: GET_CATEGORIES,
  payload
});

export const deleteCategory = () => ({
  type: DELETE_CATEGORY
});

export const addCategory = (payload) => ({
  type: ADD_CATEGORY,
  payload
});

export const setCategoryLoading = (payload) => ({
  type: SET_CATEGORY_LOADING,
  payload
});

export const updateCategory = (payload) => ({
  type: UPDATE_CATEGORY,
  payload
});

export const setCategory = (payload) => ({
  type: SET_CATEGORY,
  payload
});

export const getCategory = (payload) => ({
  type: GET_CATEGORY,
  payload
});

export const setCategoryError = (payload) => ({
  type: SET_CATEGORY_ERROR,
  payload
});

export const removeCategoryFromStore = (payload) => ({
  type: REMOVE_CATEGORY_FROM_STORE,
  payload
});

export const toggleCategoryDeleteDialog = () => ({
  type: TOGGLE_CATEGORY_DELETE_DIALOG
});

export const setCategoryDeleteId = (payload) => ({
  type: SET_CATEGORY_DELETE_ID,
  payload
});

export const setCategorySwitchId = (payload) => ({
  type: SET_CATEGORY_SWITCH_ID,
  payload
});
