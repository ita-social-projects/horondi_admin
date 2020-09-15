import React from 'react';
import { useSelector } from 'react-redux';
import { TableRow, TableCell, Avatar } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import PropTypes from 'prop-types';
import { DeleteButton, EditButton } from '../buttons';
import { useStyles } from './table-container-row.styles';
import { config } from '../../configs';

const TableContainerRow = ({
  id,
  image,
  editHandler,
  showAvatar,
  deleteHandler,
  ...rest
}) => {
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
      {showAvatar && (
        <TableCell>
          <Avatar
            className={avatarSize}
            src={`https://horondi.blob.core.windows.net/horondi/images/${image}`}
          >
            <ImageIcon />
          </Avatar>
        </TableCell>
      )}
      {tableCells}
      <TableCell>
        <EditButton size={iconSize} onClickHandler={editHandler} />
        <DeleteButton size={iconSize} onClickHandler={deleteHandler} />
      </TableCell>
    </TableRow>
  );
};

TableContainerRow.propTypes = {
  image: PropTypes.string,
  editHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
  id: PropTypes.string,
  showAvatar: PropTypes.bool
};

TableContainerRow.defaultProps = {
  id: '',
  image: '',
  deleteHandler: () => {},
  editHandler: () => {},
  showAvatar: true
};

export default TableContainerRow;
