import {
  GET_CATEGORIES,
  GET_CATEGORY,
  DELETE_CATEGORY,
  SET_CATEGORY,
  SET_CATEGORY_LOADING,
  SET_CATEGORY_ERROR
} from '../categories.types';

import {
  getCategories,
  getCategory,
  setCategory,
  deleteCategory,
  setCategoryLoading,
  setCategoryError
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
    expect(setCategoryLoading(true)).toEqual({
      type: SET_CATEGORY_LOADING,
      payload: true
    });
  });
  it('should set categories error to true', () => {
    expect(setCategoryError(true)).toEqual({
      type: SET_CATEGORY_ERROR,
      payload: true
    });
  });
  it('should delete category', () => {
    expect(deleteCategory(categoryId)).toEqual({
      type: DELETE_CATEGORY
    });
  });
  it('should receive all categories', () => {
    expect(getCategories()).toEqual({
      type: GET_CATEGORIES
    });
  });
});
