const initialState = {
  categories: [],
  category: {},
  catalogsToUpdate: [],
  loading: true
};

const categoriesState = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_STATUS':
      return {
        ...state,
        loading: true
      };

    case 'LOADING_STOP':
      return {
        ...state,
        loading: false
      };

    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.payload,
        loading: false
      };

    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
        loading: false
      };
    case 'UPDATE_CATALOGS':
      return {
        ...state,
        catalogsToUpdate: action.payload
      };
    default:
      return state;
  }
};

export default categoriesState;
