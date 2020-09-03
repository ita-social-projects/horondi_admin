import {
  SET_TABLE_DENSE,
  SET_CURRENT_PAGE,
  SET_ROWS_PER_PAGE,
  SET_PAGES_COUNT,
  SET_ITEMS_COUNT
} from './table.types';

const initialState = {
  dense: false,
  currentPage: 0,
  rowsPerPage: 10,
  rowsPerPageOptions: [10, 20, 30],
  pagesCount: 1,
  count: 0
};

const tableState = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_TABLE_DENSE:
    return {
      ...state,
      dense: action.payload
    };
  case SET_CURRENT_PAGE:
    return {
      ...state,
      currentPage: action.payload
    };
  case SET_ROWS_PER_PAGE:
    return {
      ...state,
      rowsPerPage: action.payload
    };
  case SET_PAGES_COUNT:
    return {
      ...state,
      pagesCount: action.payload
    };
  case SET_ITEMS_COUNT:
    return {
      ...state,
      count: action.payload
    };
  default:
    return state;
  }
};

export default tableState;
