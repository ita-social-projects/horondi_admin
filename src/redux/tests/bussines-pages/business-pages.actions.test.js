import {
  setBusinessPages,
  getAllBusinessPages,
  getBusinessPageById,
  setLoading,
  setBusinessPagesError,
  addBusinessPage,
  deleteBusinessPage,
  updateBusinessPage,
  setCurrentBusinessPage
} from '../../business-pages/business-pages.actions';
import {
  SET_BUSINESS_PAGES,
  GET_BUSINESS_PAGE_BY_ID,
  SET_BUSINESS_PAGES_LOADING,
  SET_BUSINESS_PAGES_ERROR,
  ADD_BUSINESS_PAGE,
  DELETE_BUSINESS_PAGE,
  UPDATE_BUSINESS_PAGE,
  SET_CURRENT_BUSINESS_PAGE,
  GET_ALL_BUSINESS_PAGES
} from '../../business-pages/business-pages.types';
import {
  businessPage,
  businessPageId,
  businessPages,
  businessPageToRemoveId,
  businessPageToUpdate
} from './business-pages.variables';

describe('business-pages actions tests', () => {
  it('should get business page by id', () => {
    expect(getBusinessPageById('0c3c7954dd35de268bed4fe8')).toEqual({
      type: GET_BUSINESS_PAGE_BY_ID,
      payload: businessPageId
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
  it('should delete business page', () => {
    expect(deleteBusinessPage(businessPageToRemoveId)).toEqual({
      type: DELETE_BUSINESS_PAGE,
      payload: businessPageToRemoveId
    });
  });
});
