import {
  SET_BUSINESS_PAGES,
  SET_BUSINESS_PAGES_LOADING,
  SET_BUSINESS_PAGES_ERROR,
  SET_CURRENT_BUSINESS_PAGE,
  REMOVE_BUSINESS_PAGE_FROM_STORE
} from './business-pages.types';

export const initialState = {
  list: [],
  currentPage: null,
  loading: false,
  error: null
};

const businessPagesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_BUSINESS_PAGES:
      return {
        ...state,
        list: action.payload
      };
    case SET_BUSINESS_PAGES_LOADING:
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
    case REMOVE_BUSINESS_PAGE_FROM_STORE: {
      const pages = state.list.filter((page) => page._id !== action.payload);
      return {
        ...state,
        list: pages
      };
    }
    default:
      return state;
  }
};

export default businessPagesReducer;
