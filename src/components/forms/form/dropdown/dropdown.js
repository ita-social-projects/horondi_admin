import React from 'react';

import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';

import { useStyles } from './dropdown.styles';

const Dropdown = ({
  handleChange,
  options,
  handleBlur,
  name,
  required,
  label,
  error,
  values
}) => {
  const styles = useStyles();

  return (
    <FormControl className={styles.formControl}>
      <InputLabel htmlFor={label}>
        {`${label}${required ? '*' : ''}`}
      </InputLabel>
      <Select
        name={name}
        error={error}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={!options || !options.length}
      >
        {options.map((option, idx) => (
          <MenuItem
            value={option.value}
            key={`dropdown-option-${option.name}-${idx}`}
          >
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.bool,
  values: PropTypes.objectOf(PropTypes.object)
};

Dropdown.defaultProps = {
  options: [],
  handleChange: noop,
  handleBlur: noop,
  required: false,
  label: '',
  error: false,
  values: {}
};

export default Dropdown;
