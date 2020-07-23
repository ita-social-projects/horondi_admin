import {
  SET_NEWS,
  SET_NEWS_LOADING,
  SET_ARTICLE,
  SET_NEWS_ERROR
} from './news.types';

const initialState = {
  list: [],
  newsArticle: null,
  newsLoading: false,
  newsError: null
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
  default:
    return state;
  }
};

export default newsReducer;
