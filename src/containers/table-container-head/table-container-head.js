import React from 'react';
import PropTypes from 'prop-types';

import { TableHead, TableRow, TableCell } from '@material-ui/core';

const TableContainerHead = ({ titles }) => {
  const headRow = titles.map((title) => (
    <TableCell variant='head' data-cy={title} key={title}>
      {title}
    </TableCell>
  ));

  return (
    <TableHead>
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
