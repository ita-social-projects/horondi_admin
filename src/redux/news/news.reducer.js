import { SET_NEWS, SET_NEWS_LOADING, SET_ARTICLE } from './news.types';

const initialState = {
  list: [],
  newsArticle: null,
  loading: false
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
      loading: action.payload
    };
  default:
    return state;
  }
};

export default newsReducer;
