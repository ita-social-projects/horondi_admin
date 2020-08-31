import {
  SET_PATTERNS,
  SET_PATTERN_LOADING,
  SET_PATTERN,
  SET_PATTERN_ERROR,
  SET_CURRENT_PAGE,
  SET_PATTERNS_PER_PAGE,
  SET_PAGES_COUNT,
  REMOVE_PATTERN_FROM_STORE
} from './pattern.types';

export const initialState = {
  list: [],
  pattern: null,
  patternLoading: false,
  patternError: null,
  pagination: {
    currentPage: 0,
    patternsPerPage: 6,
    pagesCount: 1
  }
};

const patternReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_PATTERNS:
    return {
      ...state,
      list: action.payload
    };
  case SET_PATTERN:
    return {
      ...state,
      pattern: action.payload
    };
  case SET_PATTERN_LOADING:
    return {
      ...state,
      patternLoading: action.payload
    };
  case SET_PATTERN_ERROR:
    return {
      ...state,
      patternError: action.payload
    };
  case SET_CURRENT_PAGE:
    return {
      ...state,
      pagination: {
        ...state.pagination,
        currentPage: action.payload - 1
      }
    };
  case SET_PATTERNS_PER_PAGE:
    return {
      ...state,
      pagination: {
        ...state.pagination,
        patternsPerPage: action.payload
      }
    };
  case SET_PAGES_COUNT:
    return {
      ...state,
      pagination: {
        ...state.pagination,
        pagesCount: action.payload
      }
    };
  case REMOVE_PATTERN_FROM_STORE:
    const patterns = state.list.filter(
      (pattern) => pattern._id !== action.payload
    );
    return { ...state, list: patterns };

  default:
    return state;
  }
};

export default patternReducer;
