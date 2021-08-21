import {
  SET_STATS_LOADING,
  SET_POPULAR_CATEGORIES,
  SET_DOUGHNUT_VALUE,
  SET_DATE_VALUE,
  SET_BAR_VALUE,
  SET_POPULAR_PRODUCTS,
  GET_INITIAL_STATS,
  SET_USERS_STATS,
  GET_ALL_ORDERS_STATS,
  SET_ALL_ORDERS_STATS,
  GET_PAID_ORDERS_STATS,
  SET_PAID_ORDERS_STATS,
  SET_UPDATING_BAR_DATA,
  SET_UPDATING_DOGHNUT_DATA,
  GET_USERS_STATS
} from '../../stats/stats.types';

import {
  statsLoading,
  doughnutValue,
  dateValue,
  barValue,
  popularProducts,
  allOrdersStatsSet,
  paidOrdersStatsSet,
  updatingDoughnutData,
  updatingBarData,
  usersByDaysSet,
  popularCategories
} from './stats.variables';

import {
  setPopularCategories,
  setStatsLoading,
  setDoughnutValue,
  setDateValue,
  setBarValue,
  setPopularProducts,
  getIniitalStats,
  getAllOrdersStats,
  setAllOrdersStats,
  getPaidOrdersStats,
  setPaidOrdersStats,
  setUpdatingBarData,
  setUpdatingDoughnutData,
  setUsersByDays,
  getUsersByDays
} from '../../stats/stats.actions';

describe('stats tests', () => {
  it('should set populate categories', () => {
    expect(setPopularCategories(popularCategories)).toEqual({
      type: SET_POPULAR_CATEGORIES,
      payload: popularCategories
    });
  });

  it('should set stats loading', () => {
    expect(setStatsLoading(statsLoading)).toEqual({
      type: SET_STATS_LOADING,
      payload: statsLoading
    });
  });

  it('should set doughnut value', () => {
    expect(setDoughnutValue(doughnutValue)).toEqual({
      type: SET_DOUGHNUT_VALUE,
      payload: doughnutValue
    });
  });

  it('should set date value', () => {
    expect(setDateValue(dateValue)).toEqual({
      type: SET_DATE_VALUE,
      payload: dateValue
    });
  });

  it('should set bar value', () => {
    expect(setBarValue(barValue)).toEqual({
      type: SET_BAR_VALUE,
      payload: barValue
    });
  });

  it('should set popular products', () => {
    expect(setPopularProducts(popularProducts)).toEqual({
      type: SET_POPULAR_PRODUCTS,
      payload: popularProducts
    });
  });

  it('should get initial stats', () => {
    expect(getIniitalStats()).toEqual({
      type: GET_INITIAL_STATS
    });
  });

  it('should get all all orders stats', () => {
    expect(getAllOrdersStats(dateValue)).toEqual({
      type: GET_ALL_ORDERS_STATS,
      payload: dateValue
    });
  });

  it('should set all all orders stats', () => {
    expect(setAllOrdersStats(allOrdersStatsSet)).toEqual({
      type: SET_ALL_ORDERS_STATS,
      payload: allOrdersStatsSet
    });
  });

  it('should get paid order stats ', () => {
    expect(getPaidOrdersStats(dateValue)).toEqual({
      type: GET_PAID_ORDERS_STATS,
      payload: dateValue
    });
  });

  it('should set paid order stats ', () => {
    expect(setPaidOrdersStats(paidOrdersStatsSet)).toEqual({
      type: SET_PAID_ORDERS_STATS,
      payload: paidOrdersStatsSet
    });
  });

  it('should set updating bar data ', () => {
    expect(setUpdatingBarData(updatingBarData)).toEqual({
      type: SET_UPDATING_BAR_DATA,
      payload: updatingBarData
    });
  });

  it('should set updating doughnut data ', () => {
    expect(setUpdatingDoughnutData(updatingDoughnutData)).toEqual({
      type: SET_UPDATING_DOGHNUT_DATA,
      payload: updatingDoughnutData
    });
  });

  it('should set users by days', () => {
    expect(setUsersByDays(usersByDaysSet)).toEqual({
      type: SET_USERS_STATS,
      payload: usersByDaysSet
    });
  });

  it('should get users by days', () => {
    expect(getUsersByDays(dateValue)).toEqual({
      type: GET_USERS_STATS,
      payload: dateValue
    });
  });
});
