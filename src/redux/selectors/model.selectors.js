export const selectModelAndTable = ({ Model, Table }) => ({
  list: Model.list,
  loading: Model.modelLoading,
  currentPage: Table.pagination.currentPage,
  rowsPerPage: Table.pagination.rowsPerPage,
  itemsCount: Table.itemsCount
});

export const selectModel = ({ Model }) => ({
  loading: Model.modelLoading,
  model: Model.model
});
