import {
  SET_MODELS,
  SET_MODEL_LOADING,
  SET_MODEL,
  SET_MODEL_ERROR,
  REMOVE_MODEL_FROM_STORE
} from './model.types';

export const initialState = {
  list: [],
  model: null,
  modelLoading: false,
  modelError: null
};

const modelReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_MODELS:
    return {
      ...state,
      list: action.payload
    };
  case SET_MODEL:
    return {
      ...state,
      model: action.payload
    };
  case SET_MODEL_LOADING:
    return {
      ...state,
      modelLoading: action.payload
    };
  case SET_MODEL_ERROR:
    return {
      ...state,
      modelError: action.payload
    };
  case REMOVE_MODEL_FROM_STORE:
    const models = state.list.filter((model) => model._id !== action.payload);
    return { ...state, list: models };

  default:
    return state;
  }
};

export default modelReducer;
