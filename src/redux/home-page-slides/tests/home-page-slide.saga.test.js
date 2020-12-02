import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { combineReducers } from 'redux';
import {
  handleAddSlide,
  handleAvailableSlides,
  handleSlideDelete,
  handleSlideError,
  handleSlideLoad,
  handleSlideUpdate,
  handleSlidesLoad,
  handleUpdateSlideOrder
} from '../home-page-slides.sagas';

import {
  addSlide,
  removeSlideFromStore,
  setAvailableSlides,
  setSlide,
  setSlideError,
  setSlideLoading,
  setSlides,
  setSlidesDrugAndDropList,
  setSlidesPagesCount
} from '../home-page-slides.actions';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../../snackbar/snackbar.sagas';

import {
  mockGetSlidesPayload,
  mockSlides,
  pageCount,
  mockSlidesState,
  mockEmptyDragAndDropList,
  mockDragAndDropList,
  mockId,
  mockSlide,
  mockError,
  mockSlideUpdate,
  mockSlideToAdd
} from './home-page-slide.variables';

import {
  createSlide,
  deleteSlide,
  getAllAvailableSlides,
  getAllSlides,
  getSlideById,
  updateSlide
} from '../home-page-slides.operations';

import { config } from '../../../configs';

import Slides from '../home-page-slides.reducer';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = config.statuses;

describe('Test home page slider saga', () => {
  it('should load slides', () =>
    expectSaga(handleSlidesLoad, { payload: mockGetSlidesPayload })
      .withReducer(combineReducers({ Slides }), { Slides: mockSlidesState })
      .put(setSlideLoading(true))
      .provide([
        [
          call(
            getAllSlides,
            mockGetSlidesPayload.skip,
            mockGetSlidesPayload.limit
          ),
          mockSlides
        ]
      ])
      .put(setSlidesPagesCount(pageCount))
      .put(setSlides(mockSlides.items))
      .put(setSlideLoading(false))
      .hasFinalState({
        Slides: {
          ...mockSlidesState,
          list: mockSlides.items
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(1);
      }));

  it('should handle available slides', () =>
    expectSaga(handleAvailableSlides)
      .withReducer(combineReducers({ Slides }), { Slides: mockSlidesState })
      .put(setSlideLoading(true))
      .provide([[call(getAllAvailableSlides), mockSlides]])
      .put(setAvailableSlides(mockSlides.items))
      .put(setSlidesDrugAndDropList(mockDragAndDropList))
      .put(setSlideLoading(false))
      .hasFinalState({
        Slides: {
          ...mockSlidesState,
          availableSlides: mockSlides.items,
          drugAndDropList: mockDragAndDropList
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(1);
      }));

  it('should load slide', () =>
    expectSaga(handleSlideLoad, { payload: mockId })
      .withReducer(combineReducers({ Slides }), { Slides: mockSlidesState })
      .put(setSlideLoading(true))
      .provide([[call(getSlideById, mockId), mockSlide]])
      .put(setSlide(mockSlide))
      .put(setSlideLoading(false))
      .hasFinalState({
        Slides: {
          ...mockSlidesState,
          slide: mockSlide
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);
      }));

  it('should add slide', () =>
    expectSaga(handleAddSlide, { payload: mockSlideToAdd })
      .withReducer(combineReducers({ Slides }), { Slides: mockSlidesState })
      .put(setSlideLoading(true))
      .provide([
        [call(createSlide, mockSlideToAdd)],
        [call(handleSuccessSnackbar, SUCCESS_ADD_STATUS)]
      ])
      .put(push(config.routes.pathToHomePageSlides))
      .hasFinalState({
        Slides: {
          ...mockSlidesState,
          slideLoading: true
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(2);
        expect(analysisCall).toHaveLength(2);
      }));

  it('should update slide', () =>
    expectSaga(handleSlideUpdate, { payload: mockSlideUpdate })
      .withReducer(combineReducers({ Slides }), { Slides: mockSlidesState })
      .put(setSlideLoading(true))
      .provide([
        [call(updateSlide, mockSlideUpdate)],
        [call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS)]
      ])
      .put(push(config.routes.pathToHomePageSlides))
      .hasFinalState({
        Slides: {
          ...mockSlidesState,
          slideLoading: true
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisCall).toHaveLength(2);
        expect(analysisPut).toHaveLength(2);
      }));

  it('should update slide order', () =>
    expectSaga(handleUpdateSlideOrder, { payload: mockSlideUpdate })
      .withReducer(combineReducers({ Slides }), { Slides: mockSlidesState })
      .provide([
        [call(updateSlide, mockSlideUpdate)],
        [call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS)]
      ])
      .hasFinalState({
        Slides: mockSlidesState
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisCall).toHaveLength(2);
      }));

  it('should delete slide', () =>
    expectSaga(handleSlideDelete, { payload: mockId })
      .withReducer(combineReducers({ Slides }), {
        Slides: {
          ...mockSlidesState,
          list: mockSlides.items,
          drugAndDropList: mockDragAndDropList
        }
      })
      .put(setSlideLoading(true))
      .provide([
        [call(deleteSlide, mockId)],
        [call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS)]
      ])
      .put(removeSlideFromStore(mockId))
      .put(setSlideLoading(false))
      .hasFinalState({
        Slides: {
          ...mockSlidesState,
          list: [],
          drugAndDropList: mockEmptyDragAndDropList
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisCall).toHaveLength(2);
        expect(analysisPut).toHaveLength(3);
      }));

  it('should handle slide error', () =>
    expectSaga(handleSlideError, mockError)
      .withReducer(combineReducers({ Slides }), {
        Slides: {
          ...mockSlidesState,
          slideLoading: true
        }
      })
      .put(setSlideLoading(false))
      .provide([[call(handleErrorSnackbar, mockError.message)]])
      .put(setSlideError({ e: mockError }))
      .hasFinalState({
        Slides: {
          ...mockSlidesState,
          slideLoading: false,
          slideError: { e: mockError }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisCall).toHaveLength(1);
        expect(analysisPut).toHaveLength(2);
      }));
});
