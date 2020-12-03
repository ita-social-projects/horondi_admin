import {
  SET_CATEGORIES,
  SET_CATEGORY_LOADING,
  SET_CATEGORY,
  SET_CATEGORY_ERROR,
  SET_CATEGORIES_CURRENT_PAGE,
  SET_CATEGORIES_PER_PAGE,
  SET_CATEGORIES_PAGES_COUNT,
  REMOVE_CATEGORY_FROM_STORE
} from './category.types';

export const initialState = {
  list: [],
  category: null,
  categoryLoading: false,
  categoryError: null,
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
      list: action.payload
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
    const categories = state.list.filter(
      (category) => category._id !== action.payload
    );
    return { ...state, list: categories};

  default:
    return state;
  }
};

export default categoryReducer;
