import React from 'react';
import { useSelector } from 'react-redux';
import { TableRow, TableCell, Avatar } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import PropTypes from 'prop-types';
import { DeleteButton, EditButton } from '../buttons';
import { useStyles } from './table-container-row.styles';
import { config } from '../../configs';

const TableContainerRow = ({ id, editHandler, deleteHandler, ...rest }) => {
  const { SMALL_SIZE, DEFAULT_SIZE } = config.tableSizes;
  const classes = useStyles();

  const dense = useSelector(({ Table }) => Table.dense);

  const propetries = { ...rest };
  const tableCells = Object.values(propetries).map((propetry, index) => (
    <TableCell key={index}>{propetry}</TableCell>
  ));

  const iconSize = dense ? SMALL_SIZE : DEFAULT_SIZE;
  const avatarSize = dense ? classes.small : classes.medium;

  return (
    <TableRow key={id} hover>
      <TableCell>
        <Avatar className={avatarSize}>
          <ImageIcon fontSize={iconSize} />
        </Avatar>
      </TableCell>
      {tableCells}
      <TableCell>
        <EditButton size={iconSize} eventHandler={editHandler} />
        <DeleteButton size={iconSize} eventHandler={deleteHandler} />
      </TableCell>
    </TableRow>
  );
};

TableContainerRow.propTypes = {
  editHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
  id: PropTypes.string
};

TableContainerRow.defaultProps = {
  id: '',
  deleteHandler: () => {},
  editHandler: () => {}
};

export default TableContainerRow;
