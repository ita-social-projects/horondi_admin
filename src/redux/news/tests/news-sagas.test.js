import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { combineReducers } from 'redux';
import {
  handleAddNews,
  handleArticleLoad,
  handleNewsLoad,
  handleNewsDelete,
  handleNewsError,
  handleNewsUpdate
} from '../news.sagas';

import {
  mockNews,
  mockSnackbarState,
  mockNewsState,
  mockId,
  mockNewsLoadPayload,
  mockArticle,
  pagesCount,
  statuses,
  mockError,
  mockFile
} from './news.variables';

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
  setArticle,
  setCurrentPage,
  setNewsError
} from '../news.actions';

import {
  setSnackBarMessage,
  setSnackBarStatus,
  setSnackBarSeverity
} from '../../snackbar/snackbar.actions';

import News from '../news.reducer';
import Snackbar from '../../snackbar/snackbar.reducer';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = statuses;

describe('Test news sagas', () => {
  it('should load news', () =>
    expectSaga(handleNewsLoad, { payload: mockNewsLoadPayload })
      .withReducer(combineReducers({ News }), { News: mockNewsState })
      .put(setNewsLoading(true))
      .provide([
        [
          call(getAllNews, mockNewsLoadPayload.skip, mockNewsLoadPayload.limit),
          mockNews
        ]
      ])
      .put(setPagesCount(pagesCount))
      .put(setNews(mockNews.items))
      .put(setNewsLoading(false))
      .hasFinalState({
        News: {
          ...mockNewsState,
          pagination: {
            ...mockNewsState.pagination,
            pagesCount
          },
          list: mockNews.items
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(4);
      }));

  it('should load article by id', () =>
    expectSaga(handleArticleLoad, { payload: mockId })
      .withReducer(combineReducers({ News }), { News: mockNewsState })
      .put(setNewsLoading(true))
      .provide([[call(getArticleById, mockId), mockArticle]])
      .put(setArticle(mockArticle))
      .put(setNewsLoading(false))
      .hasFinalState({
        News: {
          ...mockNewsState,
          newsArticle: mockArticle
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));

  it('should add news', () =>
    expectSaga(handleAddNews, {
      payload: { article: mockArticle, upload: mockFile }
    })
      .withReducer(combineReducers({ News, Snackbar }), {
        News: mockNewsState,
        Snackbar: mockSnackbarState
      })
      .put(setNewsLoading(true))
      .provide([[call(createArticle, mockArticle, mockFile)]])
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(SUCCESS_ADD_STATUS))
      .put(setSnackBarStatus(true))
      .put(push('/news'))
      .hasFinalState({
        News: {
          ...mockNewsState,
          newsLoading: true
        },
        Snackbar: {
          snackBarStatus: true,
          snackBarSeverity: 'success',
          snackBarMessage: SUCCESS_ADD_STATUS
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(5);
      }));

  it('should delete news', () =>
    expectSaga(handleNewsDelete, { payload: mockId })
      .withReducer(combineReducers({ News, Snackbar }), {
        News: {
          ...mockNewsState,
          pagination: {
            ...mockNewsState.pagination,
            currentPage: 5
          }
        },
        Snackbar: mockSnackbarState
      })
      .put(setNewsLoading(true))
      .provide([[call(deleteArticle, mockId)]])
      .put(setCurrentPage(1))
      .put(setNewsLoading(false))
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(SUCCESS_DELETE_STATUS))
      .put(setSnackBarStatus(true))
      .hasFinalState({
        News: {
          ...mockNewsState,
          pagination: {
            ...mockNewsState.pagination,
            currentPage: 0
          }
        },
        Snackbar: {
          snackBarStatus: true,
          snackBarSeverity: 'success',
          snackBarMessage: SUCCESS_DELETE_STATUS
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(6);
      }));

  it('should update article', () =>
    expectSaga(handleNewsUpdate, {
      payload: { id: mockId, newArticle: mockArticle, upload: mockFile }
    })
      .withReducer(combineReducers({ News, Snackbar }), {
        News: mockNewsState,
        Snackbar: mockSnackbarState
      })
      .put(setNewsLoading(true))
      .provide([[call(updateArticle, mockId, mockArticle, mockFile)]])
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(SUCCESS_UPDATE_STATUS))
      .put(setSnackBarStatus(true))
      .put(push('/news'))
      .hasFinalState({
        News: {
          ...mockNewsState,
          newsLoading: true
        },
        Snackbar: {
          snackBarStatus: true,
          snackBarSeverity: 'success',
          snackBarMessage: SUCCESS_UPDATE_STATUS
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(5);
      }));

  it('should handle news error', () =>
    expectSaga(handleNewsError, mockError)
      .withReducer(combineReducers({ News, Snackbar }), {
        News: {
          ...mockNewsState,
          newsLoading: true
        },
        Snackbar: mockSnackbarState
      })
      .put(setNewsLoading(false))
      .put(setNewsError({ e: mockError }))
      .put(setSnackBarSeverity('error'))
      .put(setSnackBarMessage(mockError.message))
      .put(setSnackBarStatus(true))
      .hasFinalState({
        News: {
          ...mockNewsState,
          newsLoading: false,
          newsError: { e: mockError }
        },
        Snackbar: {
          snackBarStatus: true,
          snackBarSeverity: 'error',
          snackBarMessage: mockError.message
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(5);
      }));
});
