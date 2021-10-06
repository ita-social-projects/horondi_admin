import React from 'react';

import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { TextField, FormControl } from '@material-ui/core';

import { useStyles } from './text-input.styles';

const TextInput = ({ name, handleBlur, handleChange, error, ...props }) => {
  const styles = useStyles();

  return (
    <FormControl className={styles.formControl}>
      <React.Fragment key={name}>
        <TextField
          name={name}
          className={styles.textField}
          variant='outlined'
          multiline
          onBlur={handleBlur}
          onChange={handleChange}
          error={error}
          {...props}
        />
      </React.Fragment>
    </FormControl>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func
};

TextInput.defaultProps = {
  error: false,
  handleChange: noop,
  handleBlur: noop
};

export default TextInput;
