import {
  setBusinessPages,
  getAllBusinessPages,
  getBusinessPageByCode,
  setLoading,
  setBusinessPagesError,
  addBusinessPage,
  deleteBusinessPage,
  updateBusinessPage,
  setCurrentBusinessPage
} from '../business-pages.actions';
import {
  SET_BUSINESS_PAGES,
  GET_BUSINESS_PAGE_BY_CODE,
  SET_BUSINESS_PAGES_LOADING,
  SET_BUSINESS_PAGES_ERROR,
  ADD_BUSINESS_PAGE,
  DELETE_BUSINESS_PAGE,
  UPDATE_BUSINESS_PAGE,
  SET_CURRENT_BUSINESS_PAGE,
  GET_ALL_BUSINESS_PAGES
} from '../business-pages.types';
import {
  businessPage,
  businessPageCode,
  businessPages,
  businessPageToRemoveId,
  businessPageToUpdate
} from './business-pages.variables';

describe('business-pages actions tests', () => {
  it('should get business page by code', () => {
    expect(getBusinessPageByCode('payment-and-shipping')).toEqual({
      type: GET_BUSINESS_PAGE_BY_CODE,
      payload: businessPageCode
    });
  });
  it('should add business page', () => {
    expect(addBusinessPage(businessPage)).toEqual({
      type: ADD_BUSINESS_PAGE,
      payload: businessPage
    });
  });
  it('should set business page', () => {
    expect(setCurrentBusinessPage(businessPage)).toEqual({
      type: SET_CURRENT_BUSINESS_PAGE,
      payload: businessPage
    });
  });
  it('should get all business pages', () => {
    expect(getAllBusinessPages()).toEqual({ type: GET_ALL_BUSINESS_PAGES });
  });
  it('should set all business pages', () => {
    expect(setBusinessPages(businessPages)).toEqual({
      type: SET_BUSINESS_PAGES,
      payload: businessPages
    });
  });
  it('should set business pages error to true', () => {
    expect(setBusinessPagesError(true)).toEqual({
      type: SET_BUSINESS_PAGES_ERROR,
      payload: true
    });
  });
  it('should set business pages loading to true', () => {
    expect(setLoading(true)).toEqual({
      type: SET_BUSINESS_PAGES_LOADING,
      payload: true
    });
  });
  it('should update business page', () => {
    expect(updateBusinessPage(businessPageToUpdate)).toEqual({
      type: UPDATE_BUSINESS_PAGE,
      payload: businessPageToUpdate
    });
  });
});
