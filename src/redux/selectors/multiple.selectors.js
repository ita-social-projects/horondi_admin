export const selectProductsAndTable = ({
  Products: {
    loading,
    products,
    filters,
    sorting: { sortByPopularity, sortByPrice, sortByRate }
  },
  Table: {
    pagination: { rowsPerPage, currentPage },
    itemsCount
  }
}) => ({
  loading,
  products,
  sortByRate,
  sortByPrice,
  filters,
  sortByPopularity,
  rowsPerPage,
  currentPage,
  itemsCount
});
