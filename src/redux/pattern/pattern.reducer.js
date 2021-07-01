import {
  SET_PATTERNS,
  SET_PATTERN_LOADING,
  SET_PATTERN,
  SET_PATTERN_ERROR,
  REMOVE_PATTERN_FROM_STORE,
  SET_PATTERN_FILTER,
  SET_PATTERN_SORT,
  CLEAR_PATTERN_FILTERS,
  SET_PATTERN_SORT_LABEL
} from './pattern.types';

export const selectPattern = ({ Pattern }) => ({
  items: Pattern.items,
  loading: Pattern.patternLoading,
  pattern: Pattern.pattern,
  filter: Pattern.filters,
  sort: Pattern.sort
});

const initialFilters = {
  name: '',
  description: '',
  model: [],
  available: [],
  material: [],
  handmade: []
};

export const initialState = {
  list: [],
  sort: {
    name: 1
  },
  filters: initialFilters,
  pattern: null,
  patternLoading: false,
  patternError: null
};

const patternReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_PATTERNS:
      return {
        ...state,
        items: action.payload
      };
    case SET_PATTERN:
      return {
        ...state,
        pattern: action.payload
      };
    case SET_PATTERN_SORT_LABEL:
      return {
        ...state,
        sortLabel: action.payload
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
      return {
        ...state,
        list: patterns
      };
    case SET_PATTERN_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    case SET_PATTERN_SORT:
      return {
        ...state,
        sort: {
          ...action.payload
        }
      };
    case CLEAR_PATTERN_FILTERS:
      return {
        ...state,
        filters: initialFilters,
        sortLabel: '',
        sort: {},
        name: ''
      };
    default:
      return state;
  }
};

export default patternReducer;
