import { createSelector } from 'reselect';

import { selectPagination } from '../table/table.reducer';

export const selectHistory = ({ History }) => ({
  records: History.records,
  historyLoading: History.historyLoading
});

export const historySelector = createSelector(
  selectHistory,
  selectPagination,
  (history, table) => ({
    ...history,
    ...table
  })
);
