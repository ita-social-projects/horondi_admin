import React from 'react';
import { useSelector } from 'react-redux';
import { TableRow, TableCell, Avatar } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import PropTypes from 'prop-types';
import { DeleteButton, EditButton } from '../buttons';
import { useStyles } from './table-container-row.styles';
import { config } from '../../configs';

const TableContainerRow = ({ id, editHandler, deleteHandler, ...rest }) => {
  const { SMALL_SIZE, DEFAULT_SIZE } = config.iconSizes;
  const classes = useStyles();

  const dense = useSelector(({ Table }) => Table.dense);

  const properties = { ...rest };
  const tableCells = Object.values(properties).map((property, index) => (
    <TableCell key={index}>{`${property}`}</TableCell>
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
        <EditButton size={iconSize} onClickHandler={editHandler} />
        <DeleteButton size={iconSize} onClickHandler={deleteHandler} />
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
