import { createSelector } from 'reselect';
import { selectPagination } from '../table/table.reducer';
import { selectBasics } from '../basics/basics.reducer';

export const basicsSelector = createSelector(selectBasics, (basic) => basic);

export const basicsSelectorWithPagination = createSelector(
  selectBasics,
  selectPagination,
  (basics, table) => ({
    ...basics,
    ...table
  })
);
