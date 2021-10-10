import React, { Children, cloneElement } from 'react';

import PropTypes from 'prop-types';
import { noop } from 'lodash';

import {
  FormControl,
  FormControlLabel,
  RadioGroup as MUIRadioGroup,
  Radio as MUIRadio
} from '@material-ui/core';

import { useStyles } from './radio.styles';

const wrapInput = (props) => (input) => cloneElement(input, props);

export const Radio = ({ label, value, children, ...props }) => (
  <FormControlLabel
    value={value}
    label={
      <>
        {label && <span>{label}</span>}
        {children}
      </>
    }
    control={<MUIRadio />}
    {...props}
  />
);

export const RadioGroup = ({ name, handleChange, values, children }) => {
  const styles = useStyles();

  const wrapProps = {
    handleChange,
    values
  };

  return (
    <FormControl component='fieldset'>
      <MUIRadioGroup
        name={name}
        className={styles.textField}
        onChange={handleChange}
        value={values[name]}
      >
        {Children.map(children, wrapInput(wrapProps))}
      </MUIRadioGroup>
    </FormControl>
  );
};

Radio.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

Radio.defaultProps = {
  label: '',
  value: ''
};

RadioGroup.propTypes = {
  name: PropTypes.string,
  values: PropTypes.objectOf(PropTypes.object),
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  handleChange: PropTypes.func
};

RadioGroup.defaultProps = {
  name: '',
  values: {},
  handleChange: noop
};

export default { RadioGroup, Radio };
