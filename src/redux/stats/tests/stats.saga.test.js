import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';

import { combineReducers } from 'redux';
import {
  handleInitialStatsLoad,
  handleOrdersStatisticLoad,
  handlePaidOrdersLoad,
  handleStatsErrors,
  handleUsersStatisticLoad
} from '../stats.sagas';

import {
  initialState,
  mockCategories,
  mockProducts,
  mockDate,
  mockDoughnutOrders,
  mockPaidOrders,
  mockUsers,
  mockError,
  mockSnackarState
} from './stats.variables';

import {
  getPopularCategories,
  getPopularProducts,
  getOrdersStats,
  getPaidOrdersStats,
  getUsersByDays
} from '../stats.operations';

import {
  setPopularProducts,
  setPopularCategories,
  setStatsLoading,
  setAllOrdersStats,
  setUpdatingBarData,
  setUpdatingDoughnutData,
  setPaidOrdersStats,
  setUsersByDays
} from '../stats.actions';

import {
  setSnackBarSeverity,
  setSnackBarMessage,
  setSnackBarStatus
} from '../../snackbar/snackbar.actions';

import { selectStatsDate } from '../../selectors/stats.selectors';

import Stats from '../stats.reducer';
import Snackbar from '../../snackbar/snackbar.reducer';

describe('Stats saga test', () => {
  it('should load initial stats', () =>
    expectSaga(handleInitialStatsLoad)
      .withReducer(combineReducers({ Stats }), { Stats: initialState })
      .put(setStatsLoading(true))
      .provide([
        [call(getPopularCategories), mockCategories],
        [call(getPopularProducts), mockProducts]
      ])
      .put(setPopularCategories(mockCategories))
      .put(setPopularProducts(mockProducts))
      .put(setStatsLoading(false))
      .hasFinalState({
        Stats: {
          ...initialState,
          doughnut: {
            ...initialState.doughnut,
            categories: mockCategories
          },
          bar: {
            ...initialState.bar,
            products: mockProducts
          }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(4);
      }));

  it('should load orders statistic', () =>
    expectSaga(handleOrdersStatisticLoad)
      .withReducer(combineReducers({ Stats }), { Stats: initialState })
      .put(setUpdatingDoughnutData(true))
      .provide([
        [select(selectStatsDate), mockDate],
        [call(getOrdersStats, mockDate), mockDoughnutOrders]
      ])
      .put(setAllOrdersStats(mockDoughnutOrders))
      .put(setUpdatingDoughnutData(false))
      .hasFinalState({
        Stats: {
          ...initialState,
          doughnut: {
            ...initialState.doughnut,
            orders: mockDoughnutOrders
          }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));

  it('should load paid orders', () =>
    expectSaga(handlePaidOrdersLoad)
      .withReducer(combineReducers({ Stats }), { Stats: initialState })
      .put(setUpdatingBarData(true))
      .provide([
        [select(selectStatsDate), mockDate],
        [call(getPaidOrdersStats, mockDate), mockPaidOrders]
      ])
      .put(setPaidOrdersStats(mockPaidOrders))
      .put(setUpdatingBarData(false))
      .hasFinalState({
        Stats: {
          ...initialState,
          bar: {
            ...initialState.bar,
            orders: mockPaidOrders
          }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));

  it('should load users statistic', () =>
    expectSaga(handleUsersStatisticLoad)
      .withReducer(combineReducers({ Stats }), { Stats: initialState })
      .put(setUpdatingBarData(true))
      .provide([
        [select(selectStatsDate), mockDate],
        [call(getUsersByDays, mockDate), mockUsers]
      ])
      .put(setUsersByDays(mockUsers))
      .put(setUpdatingBarData(false))
      .hasFinalState({
        Stats: {
          ...initialState,
          bar: {
            ...initialState.bar,
            users: mockUsers
          }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));

  it('should handle stats errors', () =>
    expectSaga(handleStatsErrors, mockError)
      .withReducer(combineReducers({ Stats, Snackbar }), {
        Stats: {
          ...initialState,
          loading: true
        },
        Snackbar: mockSnackarState
      })
      .put(setStatsLoading(false))
      .put(setSnackBarSeverity('error'))
      .put(setSnackBarMessage(mockError.message))
      .put(setSnackBarStatus(true))
      .hasFinalState({
        Stats: {
          ...initialState,
          loading: false
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
        expect(analysisPut).toHaveLength(4);
      }));
});
