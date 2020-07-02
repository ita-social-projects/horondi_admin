const setPagesCount = (newPagesCount) => ({
  type: 'SET_PAGES_COUNT',
  payload: newPagesCount
});

const setRowsPerPage = (newRowsPerPage) => ({
  type: 'SET_ROWS_PER_PAGE',
  payload: newRowsPerPage
});

const setCurrentPage = (newCurrentPage) => ({
  type: 'SET_CURRENT_PAGE',
  payload: newCurrentPage
});

export { setPagesCount, setCurrentPage, setRowsPerPage };
