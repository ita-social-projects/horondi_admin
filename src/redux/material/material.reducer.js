import {
  SET_MATERIAL,
  SET_MATERIALS,
  SET_MATERIALS_PAGES_COUNT,
  SET_MATERIALS_CURRENT_PAGE,
  SET_MATERIAL_LOADING,
  SET_MATERIAL_ERROR,
  SET_MATERIALS_PER_PAGE,
  REMOVE_MATERIAL_FROM_STORE,
  SHOW_COLOR_DIALOG_WINDOW,
  COLOR_DIALOG_DATA_TO_STORE,
  CLEAR_COLORS,
  SET_MATERIALS_COLORS,
  SET_MATERIALS_COLOR,
  SET_EDIT_MATERIAL_ID,
  REMOVE_MATERIAL_COLOR_FROM_STORE
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
  },
  showColorDialogWindow: false,
  colors: [],
  materialColors: null,
  materialColor: null,
  editMaterialId: ''
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

  case COLOR_DIALOG_DATA_TO_STORE:
    return {
      ...state,
      colors: [...state.colors, action.payload]
    };
  case SHOW_COLOR_DIALOG_WINDOW: {
    return {
      ...state,
      showColorDialogWindow: action.payload
    };
  }
  case CLEAR_COLORS:
    return {
      ...state,
      colors: []
    };
  case SET_MATERIALS_COLORS:
    return {
      ...state,
      materialColors: action.payload
    };
  case SET_MATERIALS_COLOR:
    return {
      ...state,
      materialColor: action.payload
    };
  case SET_EDIT_MATERIAL_ID:
    return {
      ...state,
      editMaterialId: action.payload
    };
  case REMOVE_MATERIAL_COLOR_FROM_STORE:
    const materialColorList = state.materialColors.colors.filter(
      (color) => color.code !== action.payload
    );
    return { ...state, materialColors: { colors: materialColorList } };
  default:
    return state;
  }
};

export default materialReducer;
