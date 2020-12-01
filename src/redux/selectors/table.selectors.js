export const selectTablePaginationCurrentRows = ({
  Table: {
    itemsCount,
    pagination: { currentPage, rowsPerPage }
  }
}) => ({
  currentPage,
  itemsCount,
  rowsPerPage
});

export const selectTableDense = ({ Table }) => Table.dense;

export const selectTablePaginationCurrentRowsOptions = ({
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
