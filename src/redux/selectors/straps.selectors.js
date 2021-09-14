import { createSelector } from 'reselect';
import { selectPagination } from '../table/table.reducer';
import { selectStraps } from '../straps/straps.reducer';

export const strapsSelector = createSelector(selectStraps, (straps) => straps);

export const strapsSelectorWithPagination = createSelector(
  strapsSelector,
  selectPagination,
  (straps, table) => ({
    ...straps,
    ...table
  })
);
