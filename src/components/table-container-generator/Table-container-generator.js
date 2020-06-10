import React from 'react';
import { connect } from 'react-redux';

import { TableContainer, Table, TableBody, Paper } from '@material-ui/core';
import TableContainerHead from '../table-container-head';

import useStyles from './Table-container-generator-style';
import TablePaginator from '../table-container-paginator';

const SMALL_SIZE = 'small';
const DEFAULT_SIZE = 'medium';

const TableContainerGenerator = ({
  tableTitles,
  tableItems,
  pagination,
  dense
}) => {
  const classes = useStyles();

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

const mapStateToProps = ({ tableState: { dense } }) => ({ dense });

export default connect(mapStateToProps)(TableContainerGenerator);
