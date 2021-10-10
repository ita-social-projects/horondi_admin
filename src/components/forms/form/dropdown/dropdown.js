import React, { useEffect } from 'react';

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
  values,
  touched,
  errors,
  setFieldValue,
  onValueChange,
  className,
  children,
  variant,
  ...props
}) => {
  const styles = useStyles();

  useEffect(() => {
    onValueChange(values[name], values);
  }, [values[name]]);

  const isSimpleDropdown = variant !== 'outlined';

  return (
    <FormControl
      className={`
      ${styles.formControl} 
      ${isSimpleDropdown ? styles.dropdown : ''} ${className}`}
      variant={variant}
      {...props}
    >
      <InputLabel htmlFor={label}>
        {`${label}${required ? '*' : ''}`}
      </InputLabel>
      <Select
        name={name}
        error={touched[name] && !!errors[name]}
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
      {children}
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
  values: PropTypes.objectOf(PropTypes.object),
  touched: PropTypes.objectOf(PropTypes.object),
  errors: PropTypes.objectOf(PropTypes.object),
  setFieldValue: PropTypes.func,
  onValueChange: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

Dropdown.defaultProps = {
  options: [],
  handleChange: noop,
  handleBlur: noop,
  required: false,
  label: '',
  values: {},
  touched: {},
  errors: {},
  setFieldValue: noop,
  onValueChange: noop,
  className: '',
  variant: ''
};

export default Dropdown;
