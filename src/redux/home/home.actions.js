import {
  SET_HOME_PAGE_DATA,
  GET_HOME_PAGE_DATA,
  SET_HOME_PAGE_DATA_LOADING,
  UPDATE_HOME_PAGE_DATA,
  UPDATE_HOME_PAGE_DATA_IN_STORE,
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

const updateHomePageData = (payload) => ({
  type: UPDATE_HOME_PAGE_DATA,
  payload
});

const updateHomePageImagesInStore = (id, updatedImages) => ({
  type: UPDATE_HOME_PAGE_DATA_IN_STORE,
  payload: { id, updatedImages }
});

const setHomePageDataLoading = (payload) => ({
  type: SET_HOME_PAGE_DATA_LOADING,
  payload
});

const setHomePageDataError = (error) => ({
  type: SET_HOME_PAGE_DATA_ERROR,
  payload: error
});

export {
  setHomePageData,
  getHomePageData,
  setHomePageDataLoading,
  updateHomePageData,
  updateHomePageImagesInStore,
  setHomePageDataError
};
