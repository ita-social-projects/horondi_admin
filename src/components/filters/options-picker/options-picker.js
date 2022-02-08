import React from 'react';
import {
  Badge,
  FormControl,
  Input,
  InputLabel,
  Select
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';

import { useStyles, MenuProps } from './options-picker.styles';
import materialUiConstants from '../../../configs/material-ui-constants';
import { badgePosition } from '../../../configs';
import { useFilter } from '../../../hooks/filter/useFilterSearchAndSort';

const OptionsPicker = ({ value, handler, label, options }) => {
  const styles = useStyles();

  const { optionHandler, setRenderValue } = useFilter(options, handler);

  return (
    <Badge
      badgeContent={value.length}
      color={materialUiConstants.styleError}
      anchorOrigin={badgePosition}
    >
      <FormControl className={styles.container}>
        <InputLabel id={materialUiConstants.checkBoxLabel}>{label}</InputLabel>
        <Select
          labelId={materialUiConstants.checkBoxLabel}
          id={materialUiConstants.checkBoxId}
          multiple
          value={value}
          onChange={optionHandler}
          renderValue={setRenderValue}
          // onChange={setOptionHandler}
          // renderValue={renderValue}
          input={<Input />}
          autoWidth
          MenuProps={MenuProps}
        >
          {options.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              <Checkbox checked={value.indexOf(item.value) > -1} />
              <ListItemText primary={item.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Badge>
  );
};

OptionsPicker.propTypes = {
  handler: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ).isRequired
};

export default OptionsPicker;
