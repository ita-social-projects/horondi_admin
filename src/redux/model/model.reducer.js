import {
  SET_MODELS,
  SET_MODEL_LOADING,
  SET_MODEL,
  SET_MODEL_ERROR,
  SET_MODELS_CURRENT_PAGE,
  SET_MODELS_PER_PAGE,
  SET_MODELS_PAGES_COUNT,
  REMOVE_MODEL_FROM_STORE
} from './model.types';

export const initialState = {
  list: [],
  model: null,
  modelLoading: false,
  modelError: null,
  pagination: {
    currentPage: 0,
    modelsPerPage: 6,
    pagesCount: 1
  }
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
  case SET_MODELS_CURRENT_PAGE:
    return {
      ...state,
      pagination: {
        ...state.pagination,
        currentPage: action.payload - 1
      }
    };
  case SET_MODELS_PER_PAGE:
    return {
      ...state,
      pagination: {
        ...state.pagination,
        modelsPerPage: action.payload
      }
    };
  case SET_MODELS_PAGES_COUNT:
    return {
      ...state,
      pagination: {
        ...state.pagination,
        pagesCount: action.payload
      }
    };
  case REMOVE_MODEL_FROM_STORE:
    const models = state.list.filter((model) => model._id !== action.payload);
    return { ...state, list: models };

  default:
    return state;
  }
};

export default modelReducer;
