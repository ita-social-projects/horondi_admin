import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import PropTypes from 'prop-types';

import { useStyles } from './option-picker.styles';
import materialUiConstants from '../../../configs/material-ui-constants';
import { useSort } from '../../../hooks/filter/useFilterSearchAndSort';

const OptionPicker = ({ handler, value, defaultValue, options, label }) => {
  const styles = useStyles();

  const setOptionHandler = useSort(options, handler);

  const optionElems = options.map((option) => (
    <MenuItem key={option.label} value={option.value}>
      {option.label}
    </MenuItem>
  ));

  return (
    <FormControl className={styles.container}>
      <InputLabel id={materialUiConstants.checkBoxLabel}>{label}</InputLabel>
      <Select
        data-cy='user-sorting'
        labelId='checkbox-label'
        id='checkbox'
        value={value}
        onChange={setOptionHandler}
        defaultValue={defaultValue}
      >
        {optionElems}
      </Select>
    </FormControl>
  );
};

OptionPicker.propTypes = {
  handler: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ).isRequired,
  label: PropTypes.string.isRequired
};

OptionPicker.defaultProps = {
  defaultValue: ''
};

export default OptionPicker;
