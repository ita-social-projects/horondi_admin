import React from 'react';
import PropTypes from 'prop-types';

import { TableContainer, Table, TableBody, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import TableContainerHead from '../table-container-head';

import useStyles from './table-container-generator.styles';
import { config } from '../../configs';

const TableContainerGenerator = ({ tableTitles, tableItems, pagination }) => {
  const { SMALL_SIZE, DEFAULT_SIZE } = config.tableSizes;
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
