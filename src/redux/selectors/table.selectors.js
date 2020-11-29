export const PaginationControllerSelector = ({
  Table: {
    itemsCount,
    pagination: { currentPage, rowsPerPage }
  }
}) => ({
  currentPage,
  itemsCount,
  rowsPerPage
});

export const TableDenseSelector = ({ Table }) => Table.dense;

export const TablePaginationSelector = ({
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
