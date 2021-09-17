import { createSelector } from 'reselect';
import { selectPagination } from '../table/table.reducer';
import { selectBack } from '../back/back.reducer';

export const backSelector = createSelector(selectBack, (back) => back);

export const backSelectorWithPagination = createSelector(
  selectBack,
  selectPagination,
  (back, table) => ({
    ...back,
    ...table
  })
);
