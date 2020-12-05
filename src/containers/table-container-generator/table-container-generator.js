import React from 'react';
import PropTypes from 'prop-types';

import { TableBody, Paper, Table } from '@material-ui/core';
import { useSelector } from 'react-redux';
import TableContainer from '@material-ui/core/TableContainer';
import TableContainerHead from '../table-container-head';

import useStyles from './table-container-generator.styles';
import { config } from '../../configs';
import TablePaginator from '../table-pagination-container';
import { selectTableDense } from '../../redux/selectors/table.selectors';

const TableContainerGenerator = ({ tableTitles, tableItems, pagination }) => {
  const { SMALL_SIZE, DEFAULT_SIZE } = config.tableSizes;
  const classes = useStyles();
  const dense = useSelector(selectTableDense);

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size={dense ? SMALL_SIZE : DEFAULT_SIZE}
        >
          <TableContainerHead titles={tableTitles} />
          <TableBody id='table-body'>{tableItems}</TableBody>
        </Table>
      </TableContainer>
      {pagination && <TablePaginator />}
    </>
  );
};

TableContainerGenerator.propTypes = {
  pagination: PropTypes.bool,
  tableTitles: PropTypes.arrayOf(PropTypes.string.isRequired),
  tableItems: PropTypes.arrayOf(PropTypes.shape(PropTypes.element.isRequired))
};

TableContainerGenerator.defaultProps = {
  pagination: false,
  tableTitles: [],
  tableItems: []
};

export default TableContainerGenerator;
