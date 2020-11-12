import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
  getHomePageLooksImages,
  updateHomePageLooksImage
} from '../home.operations';

import {
  handleHomePageImagesUpdate,
  handleHomePageImagesLoad,
  handleHomePageError
} from '../home.sagas';

import {
  setHomePageData,
  setHomePageDataLoading,
  updateHomePageImagesInStore,
  setHomePageDataError
} from '../home.actions';

import {
  looksImageUpdateMock,
  looksImagesMock,
  updatedImages,
  _id,
  images,
  error
} from './home.variables';

import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../../snackbar/snackbar.actions';

describe('Homapage sagas test', () => {
  it('Should not throw error', () => {
    expect(getHomePageLooksImages).not.toThrow();
    expect(updateHomePageLooksImage).not.toThrow();
    expect(setHomePageData).not.toThrow();
    expect(setHomePageDataLoading).not.toThrow();
    expect(updateHomePageImagesInStore).not.toThrow();
    expect(setHomePageDataError).not.toThrow();
  });

  it('Should receive all looks images and set to store', () => {
    expectSaga(handleHomePageImagesLoad)
      .provide([[matchers.call.fn(getHomePageLooksImages), looksImagesMock]])
      .put(setHomePageDataLoading(true))
      .put(setHomePageData(looksImagesMock))
      .put(setHomePageDataLoading(false))
      .run();
  });

  it('Should update looks image in db, store', () => {
    expectSaga(handleHomePageImagesUpdate, { id: _id, upload: images })
      .provide([
        [matchers.call.fn(updateHomePageLooksImage), looksImageUpdateMock]
      ])
      .put(setHomePageDataLoading(true))
      .put(updateHomePageImagesInStore(_id, updatedImages))
      .put(setHomePageDataLoading(false))
      .run();
  });

  it('Should throw snackbar error', () => {
    expectSaga(handleHomePageError, !error)
      .put(setHomePageDataLoading(true))
      .put(setHomePageDataError({ error }))
      .put(setSnackBarSeverity('error'))
      .put(setSnackBarMessage(error.message))
      .put(setSnackBarStatus(true))
      .put(setHomePageDataLoading(false))
      .run();
  });
});
