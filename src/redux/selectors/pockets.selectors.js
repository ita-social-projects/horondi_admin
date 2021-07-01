import { createSelector } from 'reselect';
import { selectPagination } from '../table/table.reducer';
import { selectPockets } from '../pockets/pockets.reducer';

export const pocketsSelector = createSelector(
  selectPockets,
  (pockets) => pockets
);

export const pocketsSelectorWithPagination = createSelector(
  pocketsSelector,
  selectPagination,
  (pockets, table) => ({
    ...pockets,
    ...table
  })
);
