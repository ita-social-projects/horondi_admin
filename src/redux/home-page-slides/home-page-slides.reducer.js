import {
  REMOVE_SLIDE_FROM_STORE,
  SET_AVAILABLE_SLIDES,
  SET_SLIDE,
  SET_SLIDE_ERROR,
  SET_SLIDE_LOADING,
  SET_SLIDES,
  SET_SLIDES_CURRENT_PAGE,
  SET_DRUG_AND_DROP_SLIDES,
  SET_SLIDES_PAGES_COUNT,
  SET_SLIDES_PER_PAGE
} from './home-page-slides.types';

export const initialState = {
  list: [],
  drugAndDropList: [],
  availableSlides: [],
  slide: null,
  slideLoading: false,
  slideError: null,
  pagination: {
    currentPage: 0,
    slidesPerPage: 4,
    pagesCount: 1
  },
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
  case SET_SLIDES_CURRENT_PAGE:
    return {
      ...state,
      pagination: {
        ...state.pagination,
        currentPage: action.payload - 1
      }
    };
  case SET_SLIDES_PER_PAGE:
    return {
      ...state,
      pagination: {
        ...state.pagination,
        slidesPerPage: action.payload
      }
    };
  case SET_SLIDES_PAGES_COUNT:
    return {
      ...state,
      pagination: {
        ...state.pagination,
        pagesCount: action.payload
      }
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
