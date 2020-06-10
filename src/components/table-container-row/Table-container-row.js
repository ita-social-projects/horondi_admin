import React from 'react';
import { connect } from 'react-redux';

import { TableRow, TableCell, Avatar } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import { DeleteButton, EditButton } from '../buttons';

import { useStyles } from './Table-container-row-style';

const SMALL_SIZE = 'small';
const DEFAULT_SIZE = 'default';

const TableContainerRow = ({
  dense,
  id,
  editHandler,
  deleteHandler,
  dispatch,
  ...rest
}) => {
  const classes = useStyles();
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

const mapStateToProps = ({ tableState: { dense } }) => ({ dense });

export default connect(mapStateToProps, null)(TableContainerRow);
