import {
  SET_COLOR,
  SET_COLORS,
  REMOVE_COLOR_FROM_STATE,
  SET_COLORS_LOADING,
  SET_COLORS_ERROR,
  ADD_COLOR_TO_STATE,
  SHOW_COLOR_DIALOG_WINDOW,
  SHOW_BOUND_MATERIALS_WINDOW,
  SET_BOUND_MATERIALS
} from './color.types';

export const initialState = {
  list: [],
  color: null,
  showColorDialogWindow: false,
  showBoundMaterialsWindow: false,
  boundMaterials: null,
  colorLoading: false,
  colorError: null
};

const colorReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_COLORS:
    return {
      ...state,
      list: action.payload
    };
  case SET_COLOR:
    return {
      ...state,
      color: action.payload
    };
  case REMOVE_COLOR_FROM_STATE: {
    const list = state.list.filter((color) => color._id !== action.payload);
    return {
      ...state,
      list
    };
  }
  case ADD_COLOR_TO_STATE: {
    const list = [...state.list];
    list.push(action.payload);
    return {
      ...state,
      list
    };
  }
  case SET_COLORS_LOADING:
    return {
      ...state,
      colorLoading: action.payload
    };
  case SET_COLORS_ERROR:
    return {
      ...state,
      colorError: action.payload
    };
  case SHOW_COLOR_DIALOG_WINDOW:
    return {
      ...state,
      showColorDialogWindow: action.payload
    };
  case SHOW_BOUND_MATERIALS_WINDOW:
    return {
      ...state,
      showBoundMaterialsWindow: action.payload
    };
  case SET_BOUND_MATERIALS:
    return {
      ...state,
      boundMaterials: action.payload
    };
  default:
    return state;
  }
};

export default colorReducer;
