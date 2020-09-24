import { config } from '../../configs';
import {
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
  SET_PRODUCT_TO_SEND,
  CLEAR_PRODUCT_TO_SEND,
  SET_PRODUCTS_ERROR,
  SET_PRODUCT_CATEGORIES,
  SET_PRODUCT_OPTIONS,
  SET_MODELS,
  SET_FILES_TO_UPLOAD,
  SET_PRODUCT,
  CLEAR_FILES_TO_UPLOAD,
  SET_FILES_TO_DELETE,
  REMOVE_IMAGES_TO_UPLOAD,
  SET_PRIMARY_IMAGE_TO_UPLOAD
} from './products.types';

const { initialLanguageValues } = config;

export const productModel = {
  name: initialLanguageValues,
  mainMaterial: initialLanguageValues,
  innerMaterial: initialLanguageValues,
  description: initialLanguageValues,
  closure: initialLanguageValues,
  model: initialLanguageValues,
  category: '',
  subcategory: '',
  colors: [],
  pattern: [],
  basePrice: 0,
  strapLengthInCm: 0,
  available: true,
  options: []
};

export const initialState = {
  loading: false,
  currentPage: 0,
  productsPerPage: 9,
  sorting: {
    sortByPrice: 0,
    sortByRate: 0,
    sortByPopularity: -1
  },
  filters: {
    colorsFilter: [],
    patternsFilter: [],
    categoryFilter: [],
    searchFilter: '',
    modelsFilter: []
  },
  filterData: [],
  selectedProduct: productModel,
  productToSend: productModel,
  products: [],
  pagesCount: 1,
  productsError: null,
  filesToDelete: [],
  upload: [],
  primaryImageUpload: null,
  productSpecies: {
    categories: [],
    modelsForSelectedCategory: []
  },
  productOptions: {
    sizes: [],
    bottomMaterials: []
  }
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
      upload: [],
      productToSend: initialState.productToSend
    };
  case SET_PRODUCTS_ERROR:
    return {
      ...state,
      productsError: action.payload
    };
  case SET_PRODUCT_CATEGORIES:
    return {
      ...state,
      productSpecies: {
        ...state.productSpecies,
        categories: action.payload
      }
    };
  case SET_PRODUCT_OPTIONS:
    return {
      ...state,
      productOptions: action.payload
    };
  case SET_MODELS:
    return {
      ...state,
      productSpecies: {
        ...state.productSpecies,
        modelsForSelectedCategory: action.payload
      }
    };
  case SET_FILES_TO_UPLOAD:
    return {
      ...state,
      upload: [...state.upload, ...action.payload]
    };
  case SET_PRODUCT:
    return {
      ...state,
      selectedProduct: action.payload
    };
  case CLEAR_FILES_TO_UPLOAD:
    return {
      ...state,
      upload: []
    };
  case SET_FILES_TO_DELETE: {
    return { ...state, filesToDelete: action.payload };
  }
  case REMOVE_IMAGES_TO_UPLOAD: {
    return {
      ...state,
      upload: state.upload.filter(({ name }) => name !== action.payload)
    };
  }
  case SET_PRIMARY_IMAGE_TO_UPLOAD: {
    return {
      ...state,
      primaryImageUpload: action.payload
    };
  }
  default:
    return state;
  }
};

export default productsReducer;
