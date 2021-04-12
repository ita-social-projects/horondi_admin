import {
  CLEAR_FILTERS,
  SET_FILTER,
  SET_HISTORY_ERROR,
  SET_HISTORY_LOADING,
  SET_HISTORY_RECORDS
} from './history.types';

const initialFilters = {
  action: [],
  role: [],
  date: {
    dateFrom: '',
    dateTo: ''
  },
  search: ''
};
export const initialState = {
  filters: initialFilters,
  records: null,
  historyLoading: false,
  historyError: null
};

const historyReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_HISTORY_RECORDS:
    return {
      ...state,
      records: action.payload
    };
  case SET_HISTORY_LOADING:
    return {
      ...state,
      historyLoading: action.payload
    };
  case SET_HISTORY_ERROR:
    return {
      ...state,
      historyError: action.payload
    };
  case SET_FILTER:
    return {
      ...state,
      filters: {
        ...state.filters,
        ...action.payload
      }
    };
  case CLEAR_FILTERS:
    return {
      ...state,
      filters: initialFilters
    };
  default:
    return state;
  }
};

export default historyReducer;
