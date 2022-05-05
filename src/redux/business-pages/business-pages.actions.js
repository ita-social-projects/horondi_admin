import {
  SET_BUSINESS_PAGES_LOADING,
  SET_BUSINESS_PAGES,
  GET_ALL_BUSINESS_PAGES,
  SET_BUSINESS_PAGES_ERROR,
  ADD_BUSINESS_PAGE,
  DELETE_BUSINESS_PAGE,
  SET_CURRENT_BUSINESS_PAGE,
  GET_BUSINESS_PAGE_BY_CODE,
  UPDATE_BUSINESS_PAGE,
  REMOVE_BUSINESS_PAGE_FROM_STORE
} from './business-pages.types';

const setBusinessPages = (businessPage) => ({
  type: SET_BUSINESS_PAGES,
  payload: businessPage
});

const getAllBusinessPages = () => ({
  type: GET_ALL_BUSINESS_PAGES
});

const getBusinessPageByCode = (payload) => ({
  type: GET_BUSINESS_PAGE_BY_CODE,
  payload
});
const setLoading = (loading) => ({
  type: SET_BUSINESS_PAGES_LOADING,
  payload: loading
});

const setBusinessPagesError = (error) => ({
  type: SET_BUSINESS_PAGES_ERROR,
  payload: error
});

const addBusinessPage = (payload) => ({
  type: ADD_BUSINESS_PAGE,
  payload
});

const deleteBusinessPage = (payload) => ({
  type: DELETE_BUSINESS_PAGE,
  payload
});

const updateBusinessPage = (payload) => ({
  type: UPDATE_BUSINESS_PAGE,
  payload
});

const setCurrentBusinessPage = (currentBusinessPage) => ({
  type: SET_CURRENT_BUSINESS_PAGE,
  payload: currentBusinessPage
});

const removeBusinessPageFromStore = (payload) => ({
  type: REMOVE_BUSINESS_PAGE_FROM_STORE,
  payload
});

export {
  setBusinessPages,
  getAllBusinessPages,
  addBusinessPage,
  setLoading,
  setBusinessPagesError,
  deleteBusinessPage,
  setCurrentBusinessPage,
  getBusinessPageByCode,
  updateBusinessPage,
  removeBusinessPageFromStore
};
