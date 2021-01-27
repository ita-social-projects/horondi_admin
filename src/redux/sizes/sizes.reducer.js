import { ADD_SIZE, SET_SIZE_LOADING, SAVE_SIZE_IN_REDUX } from './sizes.types';

export const initialState = {
  size: {},
  sizeLoading: false
};

const sizeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case ADD_SIZE:
    return {
      ...state,
      size: action.payload
    };
  case SET_SIZE_LOADING:
    return {
      ...state,
      sizeLoading: action.payload
    };
  case SAVE_SIZE_IN_REDUX:
    return {
      ...state,
      size: action.payload
    };
  default:
    return state;
  }
};

export default sizeReducer;
