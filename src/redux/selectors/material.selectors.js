export const selectMaterialAndTable = ({ Material, Table }) => ({
  list: Material.list,
  loading: Material.materialLoading,
  currentPage: Table.pagination.currentPage,
  rowsPerPage: Table.pagination.rowsPerPage,
  itemsCount: Table.itemsCount
});

export const selectMaterial = ({ Material }) => ({
  loading: Material.materialLoading,
  material: Material.material
});
