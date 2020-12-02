import {
  addSlide,
  deleteSlide,
  getAvailableSlides,
  getSlide,
  getSlides,
  removeSlideFromStore,
  setAvailableSlides,
  setSlide,
  setSlideError,
  setSlideLoading,
  setSlides,
  setSlidesCurrentPage,
  setSlidesDrugAndDropList,
  setSlidesPagesCount,
  setSlidesPerPage,
  updateSlide,
  updateSlidesOrder
} from '../home-page-slides.actions';

import {
  ADD_SLIDE,
  DELETE_SLIDE,
  GET_AVAILABLE_SLIDES,
  GET_SLIDE,
  GET_SLIDES,
  REMOVE_SLIDE_FROM_STORE,
  SET_AVAILABLE_SLIDES,
  SET_SLIDE,
  SET_SLIDE_ERROR,
  SET_SLIDE_LOADING,
  SET_SLIDES,
  SET_SLIDES_CURRENT_PAGE,
  SET_DRUG_AND_DROP_SLIDES,
  SET_SLIDES_PAGES_COUNT,
  SET_SLIDES_PER_PAGE,
  UPDATE_SLIDE,
  UPDATE_SLIDES_ORDER
} from '../home-page-slides.types';

import {
  mockSlides,
  mockSlide,
  mockId,
  mockGetSlidesPayload,
  mockError,
  mockDragAndDropList,
  mockSlideUpdate
} from './home-page-slide.variables';

describe('Test home page slide actions', () => {
  it('should set slides', () => {
    expect(setSlides(mockSlides.items)).toEqual({
      type: SET_SLIDES,
      payload: mockSlides.items
    });
  });

  it('should set slides current page', () => {
    expect(setSlidesCurrentPage(2)).toEqual({
      type: SET_SLIDES_CURRENT_PAGE,
      payload: 2
    });
  });

  it('should set slides per page', () => {
    expect(setSlidesPerPage(2)).toEqual({
      type: SET_SLIDES_PER_PAGE,
      payload: 2
    });
  });

  it('should set slides pages count', () => {
    expect(setSlidesPagesCount(2)).toEqual({
      type: SET_SLIDES_PAGES_COUNT,
      payload: 2
    });
  });

  it('should get slides', () => {
    expect(getSlides(mockGetSlidesPayload)).toEqual({
      type: GET_SLIDES,
      payload: mockGetSlidesPayload
    });
  });

  it('should set slide loading', () => {
    expect(setSlideLoading(true)).toEqual({
      type: SET_SLIDE_LOADING,
      payload: true
    });
  });

  it('should set slide error', () => {
    expect(setSlideError(mockError)).toEqual({
      type: SET_SLIDE_ERROR,
      payload: mockError
    });
  });

  it('should set slide drub and drop list', () => {
    expect(setSlidesDrugAndDropList(mockDragAndDropList)).toEqual({
      type: SET_DRUG_AND_DROP_SLIDES,
      payload: mockDragAndDropList
    });
  });

  it('should add slide', () => {
    expect(addSlide(mockSlide)).toEqual({
      type: ADD_SLIDE,
      payload: mockSlide
    });
  });

  it('should set available slide', () => {
    expect(setAvailableSlides(mockSlides.items)).toEqual({
      type: SET_AVAILABLE_SLIDES,
      payload: mockSlides.items
    });
  });

  it('should get available slide', () => {
    expect(getAvailableSlides()).toEqual({
      type: GET_AVAILABLE_SLIDES
    });
  });

  it('should update slide', () => {
    expect(updateSlide(mockSlideUpdate)).toEqual({
      type: UPDATE_SLIDE,
      payload: mockSlideUpdate
    });
  });

  it('should get slide by id', () => {
    expect(getSlide(mockId)).toEqual({
      type: GET_SLIDE,
      payload: mockId
    });
  });

  it('should set slide', () => {
    expect(setSlide(mockSlide)).toEqual({
      type: SET_SLIDE,
      payload: mockSlide
    });
  });

  it('should delete slide', () => {
    expect(deleteSlide(mockId)).toEqual({
      type: DELETE_SLIDE,
      payload: mockId
    });
  });

  it('should remove slide from store', () => {
    expect(removeSlideFromStore(mockId)).toEqual({
      type: REMOVE_SLIDE_FROM_STORE,
      payload: mockId
    });
  });

  it('should update slides order', () => {
    expect(updateSlidesOrder(mockSlideUpdate)).toEqual({
      type: UPDATE_SLIDES_ORDER,
      payload: mockSlideUpdate
    });
  });
});
