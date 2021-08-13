import { createSelector } from 'reselect';
import { selectPagination } from '../table/table.reducer';
import { selectClosures } from '../closures/closures.reducer';

export const closuresSelector = createSelector(
  selectClosures,
  (closures) => closures
);

export const closuresSelectorWithPagination = createSelector(
  closuresSelector,
  selectPagination,
  (closures, table) => ({
    ...closures,
    ...table
  })
);
