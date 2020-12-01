import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { select } from 'redux-saga-test-plan/matchers';
import {
  createCategory,
  setCategories,
  setCategoriesLoading,
  setCategory
} from '../categories.actions';
import {
  getAllCategories,
  getCategoryById,
  getSubcategories,
  deleteCategoryById,
  updateCategoryById
} from '../categories.operations';
import {
  handleCategoriesLoad,
  handleLoadCategoryById,
  handleCreateCategory,
  handleEditCategory,
  handleDeleteCategory,
  handleSubcategoriesLoad
} from '../categories.sagas';
import {
  categories,
  category,
  categoryId,
  deleteId,
  switchId
} from './category.variables';

import { selectCategorySwitchAndDeleteId } from '../../selectors/category.selectors';
import categoriesReducer, { initialState } from '../categories.reducer';

describe('categories sagas tests', () => {
  it('should handle categories load', () =>
    expectSaga(handleCategoriesLoad)
      .withReducer(categoriesReducer)
      .provide([[call(getAllCategories), categories]])
      .put(setCategoriesLoading(true))
      .put(setCategories(categories))
      .hasFinalState({
        ...initialState,
        categories
      })
      .run()
      .then((res) => {
        const { allEffects: analysis } = res;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysis).toHaveLength(3);
        expect(analysisPut).toHaveLength(2);
        expect(analysisCall).toHaveLength(1);
      }));
  it('should handle load category by id', () =>
    expectSaga(handleLoadCategoryById, { payload: categoryId })
      .withReducer(categoriesReducer)
      .provide([[call(getCategoryById, categoryId), categories[0]]])
      .put(setCategoriesLoading(true))
      .put(setCategory(categories[0]))
      .hasFinalState({
        ...initialState,
        newCategory: categories[0],
        categoriesLoading: true
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysis).toHaveLength(3);
        expect(analysisPut).toHaveLength(2);
        expect(analysisCall).toHaveLength(1);
      }));
  it('should handle create category', () =>
    expectSaga(handleCreateCategory, {
      payload: { ...category }
    })
      .withReducer(categoriesReducer)
      .provide([[call(createCategory, { ...category })]])
      .put(setCategoriesLoading(true))
      .hasFinalState({
        ...initialState,
        categoriesLoading: true
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysis).toHaveLength(2);
        expect(analysisPut).toHaveLength(1);
        expect(analysisCall).toHaveLength(1);
      }));
  it('should handle edit category', () =>
    expectSaga(handleEditCategory, {
      payload: categoryId
    })
      .withReducer(categoriesReducer)
      .provide([[call(updateCategoryById, categoryId)]])
      .put(setCategoriesLoading(true))
      .put(setCategoriesLoading(false))
      .hasFinalState({
        ...initialState
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysis).toHaveLength(9);
        expect(analysisPut).toHaveLength(6);
        expect(analysisCall).toHaveLength(3);
      }));
  it('should handle delete category', () =>
    expectSaga(handleDeleteCategory)
      .withReducer(categoriesReducer)
      .provide([
        [
          select(selectCategorySwitchAndDeleteId),
          {
            deleteId,
            switchId
          }
        ],
        [call(deleteCategoryById, deleteId, switchId)],
        [call(getAllCategories), categories]
      ])
      .put(setCategoriesLoading(true))
      .put(setCategories(categories))
      .put(setCategoriesLoading(false))
      .hasFinalState({
        ...initialState,
        categories
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysis).toHaveLength(11);
        expect(analysisPut).toHaveLength(6);
        expect(analysisCall).toHaveLength(4);
      }));

  it('should handle subcategories load', () =>
    expectSaga(handleSubcategoriesLoad, { payload: { id: categoryId } })
      .withReducer(categoriesReducer)
      .provide([[call(getSubcategories, { id: categoryId }), categories]])
      .put(setCategoriesLoading(true))
      .put(setCategories(categories))
      .hasFinalState({
        ...initialState,
        categories
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysis).toHaveLength(3);
        expect(analysisPut).toHaveLength(2);
        expect(analysisCall).toHaveLength(1);
      }));
});
