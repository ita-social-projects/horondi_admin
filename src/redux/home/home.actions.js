import {
  SET_HOME_PAGE_DATA,
  GET_HOME_PAGE_DATA,
  SET_HOME_PAGE_DATA_LOADING,
  ADD_HOME_PAGE_DATA,
  UPDATE_HOME_PAGE_DATA,
  DELETE_HOME_PAGE_DATA,
  ADD_HOME_PAGE_DATA_IN_STORE,
  UPDATE_HOME_PAGE_DATA_IN_STORE,
  DELETE_HOME_PAGE_DATA_IN_STORE,
  SET_HOME_PAGE_DATA_ERROR
} from './home.types';

const setHomePageData = (payload) => ({
  type: SET_HOME_PAGE_DATA,
  payload
});

const getHomePageData = (payload) => ({
  type: GET_HOME_PAGE_DATA,
  payload
});

const addHomePageData = (payload) => ({
  type: ADD_HOME_PAGE_DATA,
  payload
});

const updateHomePageData = (payload) => ({
  type: UPDATE_HOME_PAGE_DATA,
  payload
});

const daleteHomePageData = (payload) => ({
  type: DELETE_HOME_PAGE_DATA,
  payload
});

const addHomePageDataInStore = (payload) => ({
  type: ADD_HOME_PAGE_DATA_IN_STORE,
  payload
});

const updateHomePageImagesInStore = (id, updatedImages) => ({
  type: UPDATE_HOME_PAGE_DATA_IN_STORE,
  payload: { id, updatedImages }
});

const deleteHomePageImagesInStore = (id, deletedImages) => ({
  type: DELETE_HOME_PAGE_DATA_IN_STORE,
  payload: { id, deletedImages }
});

const setHomePageDataLoading = (loading) => ({
  type: SET_HOME_PAGE_DATA_LOADING,
  payload: loading
});

const setHomePageDataError = (error) => ({
  type: SET_HOME_PAGE_DATA_ERROR,
  payload: error
});

export {
  setHomePageData,
  getHomePageData,
  setHomePageDataLoading,
  addHomePageData,
  updateHomePageData,
  daleteHomePageData,
  addHomePageDataInStore,
  updateHomePageImagesInStore,
  deleteHomePageImagesInStore,
  setHomePageDataError
};
