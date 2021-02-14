import { createSelector } from 'reselect';
import { selectPagination } from '../table/table.reducer';
import { selectSizes } from '../sizes/sizes.reducer';

export const sizesSelectorWithPagination = createSelector(
  selectSizes,
  selectPagination,
  (size, table) => ({
    ...size,
    ...table
  })
);
