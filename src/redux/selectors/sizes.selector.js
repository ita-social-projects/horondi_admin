import { createSelector } from 'reselect';
import { selectPagination } from '../table/table.reducer';
import { selectSizes } from '../sizes/sizes.reducer';

export const sizeSelector = createSelector(selectSizes, (size) => size);
export const sizesSelectorWithPagination = createSelector(
  selectSizes,
  selectPagination,
  (size, table) => ({
    ...size,
    ...table
  })
);
