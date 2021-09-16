import { createSelector } from 'reselect';
import { selectPagination } from '../table/table.reducer';
import { selectBottom } from '../bottom/bottom.reducer';

export const bottomSelector = createSelector(selectBottom, (bottom) => bottom);

export const bottomSelectorWithPagination = createSelector(
  selectBottom,
  selectPagination,
  (bottom, table) => ({
    ...bottom,
    ...table
  })
);
