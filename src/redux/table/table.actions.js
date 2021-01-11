import {
  SET_TABLE_DENSE,
  SET_CURRENT_PAGE,
  SET_ROWS_PER_PAGE,
  SET_ITEMS_COUNT,
  RESET_PAGINATION,
  UPDATE_PADAGINATION
} from './table.types';

export const setTableDense = (newTableDense) => ({
  type: SET_TABLE_DENSE,
  payload: newTableDense
});

export const setCurrentPage = (payload) => ({
  type: SET_CURRENT_PAGE,
  payload
});

export const setRowsPerPage = (payload) => ({
  type: SET_ROWS_PER_PAGE,
  payload
});

export const setItemsCount = (payload) => ({
  type: SET_ITEMS_COUNT,
  payload
});

export const resetPagination = (payload) => ({
  type: RESET_PAGINATION,
  payload
});

export const updatePagination = () => ({
  type: UPDATE_PADAGINATION
});
