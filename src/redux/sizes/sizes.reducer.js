import {
  SET_SIZES,
  SET_SIZE,
  ADD_SIZE_TO_STATE,
  REMOVE_SIZE_FROM_STATE,
  SET_SIZES_LOADING,
  SET_SIZES_ERROR,
  SHOW_SIZE_DIALOG_WINDOW
} from './sizes.types';

export const selectSizes = ({ Sizes }) => ({
  sizesList: Sizes.list,
  loading: Sizes.sizeLoading,
  size: Sizes.list
});

export const initialState = {
  list: [],
  size: null,
  showSizeDialogWindow: false,
  sizeLoading: false,
  sizeError: null
};

const sizeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_SIZES:
    return {
      ...state,
      list: action.payload
    };
  case SET_SIZE:
    return {
      ...state,
      size: action.payload
    };
  case REMOVE_SIZE_FROM_STATE: {
    const list = state.list.filter((size) => size._id !== action.payload);
    return {
      ...state,
      list
    };
  }
  case ADD_SIZE_TO_STATE: {
    const list = [...state.list];
    list.push(action.payload);
    return {
      ...state,
      list
    };
  }
  case SET_SIZES_LOADING:
    return {
      ...state,
      sizesLoading: action.payload
    };
  case SET_SIZES_ERROR:
    return {
      ...state,
      sizeError: action.payload
    };
  case SHOW_SIZE_DIALOG_WINDOW:
    return {
      ...state,
      showSizeDialogWindow: action.payload
    };
  default:
    return state;
  }
};

export default sizeReducer;
