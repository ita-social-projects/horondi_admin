import React from 'react';
import { useSelector } from 'react-redux';
import {
  TableRow,
  TableCell,
  Avatar,
  Checkbox,
  IconButton
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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
  showExpandMore,
  deleteHandler,
  clickHandler,
  checkBoxValue,
  checkboxChangeHandler,
  expandMoreHandler,
  openExpandMore,
  disabled,
  ...rest
}) => {
  const { SMALL_SIZE, DEFAULT_SIZE } = config.iconSizes;
  const classes = useStyles();

  const dense = useSelector(({ Table }) => Table.dense);

  const properties = { ...rest };
  const tableCells = Object.entries(properties).map(([key, value]) => (
    <TableCell key={key} data-cy='table-cell'>
      {value || '-'}
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
          <div className={classes.text}>{text}</div>
        </TableCell>
      )}
      {!showAvatar && image && (
        <TableCell className={classes.imageValue}>
          <img src={image} alt={image} />
        </TableCell>
      )}

      {(showEdit || showDelete || showExpandMore) && (
        <TableCell className={classes.smallCell}>
          {showEdit && (
            <CustomizedEditIcon
              testId={`edit_btn${id}`}
              size={iconSize}
              onClickHandler={editHandler}
              data-cy='edit-btn'
              disabled={disabled}
            />
          )}

          {showDelete && (
            <CustomizedDeleteIcon
              testId={`del_btn${id}`}
              size={iconSize}
              onClickHandler={deleteHandler}
            />
          )}
          {showExpandMore && (
            <IconButton onClick={expandMoreHandler}>
              {openExpandMore ? (
                <KeyboardArrowUpIcon fontSize={iconSize} />
              ) : (
                <KeyboardArrowDownIcon fontSize={iconSize} />
              )}
            </IconButton>
          )}
        </TableCell>
      )}
    </TableRow>
  );
};

TableContainerRow.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  image: PropTypes.string,
  editHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
  expandMoreHandler: PropTypes.func,
  clickHandler: PropTypes.func,
  checkboxChangeHandler: PropTypes.func,
  id: PropTypes.string,
  checkBoxValue: PropTypes.arrayOf(PropTypes.shape),
  showAvatar: PropTypes.bool,
  showEdit: PropTypes.bool,
  showDelete: PropTypes.bool,
  showExpandMore: PropTypes.bool,
  showCheckbox: PropTypes.bool,
  disabled: PropTypes.bool,
  openExpandMore: PropTypes.bool
};

TableContainerRow.defaultProps = {
  id: '',
  text: null,
  image: null,
  deleteHandler: noop,
  expandMoreHandler: noop,
  editHandler: noop,
  clickHandler: noop,
  checkboxChangeHandler: noop,
  checkBoxValue: [],
  showAvatar: true,
  showEdit: true,
  showDelete: true,
  showExpandMore: false,
  showCheckbox: false,
  disabled: false,
  openExpandMore: false
};

export default TableContainerRow;
