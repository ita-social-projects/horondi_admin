import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { FormControl, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useStyles } from './combo-box.styles';

export const ComboBox = ({
  children,
  handleBlur,
  handleChange,
  errors,
  values,
  touched,
  options,
  name,
  placeholder,
  label,
  setFieldValue,
  onValueChange,
  defaultValue,
  ...props
}) => {
  const styles = useStyles();

  useEffect(() => {
    onValueChange(values[name], values);
  }, [values[name]]);

  return (
    <FormControl>
      <Autocomplete
        id={name}
        name={name}
        className={styles.autoComplete}
        multiple
        freeSolo
        options={options}
        getOptionLabel={(option) =>
          `${option.modelId.name[0].value} | ${option.name}`
        }
        defaultValue={defaultValue}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched[name] && !!errors[name]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            label={label}
            placeholder={placeholder}
            fullWidth
          />
        )}
      />
    </FormControl>
  );
};

ComboBox.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  onValueChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  errors: PropTypes.objectOf(PropTypes.object),
  values: PropTypes.objectOf(PropTypes.object),
  touched: PropTypes.objectOf(PropTypes.object),
  options: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  setFieldValue: PropTypes.func,
  defaultValue: PropTypes.string
};

ComboBox.defaultProps = {
  onValueChange: noop,
  handleBlur: noop,
  handleChange: noop,
  errors: {},
  values: {},
  touched: {},
  options: [],
  name: '',
  placeholder: '',
  label: '',
  setFieldValue: noop,
  defaultValue: ''
};

export default ComboBox;
