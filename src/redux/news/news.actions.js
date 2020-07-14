import {
  GET_NEWS,
  SET_NEWS,
  SHOW_LOADER,
  HIDE_LOADER,
  DELETE_NEWS_ITEM,
  ADD_NEWS_ITEM,
  GET_NEWS_ITEM,
  SET_NEWS_ITEM,
  UPDATE_NEWS_ITEM
} from './news.types';

const setNews = (news) => ({
  type: SET_NEWS,
  payload: news
});

const getNews = () => ({
  type: GET_NEWS
});

const deleteNewsItem = (payload) => ({
  type: DELETE_NEWS_ITEM,
  payload
});

const addNewsItem = (payload) => ({
  type: ADD_NEWS_ITEM,
  payload
});

const showLoader = () => ({
  type: SHOW_LOADER
});

const hideLoader = () => ({
  type: HIDE_LOADER
});

const updateNewsItem = (payload) => ({
  type: UPDATE_NEWS_ITEM,
  payload
});

const setNewsItem = (payload) => ({
  type: SET_NEWS_ITEM,
  payload
});

const getNewsItem = (payload) => ({
  type: GET_NEWS_ITEM,
  payload
});

export {
  setNews,
  getNews,
  showLoader,
  hideLoader,
  deleteNewsItem,
  addNewsItem,
  updateNewsItem,
  setNewsItem,
  getNewsItem
};
