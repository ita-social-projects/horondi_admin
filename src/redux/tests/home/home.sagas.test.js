import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { combineReducers } from 'redux';
import {
  getHomePageLooksImages,
  updateHomePageLooksImage
} from '../../home/home.operations';

import {
  handleHomePageImagesUpdate,
  handleHomePageImagesLoad,
  handleHomePageError
} from '../../home/home.sagas';

import {
  setHomePageData,
  setHomePageDataLoading,
  updateHomePageImagesInStore,
  setHomePageDataError
} from '../../home/home.actions';

import {
  initialState,
  mockImages,
  mockUpdatePayload,
  mockError,
  updatedPhotos,
  effectPutType,
  effectCallType
} from './home.variables';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../../snackbar/snackbar.sagas';

import { config } from '../../../configs';

import Home from '../../home/home.reducer';

const { SUCCESS_UPDATE_STATUS } = config.statuses;

describe('Homapage sagas test', () => {
  it('should load home page images', () =>
    expectSaga(handleHomePageImagesLoad)
      .withReducer(combineReducers({ Home }), { Home: initialState })
      .put(setHomePageDataLoading(true))
      .provide([[call(getHomePageLooksImages), mockImages]])
      .put(setHomePageData(mockImages))
      .put(setHomePageDataLoading(false))
      .hasFinalState({
        Home: {
          ...initialState,
          photos: mockImages
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === effectPutType);
        const analysisCall = analysis.filter((e) => e.type === effectCallType);
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);
      }));

  it('should update home page images', () =>
    expectSaga(handleHomePageImagesUpdate, { payload: mockUpdatePayload })
      .withReducer(combineReducers({ Home }), {
        Home: {
          ...initialState,
          photos: mockImages
        }
      })
      .put(setHomePageDataLoading(true))
      .provide([
        [
          call(
            updateHomePageLooksImage,
            mockUpdatePayload.id,
            mockUpdatePayload.upload
          ),
          updatedPhotos
        ],
        [call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS)]
      ])
      .put(updateHomePageImagesInStore(mockUpdatePayload.id, updatedPhotos))
      .put(setHomePageDataLoading(false))
      .put(push(config.routes.pathToHomePageEdit))
      .hasFinalState({
        Home: {
          ...initialState,
          photos: [{ _id: mockUpdatePayload.id, ...updatedPhotos }]
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === effectPutType);
        const analysisCall = analysis.filter((e) => e.type === effectCallType);
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(2);
      }));

  it('should handle home page error', () =>
    expectSaga(handleHomePageError, mockError)
      .withReducer(combineReducers({ Home }), {
        Home: {
          ...initialState,
          homePageLoading: true
        }
      })
      .put(setHomePageDataLoading(false))
      .provide([[call(handleErrorSnackbar, mockError.message)]])
      .put(setHomePageDataError({ e: mockError }))
      .hasFinalState({
        Home: {
          ...initialState,
          homePageLoading: false,
          homePageError: { e: mockError }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === effectPutType);
        const analysisCall = analysis.filter((e) => e.type === effectCallType);
        expect(analysisPut).toHaveLength(2);
        expect(analysisCall).toHaveLength(1);
      }));
});
