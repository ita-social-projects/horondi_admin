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

const OptionsPicker = ({ value, handler, label, options }) => {
  const styles = useStyles();

  const setOptionHandler = (e) => {
    const { value: _value } = e.target;
    if (_value) {
      handler(_value);
    }
  };

  const renderValue = (selectedValues) => {
    return options.reduce((acumulator, option) => {
      let selectedItem;

      selectedValues.forEach((selectedValue, _index) => {
        if (selectedValue === option.value) {
          if (_index !== selectedValues[selectedValues.length - 1]) {
            selectedItem = `${option.label}, `;
          } else {
            selectedItem = option.label;
          }
        }
      });

      acumulator.push(selectedItem);
      return acumulator;
    }, []);
  };

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
          onChange={setOptionHandler}
          input={<Input />}
          renderValue={renderValue}
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
