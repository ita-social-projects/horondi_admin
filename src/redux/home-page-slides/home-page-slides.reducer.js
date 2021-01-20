import {
  REMOVE_SLIDE_FROM_STORE,
  SET_AVAILABLE_SLIDES,
  SET_SLIDE,
  SET_SLIDE_ERROR,
  SET_SLIDE_LOADING,
  SET_SLIDES,
  SET_DRUG_AND_DROP_SLIDES
} from './home-page-slides.types';

export const initialState = {
  list: [],
  drugAndDropList: [],
  availableSlides: [],
  slide: null,
  slideLoading: false,
  slideError: null,
  editStatus: false
};

const slideReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_SLIDES:
    return {
      ...state,
      list: action.payload
    };
  case SET_DRUG_AND_DROP_SLIDES:
    return {
      ...state,
      drugAndDropList: action.payload
    };
  case SET_SLIDE:
    return {
      ...state,
      slide: action.payload
    };
  case SET_SLIDE_LOADING:
    return {
      ...state,
      slideLoading: action.payload
    };
  case SET_SLIDE_ERROR:
    return {
      ...state,
      slideError: action.payload
    };
  case SET_AVAILABLE_SLIDES:
    return {
      ...state,
      availableSlides: action.payload
    };
  case REMOVE_SLIDE_FROM_STORE:
    const slides = state.list.filter((slide) => slide._id !== action.payload);
    const drugAndDropSlides = state.drugAndDropList.map((el) => {
      el.items = el.items.filter((slide) => slide._id !== action.payload);
      return el;
    });
    return { ...state, list: slides, drugAndDropList: drugAndDropSlides };
  default:
    return state;
  }
};

export default slideReducer;
