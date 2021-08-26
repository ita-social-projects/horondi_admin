import { createSelector } from 'reselect';
import { selectPagination } from '../table/table.reducer';
import { selectOrderList } from '../orders/orders.reducer';

export const orderSelector = createSelector(selectOrderList, (order) => order);

export const orderSelectorWithPagination = createSelector(
  selectOrderList,
  selectPagination,
  (order, table) => ({
    ...order,
    ...table
  })
);
