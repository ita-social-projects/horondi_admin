import {
  GET_NEWS,
  SET_NEWS,
  SET_NEWS_LOADING,
  GET_ARTICLE,
  SET_ARTICLE,
  SET_NEWS_ERROR,
  ADD_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE
} from '../../news/news.types';
import {
  getArticle,
  getNews,
  setArticle,
  setNews,
  setNewsError,
  setNewsLoading,
  addArticle,
  updateArticle,
  deleteArticle
} from '../../news/news.actions';
import { mockId, mockArticle, mockNews, skip, limit } from './news.variables';

describe('news actions tests', () => {
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
    expect(addArticle(mockArticle)).toEqual({
      type: ADD_ARTICLE,
      payload: mockArticle
    });
  });
  it('should set article ', () => {
    expect(setArticle(mockArticle)).toEqual({
      type: SET_ARTICLE,
      payload: mockArticle
    });
  });
  it('should get article ', () => {
    expect(getArticle(mockId)).toEqual({
      type: GET_ARTICLE,
      payload: mockId
    });
  });
  it('should update article ', () => {
    expect(
      updateArticle({ id: mockId, article: { ...mockArticle, show: false } })
    ).toEqual({
      type: UPDATE_ARTICLE,
      payload: { id: mockId, article: { ...mockArticle, show: false } }
    });
  });
  it('should delete article ', () => {
    expect(deleteArticle(mockId)).toEqual({
      type: DELETE_ARTICLE,
      payload: mockId
    });
  });
  it('should get news', () => {
    expect(getNews({ skip, limit })).toEqual({
      type: GET_NEWS,
      payload: { skip, limit }
    });
  });
  it('should set news', () => {
    expect(setNews(mockNews)).toEqual({
      type: SET_NEWS,
      payload: mockNews
    });
  });
});
