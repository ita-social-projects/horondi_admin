import categoriesReducer, {
  initialState
} from '../../categories/categories.reducer';

import {
  setCategories,
  toggleCategoryDeleteDialog,
  setCategorySwitchId,
  setCategoryDeleteId,
  setCategoryError,
  setCategoryLoading
} from '../../categories/categories.actions.js';

import { categories, error } from './category.variables';

describe('Categories reducer tests', () => {
  it('should return default state', () => {
    expect(categoriesReducer()).toEqual(initialState);
  });

  it('should set categories', () => {
    expect(categoriesReducer(initialState, setCategories(categories))).toEqual({
      ...initialState,
      categories,
      categoryLoading: false,
      categoryError: null
    });
  });
  it('should set categories loading', () => {
    expect(categoriesReducer(initialState, setCategoryLoading(true))).toEqual({
      ...initialState,
      categoryLoading: true
    });
  });
  it('should set categories error', () => {
    expect(categoriesReducer(initialState, setCategoryError(error))).toEqual({
      ...initialState,
      categoryError: error,
      categoryLoading: false
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
      categoriesReducer(
        initialState,
        setCategoryDeleteId(categories.items[0]._id)
      )
    ).toEqual({
      ...initialState,
      deleteId: categories.items[0]._id
    });
  });
  it('should set category switch id', () => {
    expect(
      categoriesReducer(
        initialState,
        setCategorySwitchId(categories.items[1]._id)
      )
    ).toEqual({
      ...initialState,
      switchId: categories.items[1]._id
    });
  });
});
