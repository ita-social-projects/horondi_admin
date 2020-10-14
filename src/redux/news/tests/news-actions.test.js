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
  deleteArticle,
  addArticle
} from '../news.actions';
import { newsId, article, news, skip, limit } from './news.variables';

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
  it('should add article ', () => {
    expect(addArticle(article)).toEqual({
      type: ADD_ARTICLE,
      payload: article
    });
  });
  it('should set article ', () => {
    expect(setArticle(article)).toEqual({
      type: SET_ARTICLE,
      payload: article
    });
  });
  it('should get article ', () => {
    expect(getArticle(newsId)).toEqual({
      type: GET_ARTICLE,
      payload: newsId
    });
  });
  it('should update article ', () => {
    expect(
      updateArticle({ id: newsId, article: { ...article, show: false } })
    ).toEqual({
      type: UPDATE_ARTICLE,
      payload: { id: newsId, article: { ...article, show: false } }
    });
  });
  it('should delete article ', () => {
    expect(deleteArticle(newsId)).toEqual({
      type: DELETE_ARTICLE,
      payload: newsId
    });
  });
  it('should get news', () => {
    expect(getNews({ skip, limit })).toEqual({
      type: GET_NEWS,
      payload: { skip, limit }
    });
  });
  it('should set news', () => {
    expect(setNews(news)).toEqual({
      type: SET_NEWS,
      payload: news
    });
  });
});
