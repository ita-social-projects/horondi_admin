import {
  SET_MATERIAL,
  SET_MATERIALS,
  SET_MATERIALS_PAGES_COUNT,
  SET_MATERIALS_CURRENT_PAGE,
  SET_MATERIAL_LOADING,
  SET_MATERIAL_ERROR,
  SET_MATERIALS_PER_PAGE,
  REMOVE_MATERIAL_FROM_STORE
} from './material.types';

export const initialState = {
  list: [],
  material: null,
  materialLoading: false,
  materialError: null,
  pagination: {
    currentPage: 0,
    materialsPerPage: 6,
    pagesCount: 1
  }
};

const materialReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_MATERIALS:
      return {
        ...state,
        list: action.payload
      };
    case SET_MATERIAL:
      return {
        ...state,
        material: action.payload
      };
    case SET_MATERIAL_LOADING:
      return {
        ...state,
        materialLoading: action.payload
      };
    case SET_MATERIAL_ERROR:
      return {
        ...state,
        materialError: action.payload
      };
    case SET_MATERIALS_CURRENT_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.payload - 1
        }
      };
    case SET_MATERIALS_PER_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          materialsPerPage: action.payload
        }
      };
    case SET_MATERIALS_PAGES_COUNT:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          pagesCount: action.payload
        }
      };

    case REMOVE_MATERIAL_FROM_STORE:
      const materials = state.list.filter(
        (material) => material._id !== action.payload
      );
      return { ...state, list: materials };

    default:
      return state;
  }
};

export default materialReducer;
