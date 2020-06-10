const initialState = {
  searchValue: '',
  searchTerm: ''
};

const searchState = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.payload
      };

    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload
      };

    default:
      return state;
  }
};

export default searchState;
