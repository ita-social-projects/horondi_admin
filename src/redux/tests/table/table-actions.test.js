import {
  SET_TABLE_DENSE,
  SET_CURRENT_PAGE,
  SET_ROWS_PER_PAGE,
  SET_ITEMS_COUNT
} from '../../table/table.types';

import {
  setCurrentPage,
  setItemsCount,
  setRowsPerPage,
  setTableDense
} from '../../table/table.actions';

describe('table actions tests', () => {
  it('should set current page to 5', () => {
    expect(setCurrentPage(5)).toEqual({
      type: SET_CURRENT_PAGE,
      payload: 5
    });
  });
  it('should set items count to 5', () => {
    expect(setItemsCount(5)).toEqual({
      type: SET_ITEMS_COUNT,
      payload: 5
    });
  });
  it('should set rows per page to 5', () => {
    expect(setRowsPerPage(5)).toEqual({
      type: SET_ROWS_PER_PAGE,
      payload: 5
    });
  });
  it('should set table dense to false', () => {
    expect(setTableDense(false)).toEqual({
      type: SET_TABLE_DENSE,
      payload: false
    });
  });
});
