export const TableSelector = ({
  Table: {
    itemsCount,
    pagination: { currentPage, rowsPerPage, rowsPerPageOptions }
  }
}) => ({
  itemsCount,
  rowsPerPage,
  rowsPerPageOptions,
  currentPage
});
