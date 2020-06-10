import React from 'react';
import { TablePagination } from '@material-ui/core';
import { connect } from 'react-redux';

import { setCurrentPage, setRowsPerPage } from '../../actions';
import TablePaginationActions from './Paginator-control';

const FIRST_PAGE = 0;

const selectProps = {
  native: true
};

const TablePaginator = ({
  currentPage,
  pagesCount,
  rowsPerPageOptions,
  rowsPerPage,
  setCurrentPage,
  setRowsPerPage
}) => {
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const rowsPerPageValue = parseInt(event.target.value);
    setCurrentPage(FIRST_PAGE);
    setRowsPerPage(rowsPerPageValue);
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

const mapStateToProps = ({
  paginationState: { pagesCount, rowsPerPageOptions, rowsPerPage, currentPage }
}) => ({
  pagesCount,
  rowsPerPageOptions,
  rowsPerPage,
  currentPage
});

const mapDispatchToProps = { setRowsPerPage, setCurrentPage };

export default connect(mapStateToProps, mapDispatchToProps)(TablePaginator);
