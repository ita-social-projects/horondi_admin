import React from 'react';
import { TablePagination } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentPage,
  setRowsPerPage
} from '../../redux/pagination/pagination.actions';
import TablePaginationActions from './paginator-control';

const FIRST_PAGE = 0;

const selectProps = {
  native: true
};

const TablePaginator = () => {
  const pagesCount = useSelector(({ Pagination }) => Pagination.pagesCount);
  const rowsPerPageOptions = useSelector(
    ({ Pagination }) => Pagination.rowsPerPageOptions
  );
  const rowsPerPage = useSelector(({ Pagination }) => Pagination.rowsPerPage);
  const currentPage = useSelector(({ Pagination }) => Pagination.currentPage);

  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    const rowsPerPageValue = parseInt(event.target.value);
    dispatch(setCurrentPage(FIRST_PAGE));
    dispatch(setRowsPerPage(rowsPerPageValue));
  };

  return (
    <TablePagination
      component='div'
      rowsPerPageOptions={rowsPerPageOptions}
      count={pagesCount}
      rowsPerPage={rowsPerPage}
      page={currentPage}
      SelectProps={selectProps}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
    />
  );
};

export default TablePaginator;
