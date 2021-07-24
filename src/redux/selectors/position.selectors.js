import { createSelector } from 'reselect';
import { selectPagination } from '../table/table.reducer';
import { selectPositions } from '../position/position.reducer';

export const positionsSelector = createSelector(
  selectPositions,
  (position) => position
);

export const positionsSelectorWithPagination = createSelector(
  positionsSelector,
  selectPagination,
  (position, table) => ({
    ...position,
    ...table
  })
);
