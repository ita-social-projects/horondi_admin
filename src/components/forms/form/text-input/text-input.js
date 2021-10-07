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
  ...props
}) => {
  const styles = useStyles();

  return (
    <FormControl className={styles.formControl}>
      <React.Fragment key={name} type='number'>
        <TextField
          name={name}
          type={type}
          className={styles.textField}
          variant='outlined'
          multiline={type !== 'number'}
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
  type: PropTypes.string,
  error: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func
};

TextInput.defaultProps = {
  error: false,
  type: 'text',
  handleChange: noop,
  handleBlur: noop
};

export default TextInput;
