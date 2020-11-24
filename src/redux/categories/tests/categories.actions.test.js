import {
  GET_CATEGORIES,
  SET_CATEGORIES_ERROR,
  SET_CATEGORIES_LOADING,
  GET_CATEGORY,
  DELETE_TITLE,
  SET_CATEGORY,
  RESET_NEW_CATEGORY
} from '../categories.types';

import {
  getCategories,
  getCategory,
  setCategoriesError,
  setCategoriesLoading,
  setCategory,
  deleteCategory,
  resetNewCategory
} from '../categories.actions';

import { categoryId, category } from './category.variables';

describe('category actions tests', () => {
  it('should get category', () => {
    expect(getCategory(categoryId)).toEqual({
      type: GET_CATEGORY,
      payload: categoryId
    });
  });
  it('should set category', () => {
    expect(setCategory(category)).toEqual({
      type: SET_CATEGORY,
      payload: category
    });
  });
  it('should set categories loading to true', () => {
    expect(setCategoriesLoading(true)).toEqual({
      type: SET_CATEGORIES_LOADING,
      payload: true
    });
  });
  it('should set categories error to true', () => {
    expect(setCategoriesError(true)).toEqual({
      type: SET_CATEGORIES_ERROR,
      payload: true
    });
  });
  it('should delete category', () => {
    expect(deleteCategory(categoryId)).toEqual({
      type: DELETE_TITLE,
      payload: categoryId
    });
  });
  it('should receive all categories', () => {
    expect(getCategories()).toEqual({
      type: GET_CATEGORIES
    });
  });
  it('should reset category', () => {
    expect(resetNewCategory()).toEqual({
      type: RESET_NEW_CATEGORY
    });
  });
});
