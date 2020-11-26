import { expectSaga } from 'redux-saga-test-plan';
import { call, put } from 'redux-saga/effects';
import { setCategories, setCategoriesLoading } from '../categories.actions';
import { getAllCategories } from '../categories.operations';
import { handleCategoriesLoad } from '../categories.sagas';
import { categories, categoriesRes } from './category.variables';

describe('categories sagas tests', () => {
  it('should handle all order list', () =>
    expectSaga(handleCategoriesLoad)
      .provide([[call(getAllCategories), categoriesRes]])
      .put(setCategoriesLoading(true))
      .put(setCategories(categories))
      .run());
});
