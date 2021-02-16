export const selectCategorySwitchAndDeleteId = ({ Categories }) => ({
  switchId: Categories.switchId,
  deleteId: Categories.deleteId
});

export const selectCategoriesLoadingDialogOpen = ({ Categories, Table }) => ({
  categories: Categories.categories,
  categoriesLoading: Categories.categoriesLoading,
  isDeleteDialogOpen: Categories.isDeleteDialogOpen,
  filter: Categories.filters,
  sort: Categories.sort,
  currentPage: Table.pagination.currentPage,
  rowsPerPage: Table.pagination.rowsPerPage
});
