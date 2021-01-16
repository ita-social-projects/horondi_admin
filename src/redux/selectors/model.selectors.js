export const selectModels = ({ Model }) => ({
  list: Model.list,
  model:Model.model,
  loading: Model.modelLoading,
  pagesCount: Model.pagination.pagesCount,
  currentPage: Model.pagination.currentPage,
  modelsPerPage: Model.pagination.modelsPerPage
});
