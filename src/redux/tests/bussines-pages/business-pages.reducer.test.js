import { businessPage, businessPages } from './business-pages.variables';
import {
  setBusinessPagesError,
  setLoading,
  setBusinessPages,
  setCurrentBusinessPage
} from '../../business-pages/business-pages.actions';

import businessPagesReducer, {
  initialState
} from '../../business-pages/business-pages.reducer';

describe('business pages reducer tests', () => {
  it('should return default state', () => {
    expect(businessPagesReducer()).toEqual(initialState);
  });
  it('should set all business pages to store', () => {
    expect(
      businessPagesReducer(initialState, setBusinessPages(businessPages))
    ).toEqual({
      ...initialState,
      list: businessPages
    });
  });
  it('should set business page to store', () => {
    expect(
      businessPagesReducer(initialState, setCurrentBusinessPage(businessPage))
    ).toEqual({
      ...initialState,
      currentPage: businessPage
    });
  });
  it('should set business page loading to true', () => {
    expect(businessPagesReducer(initialState, setLoading(true))).toEqual({
      ...initialState,
      loading: true
    });
  });
  it('should set business page error to true', () => {
    expect(
      businessPagesReducer(initialState, setBusinessPagesError(true))
    ).toEqual({
      ...initialState,
      error: true
    });
  });
});
