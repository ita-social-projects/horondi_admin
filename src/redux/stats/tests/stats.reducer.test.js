import {
  setPopularCategories,
  setStatsLoading,
  setDoughnutValue,
  setDateValue,
  setBarValue,
  setPopularProducts,
  setAllOrdersStats,
  setPaidOrdersStats,
  setUpdatingBarData,
  setUpdatingDoughnutData,
  setUsersByDays
} from '../stats.actions';

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
  popularCategories,
  initialState
} from './stats.variables';

import { statsReducer } from '../stats.reducer';

describe('stats reducer tests', () => {
  it('should return default state', () => {
    expect(statsReducer(initialState)).toEqual(initialState);
  });

  it('should set popular categories to store', () => {
    expect(
      statsReducer(initialState, setPopularCategories(popularCategories))
    ).toEqual({
      ...initialState,
      doughnut: {
        ...initialState.doughnut,
        categories: popularCategories
      }
    });
  });

  it('should set stats loading', () => {
    expect(statsReducer(initialState, setStatsLoading(statsLoading))).toEqual({
      ...initialState,
      loading: statsLoading
    });
  });

  it('should set doughnut value', () => {
    expect(statsReducer(initialState, setDoughnutValue(doughnutValue))).toEqual(
      {
        ...initialState,
        doughnut: {
          ...initialState.doughnut,
          selectedValue: doughnutValue
        }
      }
    );
  });

  it('should set date value', () => {
    expect(statsReducer(initialState, setDateValue(dateValue))).toEqual({
      ...initialState,
      date: dateValue
    });
  });

  it('should set bar value', () => {
    expect(statsReducer(initialState, setBarValue(barValue))).toEqual({
      ...initialState,
      bar: {
        ...initialState.bar,
        selectedValue: barValue
      }
    });
  });

  it('should set popular products', () => {
    expect(
      statsReducer(initialState, setPopularProducts(popularProducts))
    ).toEqual({
      ...initialState,
      bar: {
        ...initialState.bar,
        products: popularProducts
      }
    });
  });

  it('should set all orders stats', () => {
    expect(
      statsReducer(initialState, setAllOrdersStats(allOrdersStatsSet))
    ).toEqual({
      ...initialState,
      doughnut: {
        ...initialState.doughnut,
        orders: allOrdersStatsSet
      }
    });
  });

  it('should set paid orders stats', () => {
    expect(
      statsReducer(initialState, setPaidOrdersStats(paidOrdersStatsSet))
    ).toEqual({
      ...initialState,
      bar: {
        ...initialState.bar,
        orders: paidOrdersStatsSet
      }
    });
  });

  it('should set updating bar data', () => {
    expect(
      statsReducer(initialState, setUpdatingBarData(updatingBarData))
    ).toEqual({
      ...initialState,
      bar: {
        ...initialState.bar,
        updatingData: updatingBarData
      }
    });
  });

  it('should set updating doughnut data', () => {
    expect(
      statsReducer(initialState, setUpdatingDoughnutData(updatingDoughnutData))
    ).toEqual({
      ...initialState,
      doughnut: {
        ...initialState.doughnut,
        updatingData: updatingDoughnutData
      }
    });
  });

  it('should set users stats', () => {
    expect(statsReducer(initialState, setUsersByDays(usersByDaysSet))).toEqual({
      ...initialState,
      bar: {
        ...initialState.bar,
        users: usersByDaysSet
      }
    });
  });
});
