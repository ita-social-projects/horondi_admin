import { createSelector } from 'reselect';
import { selectPagination } from '../table/table.reducer';
import { selectCategoriesLoadingDialogOpen } from '../categories/categories.reducer';

export const selectCategorySwitchAndDeleteId = ({ Categories }) => ({
  switchId: Categories.switchId,
  deleteId: Categories.deleteId
});
export const categoriesSelectorWithPagination = createSelector(
  selectCategoriesLoadingDialogOpen,
  selectPagination,
  (category, table) => ({
    ...category,
    ...table
  })
);
