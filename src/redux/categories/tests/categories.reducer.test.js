import { initialState, categoriesReducer } from '../categories.reducer';

import {
  setCategories,
  setCategoriesLoading,
  setCategoriesError,
  setCategory,
  resetNewCategory,
  toggleCategoryDeleteDialog,
  setCategorySwitchId,
  setCategoryDeleteId
} from '../categories.actions.js';

import { categories, category, error } from './category.variables';
import { config } from '../../../configs';

describe('Categories reducer tests', () => {
  it('should return default state', () => {
    expect(categoriesReducer()).toEqual(initialState);
  });

  it('should set categories', () => {
    expect(categoriesReducer(initialState, setCategories(categories))).toEqual({
      ...initialState,
      categories,
      categoriesLoading: false,
      categoriesError: null
    });
  });
  it('should set categories loading', () => {
    expect(categoriesReducer(initialState, setCategoriesLoading(true))).toEqual(
      {
        ...initialState,
        categoriesLoading: true
      }
    );
  });
  it('should set categories error', () => {
    expect(categoriesReducer(initialState, setCategoriesError(error))).toEqual({
      ...initialState,
      categoriesError: error,
      categoriesLoading: false
    });
  });
  it('should set category', () => {
    expect(categoriesReducer(initialState, setCategory(category))).toEqual({
      ...initialState,
      newCategory: {
        ...config.templates.categoryTemplate,
        ...category
      }
    });
  });
  it('should reset new category', () => {
    expect(categoriesReducer(initialState, resetNewCategory())).toEqual({
      ...initialState,
      newCategory: {
        ...config.templates.categoryTemplate
      }
    });
  });
  it('should toggle category delete dialog', () => {
    expect(
      categoriesReducer(initialState, toggleCategoryDeleteDialog())
    ).toEqual({
      ...initialState,
      isDeleteDialogOpen: !initialState.isDeleteDialogOpen
    });
  });
  it('should set category delete id', () => {
    expect(
      categoriesReducer(initialState, setCategoryDeleteId(categories[0]._id))
    ).toEqual({
      ...initialState,
      deleteId: categories[0]._id
    });
  });
  it('should set category switch id', () => {
    expect(
      categoriesReducer(initialState, setCategorySwitchId(categories[1]._id))
    ).toEqual({
      ...initialState,
      switchId: categories[1]._id
    });
  });
});
