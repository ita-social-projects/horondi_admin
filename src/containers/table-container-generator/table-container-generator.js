import React from 'react';
import PropTypes from 'prop-types';

import { Table, TableBody, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import TableContainer from '@material-ui/core/TableContainer';
import TableContainerHead from '../table-container-head';

import useStyles from './table-container-generator.styles';
import { config } from '../../configs';
import TablePaginator from '../table-pagination-container';

const TableContainerGenerator = ({ tableTitles, tableItems, pagination }) => {
  const { SMALL_SIZE, DEFAULT_SIZE } = config.tableSizes;
  const classes = useStyles();
  const dense = useSelector(({ Table }) => Table.dense);

  return (
    <div>
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
    </div>
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
