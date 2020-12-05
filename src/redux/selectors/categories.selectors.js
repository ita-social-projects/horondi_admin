export const selectCategoriesLoadingDialogOpen = ({ Categories }) => ({
  categories: Categories.categories,
  categoriesLoading: Categories.categoriesLoading,
  isDeleteDialogOpen: Categories.isDeleteDialogOpen
});
