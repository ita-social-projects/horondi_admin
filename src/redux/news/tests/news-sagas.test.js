import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
  handleAddNews,
  handleArticleLoad,
  handleNewsDelete,
  handleNewsError,
  handleNewsLoad,
  handleNewsUpdate
} from '../news.sagas';
import {
  GET_NEWS,
  SET_NEWS_LOADING,
  SET_NEWS_ERROR,
  SET_CURRENT_PAGE,
  SET_NEWS_PER_PAGE,
  SET_PAGES_COUNT,
  ADD_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  GET_ARTICLE
} from '../news.types';
import {
  getAllNews,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
} from '../news.operations';

import {
  setNewsLoading,
  setNews,
  setPagesCount,
  setNewsError,
  setArticle
} from '../news.actions';
import {
  setSnackBarMessage,
  setSnackBarStatus,
  setSnackBarSeverity
} from '../../snackbar/snackbar.actions';

import { article, news, skip, limit, newsId } from './news.variables';

import { config } from '../../../configs';

describe('news sagas tests', () => {
  it('Should not throw error during execution', () => {
    expect(handleAddNews).not.toThrow();
    expect(handleArticleLoad).not.toThrow();
    expect(handleNewsUpdate).not.toThrow();
    expect(handleNewsLoad).not.toThrow();
    expect(handleNewsError).not.toThrow();
    expect(handleNewsDelete).not.toThrow();
  });
  it('Should receive all news and set them to store', () => {
    expectSaga(handleNewsLoad, GET_NEWS)
      .provide([[matchers.call.fn(getAllNews), { skip, limit }]])
      .put(setNewsLoading(true))
      .put(setNews(news))
      .put(setPagesCount(4))
      .put(setNewsLoading(false))
      .run();
  });

  it('Should add new article to database', () => {
    expectSaga(handleAddNews, article)
      .provide([[matchers.call.fn(createArticle), article]])
      .put(setNewsLoading(true))
      .put(setNews(article))
      .put(setNewsLoading(false))
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(config.statuses.SUCCESS_ADD_STATUS))
      .put(setSnackBarStatus(true))
      .run();
  });
  it('Should get one article and set it to store', () => {
    expectSaga(handleArticleLoad, GET_ARTICLE)
      .provide([[matchers.call.fn(setArticle), newsId]])
      .put(setNewsLoading(true))
      .put(setArticle(article))
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(config.statuses.SUCCESS_ADD_STATUS))
      .put(setNewsLoading(false))
      .put(setSnackBarStatus(true))
      .run();
  });
});
