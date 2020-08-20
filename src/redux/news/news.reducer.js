import {
  SET_NEWS,
  SET_NEWS_LOADING,
  SET_ARTICLE,
  SET_NEWS_ERROR,
  SET_CURRENT_PAGE,
  SET_NEWS_PER_PAGE,
  SET_PAGES_COUNT
} from './news.types';

const initialState = {
  list: [],
  newsArticle: null,
  newsLoading: false,
  newsError: null,
  currentPage: 0,
  newsPerPage: 6,
  pagesCount: 1
};

const newsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_NEWS:
    return {
      ...state,
      list: action.payload
    };
  case SET_ARTICLE:
    return {
      ...state,
      newsArticle: action.payload
    };
  case SET_NEWS_LOADING:
    return {
      ...state,
      newsLoading: action.payload
    };
  case SET_NEWS_ERROR:
    return {
      ...state,
      newsError: action.payload
    };
  case SET_CURRENT_PAGE:
    return {
      ...state,
      currentPage: action.payload - 1
    };
  case SET_NEWS_PER_PAGE:
    return {
      ...state,
      newsPerPage: action.payload
    };
  case SET_PAGES_COUNT:
    return {
      ...state,
      pagesCount: action.payload
    };
  default:
    return state;
  }
};

export default newsReducer;
