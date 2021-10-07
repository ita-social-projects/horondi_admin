import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { FormControlLabel, Checkbox as MUICheckbox } from '@material-ui/core';

import { useStyles } from './checkbox.styles';

export const Checkbox = ({
  name,
  color,
  label,
  setFieldValue,
  handleChange,
  values,
  ...props
}) => {
  const styles = useStyles();
  const [value, setValue] = useState(false);

  useEffect(() => {
    setFieldValue(name, value);
  }, [value]);

  return (
    <React.Fragment key={label}>
      <FormControlLabel
        className={styles.formControl}
        id={name}
        label={label}
        control={<MUICheckbox {...{ name, color }} />}
        labelPlacement='end'
        checked={value}
        value={value}
        onChange={setFieldValue ? () => setValue(!value) : null}
        {...(handleChange ? { handleChange } : {})}
        {...props}
      />
    </React.Fragment>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  label: PropTypes.string.isRequired,
  values: PropTypes.objectOf(PropTypes.object),
  setFieldValue: PropTypes.func,
  handleChange: PropTypes.func
};

Checkbox.defaultProps = {
  color: 'primary',
  setFieldValue: noop,
  handleChange: noop,
  values: {}
};

export default Checkbox;
