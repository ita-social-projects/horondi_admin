import ordersReducer, { initialState } from '../orders.reducer';
import {
  setOrder,
  setOrderList,
  setOrderLoading,
  setOrderError
} from '../orders.actions';

describe('orders reducer tests', () => {
  it('should return default state', () => {
    expect(ordersReducer()).toEqual(initialState);
  });

  it('should set order list', () => {
    expect(ordersReducer(initialState, setOrderList(true))).toEqual({
      ...initialState,
      list: true
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
