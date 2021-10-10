import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { TextField, FormControl } from '@material-ui/core';

import { useStyles } from './text-input.styles';

const TextInput = ({
  name,
  handleBlur,
  handleChange,
  type,
  values,
  touched,
  errors,
  className,
  onValueChange,
  ...props
}) => {
  const styles = useStyles();

  useEffect(() => {
    onValueChange(values[name], values);
  }, [values[name]]);

  return (
    <FormControl className={styles.formControl}>
      <React.Fragment key={name}>
        <TextField
          name={name}
          type={type}
          variant='outlined'
          multiline={type !== 'number'}
          onBlur={handleBlur}
          onChange={handleChange}
          error={touched[name] && !!errors[name]}
          {...props}
          className={`${styles.textField} ${className}`}
        />
      </React.Fragment>
    </FormControl>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  onValueChange: PropTypes.func,
  className: PropTypes.string,
  values: PropTypes.objectOf(PropTypes.object),
  touched: PropTypes.objectOf(PropTypes.object),
  errors: PropTypes.objectOf(PropTypes.object)
};

TextInput.defaultProps = {
  type: 'text',
  handleChange: noop,
  handleBlur: noop,
  onValueChange: noop,
  className: '',
  values: {},
  touched: {},
  errors: {}
};

export default TextInput;
