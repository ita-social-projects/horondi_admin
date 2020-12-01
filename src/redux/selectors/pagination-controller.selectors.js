export const TableSelector = ({
  Table: {
    itemsCount,
    pagination: { currentPage, rowsPerPage }
  }
}) => ({
  currentPage,
  itemsCount,
  rowsPerPage
});
