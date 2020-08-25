import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from './user-input.styles';

const UserInput = ({ value, label, id }) => {
  const styles = useStyles();

  return (
    <TextField
      id={id}
      className={styles.textField}
      variant='outlined'
      label={label}
      value={value}
      InputLabelProps={{
        classes: {
          root: styles.inputLabel,
          shrink: 'shrink'
        }
      }}
      multiline
      disabled
    />
  );
};

UserInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default UserInput;
