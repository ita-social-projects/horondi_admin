import {
  SET_HOME_PAGE_DATA,
  GET_HOME_PAGE_DATA,
  SET_HOME_PAGE_DATA_LOADING,
  UPDATE_HOME_PAGE_DATA,
  UPDATE_HOME_PAGE_DATA_LOCALLY,
  SET_HOME_PAGE_DATA_ERROR
} from './home.types';

const setHomePageData = (payload) => ({
  type: SET_HOME_PAGE_DATA,
  payload
});

const getHomePageData = () => ({
  type: GET_HOME_PAGE_DATA
});

const updateHomePageData = (payload) => ({
  type: UPDATE_HOME_PAGE_DATA,
  payload
});

const updateHomePageImagesInStore = (id, updatedImages) => ({
  type: UPDATE_HOME_PAGE_DATA_LOCALLY,
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
