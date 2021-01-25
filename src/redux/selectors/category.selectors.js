export const selectCategorySwitchAndDeleteId = ({ Categories }) => ({
  switchId: Categories.switchId,
  deleteId: Categories.deleteId
});

export const selectCategoriesLoadingDialogOpen = ({ Categories }) => ({
  categories: Categories.categories,
  categoriesLoading: Categories.categoriesLoading,
  isDeleteDialogOpen: Categories.isDeleteDialogOpen
});
