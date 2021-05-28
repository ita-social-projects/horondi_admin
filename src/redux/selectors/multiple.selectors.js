export const selectProductsAndTable = ({
  Products: { loading, products, filters, sort },
  Table: {
    pagination: { rowsPerPage, currentPage },
    itemsCount
  }
}) => ({
  loading,
  products,
  sort,
  filters,
  rowsPerPage,
  currentPage,
  itemsCount
});
