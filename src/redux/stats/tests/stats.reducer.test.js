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

import statsReducer from '../stats.reducer';

describe('stats reducer tests', () => {
  it('should return default state', () => {
    expect(statsReducer(initialState)).toEqual(initialState);
  });

  it('it should set popular categories to store', () => {
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

  it('it should set stats loading', () => {
    expect(statsReducer(initialState, setStatsLoading(statsLoading))).toEqual({
      ...initialState,
      loading: statsLoading
    });
  });

  it('it should set doughnut value', () => {
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

  it('it should set date value', () => {
    expect(statsReducer(initialState, setDateValue(dateValue))).toEqual({
      ...initialState,
      date: dateValue
    });
  });

  it('it should set bar value', () => {
    expect(statsReducer(initialState, setBarValue(barValue))).toEqual({
      ...initialState,
      bar: {
        ...initialState.bar,
        selectedValue: barValue
      }
    });
  });

  it('it should set popular products', () => {
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

  it('it should set all orders stats', () => {
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

  it('it should set paid orders stats', () => {
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

  it('it should set updating bar data', () => {
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

  it('it should set updating doughnut data', () => {
    console.log('hello');
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

  it('it should set users stats', () => {
    expect(statsReducer(initialState, setUsersByDays(usersByDaysSet))).toEqual({
      ...initialState,
      bar: {
        ...initialState.bar,
        users: usersByDaysSet
      }
    });
  });
});
