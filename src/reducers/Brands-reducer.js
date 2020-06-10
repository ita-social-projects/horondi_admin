const initialState = {
  brands: [],
  brand: '',
  loading: true
};

const brandsState = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_STATUS':
      return {
        ...state,
        loading: true
      };

    case 'SET_BRAND':
      return {
        ...state,
        brand: action.payload,
        loading: false
      };

    case 'SET_BRANDS':
      return {
        ...state,
        brands: action.payload,
        loading: false
      };

    default:
      return state;
  }
};

export default brandsState;
