import {
  SET_CATEGORIES,
  SET_CATEGORIES_LOADING,
  SET_CATEGORIES_ERROR,
  SET_CATEGORY,
  RESET_NEW_CATEGORY
} from './categories.types';
import { config } from '../../configs';

const initialState = {
  categories: [],
  categoriesLoading: false,
  categoriesError: null,
  newCategory: config.templates.categoryTemplate
};

const categoriesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_CATEGORIES:
    return {
      ...state,
      categories: action.payload,
      categoriesLoading: false,
      categoriesError: null
    };
  case SET_CATEGORIES_LOADING:
    return {
      ...state,
      categoriesLoading: action.payload
    };
  case SET_CATEGORIES_ERROR:
    return {
      ...state,
      categoriesError: action.payload,
      categoriesLoading: false
    };
  case SET_CATEGORY:
    return {
      ...state,
      newCategory: {
        ...state.newCategory,
        ...action.payload
      }
    };
  case RESET_NEW_CATEGORY:
    return {
      ...state,
      newCategory: initialState.newCategory
    };
  default:
    return state;
  }
};

export default categoriesReducer;
