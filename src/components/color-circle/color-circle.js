import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import { noop } from 'lodash';
import { useStyles } from './color-circle.styles';

const ColorCircle = ({ color, colorName, size, onDelete }) => {
  const styles = useStyles({ color, size });
  return (
    <Tooltip title={colorName || color}>
      <div className={styles.colorCircle} onClick={onDelete} />
    </Tooltip>
  );
};

ColorCircle.propTypes = {
  color: PropTypes.string.isRequired,
  colorName: PropTypes.string,
  size: PropTypes.string.isRequired,
  onDelete: PropTypes.func
};

ColorCircle.defaultProps = {
  colorName: '',
  onDelete: noop()
};

export default ColorCircle;
