import {
  setCurrentPage,
  setPagesCount,
  setArticle,
  setNews,
  setNewsError,
  setNewsLoading,
  setNewsPerPage
} from '../news.actions';
import {
  currentPage,
  newsPerPage,
  pagesCount,
  news,
  article
} from './news.variables';
import newsReducer, { initialState } from '../news.reducer';

describe('news reducer tests', () => {
  it('should return default state', () => {
    expect(newsReducer()).toEqual(initialState);
  });
  it('should set pages count to 5', () => {
    expect(newsReducer(initialState, setPagesCount(pagesCount))).toEqual({
      ...initialState,
      pagination: {
        ...initialState.pagination,
        pagesCount
      }
    });
  });
  it('should set news per page to 5', () => {
    expect(newsReducer(initialState, setNewsPerPage(newsPerPage))).toEqual({
      ...initialState,
      pagination: {
        ...initialState.pagination,
        newsPerPage
      }
    });
  });
  it('should set current page to 1', () => {
    expect(newsReducer(initialState, setCurrentPage(currentPage))).toEqual({
      ...initialState,
      pagination: {
        ...initialState.pagination,
        currentPage: currentPage - 1
      }
    });
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
    expect(newsReducer(initialState, setNews(news))).toEqual({
      ...initialState,
      list: news
    });
  });
  it('should set article to store', () => {
    expect(newsReducer(initialState, setArticle(article))).toEqual({
      ...initialState,
      newsArticle: article
    });
  });
});
