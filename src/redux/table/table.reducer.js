import {
  SET_TABLE_DENSE,
  SET_CURRENT_PAGE,
  SET_ROWS_PER_PAGE,
  SET_PAGES_COUNT,
  SET_ITEMS_COUNT,
  RESET_PAGINATION
} from './table.types';

export const initialState = {
  dense: false,
  pagination: {
    currentPage: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 30],
    pagesCount: 1
  },
  itemsCount: 0
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
      pagination: { ...state.pagination, currentPage: action.payload }
    };
  case SET_ROWS_PER_PAGE:
    return {
      ...state,
      pagination: { ...state.pagination, rowsPerPage: action.payload }
    };
  case SET_PAGES_COUNT:
    return {
      ...state,
      pagination: { ...state.pagination, pagesCount: action.payload }
    };
  case SET_ITEMS_COUNT:
    return {
      ...state,
      itemsCount: action.payload
    };
  case RESET_PAGINATION:
    return initialState;
  default:
    return state;
  }
};

export default tableState;
