import {
  SET_BUSINESS_PAGES,
  SET_LOADING,
  SET_BUSINESS_PAGES_ERROR,
  SET_CURRENT_BUSINESS_PAGE
} from './businessPages.types';

const initialState = {
  list: [],
  currentPage: null,
  loading: true,
  error: null
};

const businessPagesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_BUSINESS_PAGES:
    return {
      ...state,
      list: action.payload
    };
  case SET_LOADING:
    return {
      ...state,
      loading: action.payload
    };
  case SET_BUSINESS_PAGES_ERROR:
    return {
      ...state,
      error: action.payload
    };
  case SET_CURRENT_BUSINESS_PAGE:
    return {
      ...state,
      currentPage: action.payload
    };
  default:
    return state;
  }
};

export default businessPagesReducer;
