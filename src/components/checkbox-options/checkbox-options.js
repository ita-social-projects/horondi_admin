import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Checkbox } from '@material-ui/core';

const CheckboxOptions = ({ options }) => {
  const mappedCheckboxes = options.map(
    ({ color, checked, label, value, handler, dataCy }) => (
      <FormControlLabel
        data-cy={dataCy}
        key={label}
        value={value}
        checked={checked}
        control={<Checkbox color={color} />}
        label={label}
        labelPlacement='start'
        onChange={handler}
      />
    )
  );
  return <>{mappedCheckboxes}</>;
};

CheckboxOptions.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      dataCy: PropTypes.string,
      key: PropTypes.string,
      className: PropTypes.string,
      label: PropTypes.string,
      labelPlacement: PropTypes.string,
      onChange: PropTypes.func,
      value: PropTypes.bool,
      checked: PropTypes.bool,
      control: PropTypes.string
    })
  )
};
CheckboxOptions.defaultProps = {
  options: {}
};

export default CheckboxOptions;
