import {
  setCurrentPage,
  setItemsCount,
  setRowsPerPage,
  setTableDense
} from '../table.actions';

import tableState, { initialState } from '../table.reducer';

describe('table reducer tests', () => {
  it('should return default state', () => {
    expect(tableState(initialState)).toEqual(initialState);
  });
  it('should set current page to 5', () => {
    expect(tableState(initialState, setCurrentPage(5))).toEqual({
      ...initialState,
      pagination: {
        ...initialState.pagination,
        currentPage: 5
      }
    });
  });
  it('should set rows per page to 5', () => {
    expect(tableState(initialState, setRowsPerPage(5))).toEqual({
      ...initialState,
      pagination: {
        ...initialState.pagination,
        rowsPerPage: 5
      }
    });
  });
  it('should set items count to 5', () => {
    expect(tableState(initialState, setItemsCount(5))).toEqual({
      ...initialState,
      itemsCount: 5
    });
  });

  it('should set dense to true', () => {
    expect(tableState(initialState, setTableDense(true))).toEqual({
      ...initialState,
      dense: true
    });
  });
});
