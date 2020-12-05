import {
  removeSlideFromStore,
  setAvailableSlides,
  setSlide,
  setSlideError,
  setSlideLoading,
  setSlides,
  setSlidesCurrentPage,
  setSlidesDrugAndDropList,
  setSlidesPagesCount,
  setSlidesPerPage
} from '../home-page-slides.actions';

import {
  mockDragAndDropList,
  mockError,
  mockId,
  mockSlide,
  mockSlides,
  mockEmptyDragAndDropList,
  mockNumber
} from './home-page-slide.variables';

import Slides, { initialState } from '../home-page-slides.reducer';

describe('Test home page slides reducer', () => {
  it('should return default state', () => {
    expect(Slides()).toEqual(initialState);
  });

  it('should set slides into state', () => {
    expect(Slides(initialState, setSlides(mockSlides.items))).toEqual({
      ...initialState,
      list: mockSlides.items
    });
  });

  it('should set drag and drop slides into state', () => {
    expect(
      Slides(initialState, setSlidesDrugAndDropList(mockDragAndDropList))
    ).toEqual({
      ...initialState,
      drugAndDropList: mockDragAndDropList
    });
  });

  it('should set slide into state', () => {
    expect(Slides(initialState, setSlide(mockSlide))).toEqual({
      ...initialState,
      slide: mockSlide
    });
  });

  it('should set slide loading into state', () => {
    expect(Slides(initialState, setSlideLoading(true))).toEqual({
      ...initialState,
      slideLoading: true
    });
  });

  it('should set slide error into state', () => {
    expect(Slides(initialState, setSlideError(mockError))).toEqual({
      ...initialState,
      slideError: mockError
    });
  });

  it('should set slides current page into state', () => {
    expect(Slides(initialState, setSlidesCurrentPage(mockNumber))).toEqual({
      ...initialState,
      pagination: {
        ...initialState.pagination,
        currentPage: mockNumber - 1
      }
    });
  });

  it('should set slides per page into state', () => {
    expect(Slides(initialState, setSlidesPerPage(mockNumber))).toEqual({
      ...initialState,
      pagination: {
        ...initialState.pagination,
        slidesPerPage: mockNumber
      }
    });
  });

  it('should set slides pages count into state', () => {
    expect(Slides(initialState, setSlidesPagesCount(mockNumber))).toEqual({
      ...initialState,
      pagination: {
        ...initialState.pagination,
        pagesCount: mockNumber
      }
    });
  });

  it('should set available slides into state', () => {
    expect(Slides(initialState, setAvailableSlides(mockSlides.items))).toEqual({
      ...initialState,
      availableSlides: mockSlides.items
    });
  });

  it('should remove slides from state', () => {
    expect(
      Slides(
        {
          ...initialState,
          list: mockSlides.items,
          drugAndDropList: mockDragAndDropList
        },
        removeSlideFromStore(mockId)
      )
    ).toEqual({
      ...initialState,
      list: [],
      drugAndDropList: mockEmptyDragAndDropList
    });
  });
});
