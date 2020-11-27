import {
  SET_CATEGORIES,
  SET_CATEGORIES_LOADING,
  SET_CATEGORIES_ERROR,
  SET_CATEGORY,
  RESET_NEW_CATEGORY,
  TOGGLE_CATEGORY_DELETE_DIALOG,
  SET_CATEGORY_DELETE_ID,
  SET_CATEGORY_SWITCH_ID
} from './categories.types';
import { config } from '../../configs';

export const initialState = {
  categories: [],
  categoriesLoading: false,
  categoriesError: null,
  newCategory: config.templates.categoryTemplate,
  isDeleteDialogOpen: false,
  deleteId: null,
  switchId: null
};

export const categoriesReducer = (state = initialState, action = {}) => {
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

export default categoriesReducer;
