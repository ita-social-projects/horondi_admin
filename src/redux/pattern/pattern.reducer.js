import {
  SET_PATTERNS,
  SET_PATTERN_LOADING,
  SET_PATTERN,
  SET_PATTERN_ERROR,
  REMOVE_PATTERN_FROM_STORE
} from './pattern.types';

export const selectPattern = ({ Pattern }) => ({
  list: Pattern.list,
  loading: Pattern.patternLoading,
  pattern: Pattern.pattern
});

export const initialState = {
  list: [],
  pattern: null,
  patternLoading: false,
  patternError: null
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
