export const ProductsAndTableSelectors = ({
  Products: {
    loading,
    products,
    filters,
    sorting: { sortByPopularity, sortByPrice, sortByRate }
  },
  Table: {
    pagination: { rowsPerPage, currentPage }
  }
}) => ({
  loading,
  products,
  sortByRate,
  sortByPrice,
  filters,
  sortByPopularity,
  rowsPerPage,
  currentPage
});
