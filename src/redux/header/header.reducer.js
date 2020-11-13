import {
  SET_HEADERS,
  SET_HEADER_LOADING,
  SET_HEADER,
  SET_HEADER_ERROR,
  REMOVE_HEADER_FROM_STORE
} from './header.types';

export const initialState = {
  list: [],
  header: null,
  headerLoading: false,
  headerError: null
};

const headerReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_HEADERS:
    return {
      ...state,
      list: action.payload
    };
  case SET_HEADER:
    return {
      ...state,
      header: action.payload
    };
  case SET_HEADER_LOADING:
    return {
      ...state,
      headerLoading: action.payload
    };
  case SET_HEADER_ERROR:
    return {
      ...state,
      headerError: action.payload
    };
  case REMOVE_HEADER_FROM_STORE:
    const headers = state.list.filter(
      (header) => header._id !== action.payload
    );
    return { ...state, list: headers };

  default:
    return state;
  }
};

export default headerReducer;
