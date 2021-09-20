import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

import { useStyles } from './nav-picker.styles';
import materialUiConstants from '../../../configs/material-ui-constants';

const NavPicker = ({ pickerOptions }) => {
  const styles = useStyles();

  const { pickValue, valuePicked, labels, labelPicker } = pickerOptions;

  const pickOptions = labels.map(({ label, value }) => (
      <MenuItem key={label} value={value}>
        {label}
      </MenuItem>
    ));

  const handlePickOption = (e) => {
    const { value } = e.target;
    const chosenValue = labels.find((item) => item.value === value);

    if (chosenValue) {
      pickValue(chosenValue.value);
    }
  };

  return (
    <div className={styles.sort}>
      <FormControl className={styles.formControl}>
        <InputLabel id={materialUiConstants.checkBoxLabel}>
          {labelPicker}
        </InputLabel>
        <Select
          data-cy='user-picker'
          labelId='checkbox-label'
          id='checkbox'
          value={valuePicked}
          onChange={handlePickOption}
          defaultValue={valuePicked}
        >
          {pickOptions}
        </Select>
      </FormControl>
    </div>
  );
};

NavPicker.propTypes = {
  pickerOptions: PropTypes.shape({
    pickValue: PropTypes.func,
    valuePicked: PropTypes.string,
    labels: PropTypes.arrayOf(
      PropTypes.exact({
        label: PropTypes.string,
        value: PropTypes.string
      })
    ),
    labelPicker: PropTypes.string
  }).isRequired
};

export default NavPicker;
