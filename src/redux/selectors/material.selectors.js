export const selectMaterialsAndColors = ({ Material, Color }) => ({
  list: Material.list,
  colors: Color.list,
  filter: Material.filter,
  loading: Material.materialLoading,
  pagesCount: Material.pagination.pagesCount,
  currentPage: Material.pagination.currentPage,
  materialsPerPage: Material.pagination.materialsPerPage
});

export const selectMaterialLoading = ({ Material }) => ({
  loading: Material.materialLoading
});
