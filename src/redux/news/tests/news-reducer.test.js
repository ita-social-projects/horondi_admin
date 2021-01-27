import {
  setArticle,
  setNews,
  setNewsError,
  setNewsLoading
} from '../news.actions';
import { mockNews, mockArticle } from './news.variables';
import newsReducer, { initialState } from '../news.reducer';

describe('news reducer tests', () => {
  it('should return default state', () => {
    expect(newsReducer()).toEqual(initialState);
  });

  it('should set news error to true', () => {
    expect(newsReducer(initialState, setNewsError(true))).toEqual({
      ...initialState,
      newsError: true
    });
  });
  it('should set news loading to true', () => {
    expect(newsReducer(initialState, setNewsLoading(true))).toEqual({
      ...initialState,
      newsLoading: true
    });
  });
  it('should set news to store', () => {
    expect(newsReducer(initialState, setNews(mockNews))).toEqual({
      ...initialState,
      list: mockNews
    });
  });
  it('should set article to store', () => {
    expect(newsReducer(initialState, setArticle(mockArticle))).toEqual({
      ...initialState,
      newsArticle: mockArticle
    });
  });
});
