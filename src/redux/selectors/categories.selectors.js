export const CategoriesPageSelector = ({ Categories }) => ({
  categories: Categories.categories,
  categoriesLoading: Categories.categoriesLoading,
  isDeleteDialogOpen: Categories.isDeleteDialogOpen
});
