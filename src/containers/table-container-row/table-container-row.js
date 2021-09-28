import React from 'react';
import { useSelector } from 'react-redux';
import { TableRow, TableCell, Avatar, Checkbox } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';

import PropTypes from 'prop-types';

import { noop } from 'lodash';
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
  showCheckbox,
  deleteHandler,
  clickHandler,
  checkboxChangeHandler,
  ...rest
}) => {
  const { SMALL_SIZE, DEFAULT_SIZE } = config.iconSizes;
  const classes = useStyles();

  const dense = useSelector(({ Table }) => Table.dense);

  const properties = { ...rest };
  const tableCells = Object.keys(properties).map((property) => (
    <TableCell key={property} data-cy='table-cell'>
      {properties[property]}
    </TableCell>
  ));

  const iconSize = dense ? SMALL_SIZE : DEFAULT_SIZE;
  const avatarSize = dense ? classes.small : classes.medium;
  return (
    <TableRow key={id} hover onClick={(e) => clickHandler(e)}>
      {showCheckbox && (
        <TableCell>
          <Checkbox
            color='default'
            inputProps={{ 'aria-label': 'checkbox with default color' }}
            onClick={(e) => checkboxChangeHandler(e, id)}
          />
        </TableCell>
      )}
      {showAvatar && (
        <TableCell className={classes.smallCell}>
          <Avatar className={avatarSize} src={image}>
            <ImageIcon />
          </Avatar>
        </TableCell>
      )}
      {tableCells}
      {(showEdit || showDelete) && (
        <TableCell className={classes.smallCell}>
          {showEdit && (
            <CustomizedEditIcon
              size={iconSize}
              onClickHandler={editHandler}
              data-cy='edit-btn'
            />
          )}
          {showDelete && (
            <CustomizedDeleteIcon
              size={iconSize}
              onClickHandler={deleteHandler}
            />
          )}
        </TableCell>
      )}
    </TableRow>
  );
};

TableContainerRow.propTypes = {
  image: PropTypes.string,
  editHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
  clickHandler: PropTypes.func,
  checkboxChangeHandler: PropTypes.func,
  id: PropTypes.string,
  showAvatar: PropTypes.bool,
  showEdit: PropTypes.bool,
  showDelete: PropTypes.bool,
  showCheckbox: PropTypes.bool
};

TableContainerRow.defaultProps = {
  id: '',
  image: '',
  deleteHandler: noop,
  editHandler: noop,
  clickHandler: noop,
  checkboxChangeHandler: noop,
  showAvatar: true,
  showEdit: true,
  showDelete: true,
  showCheckbox: false
};

export default TableContainerRow;
