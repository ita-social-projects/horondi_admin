import {
  GET_NEWS,
  SET_NEWS,
  SHOW_LOADER,
  HIDE_LOADER,
  DELETE_NEWS_ITEM,
  ADD_ARTICLE,
  GET_ARTICLE,
  SET_ARTICLE,
  UPDATE_NEWS_ITEM
} from './news.types';

const setNews = (news) => ({
  type: SET_NEWS,
  payload: news
});

const getNews = () => ({
  type: GET_NEWS
});

const deleteArticle = (payload) => ({
  type: DELETE_NEWS_ITEM,
  payload
});

const addArticle = (payload) => ({
  type: ADD_ARTICLE,
  payload
});

const showLoader = () => ({
  type: SHOW_LOADER
});

const hideLoader = () => ({
  type: HIDE_LOADER
});

const updateArticle = (payload) => ({
  type: UPDATE_NEWS_ITEM,
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
  showLoader,
  hideLoader,
  deleteArticle,
  addArticle,
  updateArticle,
  setArticle,
  getArticle
};
