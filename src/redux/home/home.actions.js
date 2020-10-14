import {
  SET_HOME_PAGE_DATA,
  GET_HOME_PAGE_DATA,
  SET_HOME_PAGE_DATA_LOADING,
  UPDATE_HOME_PAGE_DATA_IN_STORE,
  SET_HOME_PAGE_DATA_ERROR,
} from './home.types';

const setHomePageData = (payload) => ({
  type: SET_HOME_PAGE_DATA,
  payload
});

const getHomePageData = (payload) => ({
  type: GET_HOME_PAGE_DATA,
  payload
});

const setHomePageDataLoading = (loading) => ({
  type: SET_HOME_PAGE_DATA_LOADING,
  payload: loading
});

const updateHomePageDataInStore = (id, updatedContact) => ({
  type: UPDATE_HOME_PAGE_DATA_IN_STORE,
  payload: { id, updatedContact }
});

const setHomePageDataError = (error) => ({
  type: SET_HOME_PAGE_DATA_ERROR,
  payload: error
});

export {
  setHomePageData,
  getHomePageData,
  setHomePageDataLoading,
  updateHomePageDataInStore,
  setHomePageDataError,
};