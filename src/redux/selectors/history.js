import { createSelector } from 'reselect';

import { selectPagination } from '../table/table.reducer';

export const selectHistory = ({ History }) => ({
  records: History.records,
  filters: History.filters,
  recordItem: History.recordItem,
  recordItemLoading: History.recordItemLoading,
  historyLoading: History.historyLoading
});

export const selectTheme = ({ Theme }) => ({
  darkMode: Theme.darkMode
});

export const historySelector = createSelector(
  selectHistory,
  selectTheme,
  selectPagination,
  (history, theme, table) => ({
    ...history,
    ...theme,
    ...table
  })
);
