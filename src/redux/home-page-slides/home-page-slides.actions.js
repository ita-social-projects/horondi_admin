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
  SET_DRUG_AND_DROP_SLIDES,
  UPDATE_SLIDE,
  UPDATE_SLIDES_ORDER
} from './home-page-slides.types';

export const setSlides = (payload) => ({
  type: SET_SLIDES,
  payload
});

export const getSlides = (payload) => ({
  type: GET_SLIDES,
  payload
});

export const setSlideLoading = (payload) => ({
  type: SET_SLIDE_LOADING,
  payload
});

export const setSlideError = (payload) => ({
  type: SET_SLIDE_ERROR,
  payload
});

export const setSlidesDrugAndDropList = (payload) => ({
  type: SET_DRUG_AND_DROP_SLIDES,
  payload
});

export const addSlide = (payload) => ({
  type: ADD_SLIDE,
  payload
});

export const setAvailableSlides = (payload) => ({
  type: SET_AVAILABLE_SLIDES,
  payload
});

export const getAvailableSlides = () => ({
  type: GET_AVAILABLE_SLIDES
});

export const updateSlide = (payload) => ({
  type: UPDATE_SLIDE,
  payload
});

export const getSlide = (payload) => ({
  type: GET_SLIDE,
  payload
});

export const setSlide = (payload) => ({
  type: SET_SLIDE,
  payload
});

export const deleteSlide = (payload) => ({
  type: DELETE_SLIDE,
  payload
});

export const removeSlideFromStore = (payload) => ({
  type: REMOVE_SLIDE_FROM_STORE,
  payload
});

export const updateSlidesOrder = (payload) => ({
  type: UPDATE_SLIDES_ORDER,
  payload
});
