import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { combineReducers } from 'redux';

import { setItemsCount, updatePagination } from '../../table/table.actions';

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
  mockNewsState,
  mockId,
  mockNewsLoadPayload,
  mockArticle,
  statuses,
  mockError,
  mockFile,
  mockTableState,
  mockAddNewsPayload
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
  setArticle,
  setNewsError,
  removeArticleFromStore
} from '../news.actions';

import {
  handleSuccessSnackbar,
  handleErrorSnackbar
} from '../../snackbar/snackbar.sagas';

import News from '../news.reducer';
import Table from '../../table/table.reducer';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = statuses;

describe('Test news sagas', () => {
  it('should load news', () =>
    expectSaga(handleNewsLoad, { payload: mockNewsLoadPayload })
      .withReducer(combineReducers({ News, Table }), {
        News: mockNewsState,
        Table: mockTableState
      })
      .put(setNewsLoading(true))
      .provide([
        [
          call(
            getAllNews,
            mockNewsLoadPayload.skip,
            mockNewsLoadPayload.limit,
            mockNewsLoadPayload.filter
          ),
          mockNews
        ]
      ])
      .put(setItemsCount(mockNews.count))
      .put(setNews(mockNews.items))
      .put(setNewsLoading(false))
      .hasFinalState({
        News: {
          ...mockNewsState,
          list: mockNews.items
        },
        Table: {
          ...mockTableState,
          itemsCount: mockNews.count
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

  it.skip('should add news', () =>
    expectSaga(handleAddNews, { payload: mockAddNewsPayload })
      .withReducer(combineReducers({ News }), {
        News: mockNewsState
      })
      .put(setNewsLoading(true))
      .provide([
        [
          call(
            createArticle,
            mockAddNewsPayload.article,
            mockAddNewsPayload.upload
          )
        ],
        [call(handleSuccessSnackbar, SUCCESS_ADD_STATUS)]
      ])
      .put(push('/news'))
      .hasFinalState({
        News: {
          ...mockNewsState,
          newsLoading: true
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(2);
      }));

  it.skip('should delete news', () =>
    expectSaga(handleNewsDelete, { payload: mockId })
      .withReducer(combineReducers({ News }), {
        News: {
          ...mockNewsState,
          list: [mockArticle]
        }
      })
      .put(setNewsLoading(true))
      .provide([
        [call(deleteArticle, mockId)],
        [call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS)]
      ])
      .put(removeArticleFromStore(mockId))
      .put(updatePagination())
      .put(setNewsLoading(false))
      .hasFinalState({
        News: {
          ...mockNewsState
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(4);
      }));

  it.skip('should update article', () =>
    expectSaga(handleNewsUpdate, {
      payload: { id: mockId, newArticle: mockArticle, upload: mockFile }
    })
      .withReducer(combineReducers({ News }), {
        News: mockNewsState
      })
      .put(setNewsLoading(true))
      .provide([
        [call(updateArticle, mockId, mockArticle, mockFile)],
        [call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS)]
      ])
      .put(push('/news'))
      .hasFinalState({
        News: {
          ...mockNewsState,
          newsLoading: true
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(2);
      }));

  it('should handle news error', () =>
    expectSaga(handleNewsError, mockError)
      .withReducer(combineReducers({ News }), {
        News: {
          ...mockNewsState,
          newsLoading: true
        }
      })
      .provide([[call(handleErrorSnackbar, mockError.message)]])
      .put(setNewsLoading(false))
      .put(setNewsError({ e: mockError }))
      .hasFinalState({
        News: {
          ...mockNewsState,
          newsLoading: false,
          newsError: { e: mockError }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(2);
      }));
});
