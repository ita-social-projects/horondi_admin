import {
  GET_NEWS,
  SET_NEWS,
  SET_LOADING,
  DELETE_ARTICLE,
  ADD_ARTICLE,
  GET_ARTICLE,
  SET_ARTICLE,
  UPDATE_ARTICLE
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

const setLoading = (loading) => ({
  type: SET_LOADING,
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

export {
  setNews,
  getNews,
  setLoading,
  deleteArticle,
  addArticle,
  updateArticle,
  setArticle,
  getArticle
};
