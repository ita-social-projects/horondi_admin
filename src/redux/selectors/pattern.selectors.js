export const selectPatternAndTable = ({ Pattern, Table }) => ({
  list: Pattern.list,
  loading: Pattern.patternLoading,
  currentPage: Table.pagination.currentPage,
  rowsPerPage: Table.pagination.rowsPerPage,
  itemsCount: Table.itemsCount
});

export const selectPattern = ({ Pattern }) => ({
  loading: Pattern.patternLoading,
  pattern: Pattern.pattern
});
