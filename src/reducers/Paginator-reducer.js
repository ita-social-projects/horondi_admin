import { config } from '../config';

const { rowsPerPageOptions } = config.app;

const initialState = {
  pagesCount: 0,
  currentPage: 0,
  rowsPerPage: rowsPerPageOptions[0],
  rowsPerPageOptions
};

const paginationState = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PAGES_COUNT':
      return {
        ...state,
        pagesCount: action.payload
      };

    case 'SET_ROWS_PER_PAGE':
      return {
        ...state,
        rowsPerPage: action.payload
      };

    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload
      };

    default:
      return state;
  }
};

export default paginationState;
