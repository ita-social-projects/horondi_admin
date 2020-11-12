import {
  setHomePageData,
  getHomePageData,
  setHomePageDataLoading,
  updateHomePageData,
  updateHomePageImagesInStore,
  setHomePageDataError
} from '../home.actions';

import {
  SET_HOME_PAGE_DATA,
  GET_HOME_PAGE_DATA,
  SET_HOME_PAGE_DATA_LOADING,
  UPDATE_HOME_PAGE_DATA,
  UPDATE_HOME_PAGE_DATA_LOCALLY,
  SET_HOME_PAGE_DATA_ERROR
} from '../home.types';

import {
  images,
  updatedImages,
  updatedImage,
  loading,
  error,
  id
} from './home.variables';

describe('Homepage actions test', () => {
  it('Should get homepage data', () => {
    expect(getHomePageData()).toEqual({
      type: GET_HOME_PAGE_DATA
    });
  });

  it('Should set homepage data', () => {
    expect(setHomePageData(images)).toEqual({
      type: SET_HOME_PAGE_DATA,
      payload: images
    });
  });

  it('Should update homepage data', () => {
    expect(updateHomePageData(updatedImage)).toEqual({
      type: UPDATE_HOME_PAGE_DATA,
      payload: updatedImage
    });
  });

  it('Should update homepage data in store', () => {
    expect(updateHomePageImagesInStore(id, updatedImages)).toEqual({
      type: UPDATE_HOME_PAGE_DATA_LOCALLY,
      payload: { id, updatedImages }
    });
  });

  it('Should set homepage loading', () => {
    expect(setHomePageDataLoading(loading)).toEqual({
      type: SET_HOME_PAGE_DATA_LOADING,
      payload: loading
    });
  });

  it('Should set homepage error', () => {
    expect(setHomePageDataError(error)).toEqual({
      type: SET_HOME_PAGE_DATA_ERROR,
      payload: error
    });
  });
});
