import React from 'react';

import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { TextField, FormControl } from '@material-ui/core';

import { useStyles } from './text-input.styles';

const TextInput = ({
  name,
  handleBlur,
  handleChange,
  error,
  type,
  className,
  ...props
}) => {
  const styles = useStyles();

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
          error={error}
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
  error: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  className: PropTypes.string
};

TextInput.defaultProps = {
  error: false,
  type: 'text',
  handleChange: noop,
  handleBlur: noop,
  className: ''
};

export default TextInput;
