import React from 'react';
import { useSelector } from 'react-redux';
import { TableRow, TableCell, Avatar } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import PropTypes from 'prop-types';
import {
  CustomizedEditIcon,
  CustomizedDeleteIcon
} from '../../components/icons';
import { useStyles } from './table-container-row.styles';
import { config } from '../../configs';

const TableContainerRow = ({
  id,
  image,
  editHandler,
  showAvatar,
  showEdit,
  showDelete,
  deleteHandler,
  ...rest
}) => {
  const { SMALL_SIZE, DEFAULT_SIZE } = config.iconSizes;
  const classes = useStyles();

  const dense = useSelector(({ Table }) => Table.dense);

  const properties = { ...rest };
  const tableCells = Object.values(properties).map((property) => (
    <TableCell key={property}>{property}</TableCell>
  ));

  const iconSize = dense ? SMALL_SIZE : DEFAULT_SIZE;
  const avatarSize = dense ? classes.small : classes.medium;

  return (
    <TableRow key={id} hover>
      {showAvatar && (
        <TableCell>
          <Avatar className={avatarSize} src={image}>
            <ImageIcon />
          </Avatar>
        </TableCell>
      )}
      {tableCells}
      <TableCell>
        {showEdit && (
          <CustomizedEditIcon size={iconSize} onClickHandler={editHandler} />
        )}
        {showDelete && (
          <CustomizedDeleteIcon
            size={iconSize}
            onClickHandler={deleteHandler}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

TableContainerRow.propTypes = {
  image: PropTypes.string,
  editHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
  id: PropTypes.string,
  showAvatar: PropTypes.bool,
  showEdit: PropTypes.bool,
  showDelete: PropTypes.bool
};

TableContainerRow.defaultProps = {
  id: '',
  image: '',
  deleteHandler: () => {},
  editHandler: () => {},
  showAvatar: true,
  showEdit: true,
  showDelete: true
};

export default TableContainerRow;
