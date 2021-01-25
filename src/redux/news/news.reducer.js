import {
  SET_NEWS,
  SET_NEWS_LOADING,
  SET_ARTICLE,
  SET_NEWS_ERROR,
  REMOVE_ARTICLE_FROM_STORE
} from './news.types';

export const selectNews = ({ News }) => ({
  list: News.list,
  loading: News.newsLoading,
  newsArticle: News.newsArticle
});

export const initialState = {
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
  case REMOVE_ARTICLE_FROM_STORE:
    const articles = state.list.filter(
      (article) => article._id !== action.payload
    );
    return { ...state, list: articles };
  default:
    return state;
  }
};

export default newsReducer;
