import {
  SET_TABLE_DENSE,
  SET_CURRENT_PAGE,
  SET_PAGES_COUNT,
  SET_ROWS_PER_PAGE,
  SET_ITEMS_COUNT
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

export const setPagesCount = (payload) => ({
  type: SET_PAGES_COUNT,
  payload
});

export const setItemsCount = (payload) => ({
  type: SET_ITEMS_COUNT,
  payload
});
