const setSearchValue = (newSearchValue) => ({
  type: 'SET_SEARCH_VALUE',
  payload: newSearchValue
});

const setSearchTerm = (newSearchTerm) => ({
  type: 'SET_SEARCH_TERM',
  payload: newSearchTerm
});

export { setSearchValue, setSearchTerm };
