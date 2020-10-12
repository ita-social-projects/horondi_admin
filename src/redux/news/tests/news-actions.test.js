import {
  GET_NEWS,
  SET_NEWS,
  SET_NEWS_LOADING,
  DELETE_ARTICLE,
  ADD_ARTICLE,
  GET_ARTICLE,
  SET_ARTICLE,
  UPDATE_ARTICLE,
  SET_NEWS_ERROR,
  SET_CURRENT_PAGE,
  SET_NEWS_PER_PAGE,
  SET_PAGES_COUNT
} from '../news.types';
import {
  getArticle,
  getNews,
  setCurrentPage,
  setPagesCount,
  setArticle,
  setNews,
  setNewsError,
  setNewsLoading,
  setNewsPerPage,
  updateArticle,
  deleteArticle
} from '../news.actions';
import { newsId } from './news.variables';

describe('news actions tests', () => {
  it('should set current page to 5', () => {
    expect(setCurrentPage(5)).toEqual({ type: SET_CURRENT_PAGE, payload: 5 });
  });
  it('should set news per page to 5', () => {
    expect(setNewsPerPage(5)).toEqual({ type: SET_NEWS_PER_PAGE, payload: 5 });
  });
  it('should set pages count to 5', () => {
    expect(setPagesCount(5)).toEqual({ type: SET_PAGES_COUNT, payload: 5 });
  });
  it('should set news loading to true', () => {
    expect(setNewsLoading(true)).toEqual({
      type: SET_NEWS_LOADING,
      payload: true
    });
  });
  it('should set news error to true', () => {
    expect(setNewsError(true)).toEqual({
      type: SET_NEWS_ERROR,
      payload: true
    });
  });
  it('should get news ', () => {
    expect(setNewsError(true)).toEqual({
      type: SET_NEWS_ERROR,
      payload: true
    });
  });
});
