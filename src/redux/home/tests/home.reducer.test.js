import {
  setHomePageData,
  setHomePageDataLoading,
  updateHomePageImagesInStore,
  setHomePageDataError
} from '../home.actions';

import {
  images,
  updatedImages as updatedPhotos,
  loading,
  error,
  _id,
  invalidId,
  initialState
} from './home.variables';

import homePageReducer from '../home.reducer';

describe('Homepage reducer tests', () => {
  it('Should return initial state', () => {
    expect(homePageReducer()).toEqual(initialState);
  });

  it('Should set homepage data to store', () => {
    expect(homePageReducer(initialState, setHomePageData(images))).toEqual({
      ...initialState,
      photos: images
    });
  });

  it('Should set homepage loading to true', () => {
    expect(
      homePageReducer(initialState, setHomePageDataLoading(loading))
    ).toEqual({
      ...initialState,
      homePageLoading: loading
    });
  });

  it('Should set homepage error', () => {
    expect(homePageReducer(initialState, setHomePageDataError(error))).toEqual({
      ...initialState,
      homePageError: error
    });
  });

  it('Should not update homepage data in store', () => {
    expect(
      homePageReducer(
        initialState,
        updateHomePageImagesInStore(invalidId, updatedPhotos)
      )
    ).toEqual(initialState);
  });

  it('Should update homepage data in store', () => {
    initialState.photos.push({ _id });

    expect(
      homePageReducer(
        initialState,
        updateHomePageImagesInStore(_id, updatedPhotos)
      )
    ).toEqual({
      ...initialState,
      photos: [{ _id }]
    });
  });
});
