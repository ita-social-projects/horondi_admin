export const selectUsersAndTable = ({ Users, Table }) => ({
  list: Users.list,
  filter: Users.filters,
  sort: Users.sort,
  currentPage: Table.pagination.currentPage,
  rowsPerPage: Table.pagination.rowsPerPage
});

export const selectUserLoadAndItemsCount = ({ Users, Table }) => ({
  userLoading: Users.userLoading,
  itemsCount: Table.itemsCount
});
