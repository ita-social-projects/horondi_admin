import { createSelector } from 'reselect';
import { selectPagination } from '../table/table.reducer';
import { selectPattern } from '../pattern/pattern.reducer';

export const patternSelector = createSelector(
  selectPattern,
  (pattern) => pattern
);

export const patternSelectorWithPagination = createSelector(
  selectPattern,
  selectPagination,
  (pattern, table) => ({
    ...pattern,
    ...table
  })
);
