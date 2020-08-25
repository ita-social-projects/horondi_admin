import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Paper } from '@material-ui/core';
import { useStyles } from './options.styles';

const Options = ({ options }) => {
  const styles = useStyles();

  const mappedOptions = options.map(
    ({ dataCy, className, variant, label, value, handler, required }) => (
      <TextField
        data-cy={dataCy}
        key={label}
        className={className}
        variant={variant}
        label={label}
        value={value}
        onChange={handler}
        required={required}
        multiline
      />
    )
  );
  return <Paper className={styles.patternItem}>{mappedOptions}</Paper>;
};
Options.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      dataCy: PropTypes.string,
      key: PropTypes.string,
      className: PropTypes.string,
      variant: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string,
      onChange: PropTypes.func,
      required: PropTypes.bool,
      multiline: PropTypes.bool
    })
  )
};
Options.defaultProps = {
  options: {}
};

export default Options;
