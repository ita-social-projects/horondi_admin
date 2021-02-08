import {
  SET_CATEGORIES,
  SET_CATEGORY_LOADING,
  SET_CATEGORY,
  SET_CATEGORY_ERROR,
  REMOVE_CATEGORY_FROM_STORE,
  TOGGLE_CATEGORY_DELETE_DIALOG,
  SET_CATEGORY_DELETE_ID,
  SET_CATEGORY_SWITCH_ID,
  SET_FILTER,
  SET_SORT,
  CLEAR_FILTERS
} from './categories.types';

const initialFilters = {
  search: ''
};

export const initialState = {
  categories: [],
  sort: {
    name: 1
  },
  filters: initialFilters,
  category: null,
  categoryLoading: false,
  categoryError: null,
  isDeleteDialogOpen: false,
  deleteId: null,
  switchId: null
};

const categoryReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_CATEGORIES:
    return {
      ...state,
      categories: action.payload
    };
  case SET_CATEGORY:
    return {
      ...state,
      category: action.payload
    };
  case SET_CATEGORY_LOADING:
    return {
      ...state,
      categoryLoading: action.payload
    };
  case SET_CATEGORY_ERROR:
    return {
      ...state,
      categoryError: action.payload
    };
  case REMOVE_CATEGORY_FROM_STORE:
    const categories = state.categories.filter(
      (category) => category._id !== action.payload
    );
    return { ...state, categories };
  case TOGGLE_CATEGORY_DELETE_DIALOG:
    return {
      ...state,
      isDeleteDialogOpen: !state.isDeleteDialogOpen
    };
  case SET_CATEGORY_DELETE_ID:
    return {
      ...state,
      deleteId: action.payload
    };
  case SET_CATEGORY_SWITCH_ID:
    return {
      ...state,
      switchId: action.payload
    };
  case SET_FILTER:
    return {
      ...state,
      filters: {
        ...state.filters,
        ...action.payload
      }
    };
  case SET_SORT:
    return {
      ...state,
      sort: {
        ...action.payload
      }
    };
  case CLEAR_FILTERS:
    return {
      ...state,
      filters: initialFilters
    };
  default:
    return state;
  }
};

export default categoryReducer;
