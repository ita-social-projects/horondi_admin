import React from 'react';
import PropTypes from 'prop-types';

import { TableContainer, Table, TableBody, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import TableContainerHead from '../table-container-head';
import TableContainerRow from '../table-container-row';

import useStyles from './table-container-generator.styles';
import TablePaginator from '../table-container-paginator';

const SMALL_SIZE = 'small';
const DEFAULT_SIZE = 'medium';

const TableContainerGenerator = ({ tableTitles, tableItems, pagination }) => {
  const classes = useStyles();
  const dense = useSelector((Table) => Table.dense);
  return (
    <div>
      <TableContainer className={classes.container} component={Paper}>
        <Table
          className={classes.table}
          stickyHeader
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
  tableTitles: [''],
  tableItems: [
    <TableContainerRow
      key={0}
      deleteHandler={() => {}}
      editHandler={() => {}}
    />
  ]
};

export default TableContainerGenerator;
