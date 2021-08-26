import ordersReducer, { initialState } from '../orders.reducer';
import {
  setOrder,
  setOrderList,
  setOrderListUser,
  setOrderLoading,
  setOrderError,
  clearOrderFiltersUser,
  setOrderFilterUser
} from '../orders.actions';
import { ordersByUser, initFilters, filter } from './orders.variables';

describe('orders reducer tests', () => {
  it('should return default state', () => {
    expect(ordersReducer(initialState)).toEqual(initialState);
  });

  it('should set order list', () => {
    expect(ordersReducer(initialState, setOrderList(true))).toEqual({
      ...initialState,
      list: true
    });
  });

  it('should set user order list', () => {
    expect(
      ordersReducer(initialState, setOrderListUser(ordersByUser.items))
    ).toEqual({
      ...initialState,
      listUser: ordersByUser.items
    });
  });

  it('should clear user filters', () => {
    expect(ordersReducer(initialState, clearOrderFiltersUser())).toEqual({
      ...initialState,
      filtersUser: initFilters,
      sortLabel: '',
      sort: {}
    });
  });

  it('should update user filters', () => {
    expect(ordersReducer(initialState, setOrderFilterUser(filter))).toEqual({
      ...initialState,
      filtersUser: {
        ...initialState.filtersUser,
        ...filter
      }
    });
  });

  it('should set order', () => {
    expect(ordersReducer(initialState, setOrder(true))).toEqual({
      ...initialState,
      selectedOrder: true
    });
  });

  it('should set order loading', () => {
    expect(ordersReducer(initialState, setOrderLoading(false))).toEqual({
      ...initialState,
      orderLoading: false
    });
  });

  it('should set order erorr', () => {
    expect(ordersReducer(initialState, setOrderError(true))).toEqual({
      ...initialState,
      orderError: true
    });
  });
});
