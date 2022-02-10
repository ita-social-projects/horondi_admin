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
  text,
  image,
  editHandler,
  showAvatar,
  showEdit,
  showDelete,
  showCheckbox,
  deleteHandler,
  clickHandler,
  checkBoxValue,
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

  const setCheckboxValue = (idToFind) => {
    const checked = checkBoxValue.find((item) => item === idToFind);
    return !!checked;
  };

  const iconSize = dense ? SMALL_SIZE : DEFAULT_SIZE;
  const avatarSize = dense ? classes.small : classes.medium;
  return (
    <TableRow key={id} hover onClick={(e) => clickHandler(e)}>
      {showCheckbox && (
        <TableCell>
          <Checkbox
            color='default'
            checked={checkBoxValue && setCheckboxValue(id)}
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
      {text && (
        <TableCell>
          <p className={classes.text}>{text}</p>
        </TableCell>
      )}
      {!showAvatar && image && (
        <TableCell className={classes.imageValue}>
          <img src={image} alt={image} />
        </TableCell>
      )}

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
  text: PropTypes.string,
  image: PropTypes.string,
  editHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
  clickHandler: PropTypes.func,
  checkboxChangeHandler: PropTypes.func,
  id: PropTypes.string,
  checkBoxValue: PropTypes.arrayOf(PropTypes.shape),
  showAvatar: PropTypes.bool,
  showEdit: PropTypes.bool,
  showDelete: PropTypes.bool,
  showCheckbox: PropTypes.bool
};

TableContainerRow.defaultProps = {
  id: '',
  text: '',
  image: '',
  deleteHandler: noop,
  editHandler: noop,
  clickHandler: noop,
  checkboxChangeHandler: noop,
  checkBoxValue: [],
  showAvatar: true,
  showEdit: true,
  showDelete: true,
  showCheckbox: false
};

export default TableContainerRow;
