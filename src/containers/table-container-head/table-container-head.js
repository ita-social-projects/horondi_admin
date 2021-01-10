import React from 'react';
import PropTypes from 'prop-types';

import { TableHead, TableRow, TableCell } from '@material-ui/core';
import { useStyles } from './table-container-head.styles';
import tableHeadRowTitles from '../../configs/table-head-row-titles';

const TableContainerHead = ({ titles }) => {
  const styles = useStyles();
  const { actionLabel } = tableHeadRowTitles;

  const headRow = titles.map((title) => (
    <TableCell
      variant='head'
      data-cy={title}
      key={title}
      className={title === actionLabel ? styles.actionCell : ''}
    >
      {title}
    </TableCell>
  ));

  return (
    <TableHead className={styles.tableHead}>
      <TableRow>{headRow}</TableRow>
    </TableHead>
  );
};

TableContainerHead.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string.isRequired)
};

TableContainerHead.defaultProps = {
  titles: []
};

export default TableContainerHead;
