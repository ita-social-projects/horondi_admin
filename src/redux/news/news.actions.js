import {
  GET_NEWS,
  SET_NEWS,
  SET_NEWS_LOADING,
  DELETE_ARTICLE,
  ADD_ARTICLE,
  GET_ARTICLE,
  SET_ARTICLE,
  UPDATE_ARTICLE,
  SET_NEWS_ERROR
} from './news.types';

const setNews = (news) => ({
  type: SET_NEWS,
  payload: news
});

const getNews = () => ({
  type: GET_NEWS
});

const deleteArticle = (payload) => ({
  type: DELETE_ARTICLE,
  payload
});

const addArticle = (payload) => ({
  type: ADD_ARTICLE,
  payload
});

const setNewsLoading = (loading) => ({
  type: SET_NEWS_LOADING,
  payload: loading
});

const updateArticle = (payload) => ({
  type: UPDATE_ARTICLE,
  payload
});

const setArticle = (payload) => ({
  type: SET_ARTICLE,
  payload
});

const getArticle = (payload) => ({
  type: GET_ARTICLE,
  payload
});

const setNewsError = (error) => ({
  type: SET_NEWS_ERROR,
  payload: error
});

export {
  setNews,
  getNews,
  setNewsLoading,
  deleteArticle,
  addArticle,
  updateArticle,
  setArticle,
  getArticle,
  setNewsError
};
