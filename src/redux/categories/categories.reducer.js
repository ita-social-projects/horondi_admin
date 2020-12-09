import {
  SET_CATEGORIES,
  SET_CATEGORY_LOADING,
  SET_CATEGORY,
  SET_CATEGORY_ERROR,
  SET_CATEGORIES_CURRENT_PAGE,
  SET_CATEGORIES_PER_PAGE,
  SET_CATEGORIES_PAGES_COUNT,
  REMOVE_CATEGORY_FROM_STORE,
  TOGGLE_CATEGORY_DELETE_DIALOG,
  SET_CATEGORY_DELETE_ID,
  SET_CATEGORY_SWITCH_ID
} from './categories.types';

export const initialState = {
  categories: [],
  category: null,
  categoryLoading: false,
  categoryError: null,
  isDeleteDialogOpen: false,
  deleteId: null,
  switchId: null,
  pagination: {
    currentPage: 0,
    categoriesPerPage: 6,
    pagesCount: 1
  }
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
      categoriesLoading: action.payload
    };
  case SET_CATEGORY_ERROR:
    return {
      ...state,
      categoryError: action.payload
    };
  case SET_CATEGORIES_CURRENT_PAGE:
    return {
      ...state,
      pagination: {
        ...state.pagination,
        currentPage: action.payload - 1
      }
    };
  case SET_CATEGORIES_PER_PAGE:
    return {
      ...state,
      pagination: {
        ...state.pagination,
        categorieSPerPage: action.payload
      }
    };
  case SET_CATEGORIES_PAGES_COUNT:
    return {
      ...state,
      pagination: {
        ...state.pagination,
        pagesCount: action.payload
      }
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
  default:
    return state;
  }
};

export default categoryReducer;
