const initialState = {
  catalogs: [],
  catalog: '',
  loading: true
};

const catalogsState = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_STATUS':
      return {
        ...state,
        loading: true
      };

    case 'SET_CATALOG':
      return {
        ...state,
        catalog: action.payload,
        loading: false
      };

    case 'SET_CATALOGS':
      return {
        ...state,
        catalogs: action.payload,
        loading: false
      };

    default:
      return state;
  }
};

export default catalogsState;
