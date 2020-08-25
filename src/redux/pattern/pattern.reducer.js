import {
  SET_PATTERN,
  SET_PATTERN_LOADING,
  SET_PATTERNS,
  SET_PATTERN_ERROR,
  REMOVE_PATTERN_FROM_STORE
} from './pattern.types';

export const initialState = {
  patterns: [],
  pattern: null,
  patternLoading: false,
  patternError: null
};

const patternReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_PATTERNS:
    return {
      ...state,
      patterns: action.payload
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
  case REMOVE_PATTERN_FROM_STORE:
    const patterns = state.patterns.filter(
      (pattern) => pattern._id !== action.payload
    );
    return { ...state, patterns };

  default:
    return state;
  }
};

export default patternReducer;
