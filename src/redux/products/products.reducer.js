import {
  SET_PRODUCT,
  SET_ALL_PRODUCTS,
  SET_ALL_FILTER_DATA,
  SET_SORT_BY_PRICE,
  SET_SORT_BY_DATE,
  SET_SORT_BY_RATE,
  SET_SORT_BY_POPULARITY,
  SET_PRODUCTS_LOADING,
  SET_CATEGORY_FILTER,
  SET_PRICE_FILTER,
  SET_COLORS_FILTER,
  SET_PATTERNS_FILTER,
  SET_MODELS_FILTER,
  SET_SEARCH,
  SET_PRODUCT_LOADING,
  SET_PRODUCT_TO_SEND,
  CLEAR_PRODUCT_TO_SEND,
  SET_PRODUCTS_ERROR
} from './products.types';

export const initialState = {
  productLoading: false,
  loading: true,
  sorting: {
    sortByPrice: 0,
    sortByRate: 0,
    sortByPopularity: -1
  },
  filters: {
    categoryFilter: [],
    modelsFilter: [],
    colorsFilter: [],
    patternsFilter: [],
    searchFilter: ''
  },
  filterData: [],
  selectedroduct: null,
  products: [],
  pagesCount: 1,
  productsError: null
};
const setSort = ({
  sortByPrice = 0,
  sortByRate = 0,
  sortByPopularity = 0
}) => ({
  sortByPrice,
  sortByRate,
  sortByPopularity
});

const productsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_ALL_PRODUCTS:
    return {
      ...state,
      products: action.payload
    };
  case SET_ALL_FILTER_DATA:
    return {
      ...state,
      filterData: action.payload
    };
  case SET_PATTERNS_FILTER:
    return {
      ...state,
      filters: {
        ...state.filters,
        patternsFilter: action.payload
      }
    };
  case SET_COLORS_FILTER:
    return {
      ...state,
      filters: {
        ...state.filters,
        colorsFilter: action.payload
      }
    };
  case SET_PRICE_FILTER:
    return {
      ...state,
      filters: {
        ...state.filters,
        priceFilter: action.payload
      }
    };
  case SET_MODELS_FILTER:
    return {
      ...state,
      filters: {
        ...state.filters,
        modelsFilter: action.payload
      }
    };
  case SET_CATEGORY_FILTER:
    return {
      ...state,
      filters: {
        ...state.filters,
        categoryFilter: action.payload
      }
    };
  case SET_SEARCH:
    return {
      ...state,
      filters: {
        ...state.filters,
        searchFilter: action.payload
      }
    };
  case SET_SORT_BY_PRICE:
    return {
      ...state,
      sorting: { ...setSort({ sortByPrice: action.payload }) }
    };
  case SET_SORT_BY_DATE:
    return {
      ...state,
      sorting: { ...setSort({ sortByDate: action.payload }) }
    };
  case SET_SORT_BY_RATE:
    return {
      ...state,
      sorting: { ...setSort({ sortByRate: action.payload }) }
    };
  case SET_SORT_BY_POPULARITY:
    return {
      ...state,
      sorting: { ...setSort({ sortByPopularity: action.payload }) }
    };
  case SET_PRODUCTS_LOADING:
    return {
      ...state,
      loading: action.payload
    };
  case SET_PRODUCT:
    return {
      ...state,
      product: action.payload
    };
  case SET_PRODUCT_LOADING:
    return {
      ...state,
      productLoading: action.payload
    };
  case SET_PRODUCT_TO_SEND:
    return {
      ...state,
      productToSend: {
        ...state.productToSend,
        ...action.payload
      }
    };
  case CLEAR_PRODUCT_TO_SEND:
    return {
      ...state,
      productToSend: initialState.productToSend
    };
  case SET_PRODUCTS_ERROR:
    return {
      ...state,
      productsError: action.payload
    };
  default:
    return state;
  }
};

export default productsReducer;
