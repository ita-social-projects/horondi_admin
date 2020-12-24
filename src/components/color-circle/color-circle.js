import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import { useStyles } from './color-circle.styles';

const ColorCircle = ({ color, colorName, size, onDelete }) => {
  const styles = useStyles();
  return (
    <Tooltip title={colorName || color}>
      <div
        style={{
          backgroundColor: color,
          height: `${size}px`,
          width: `${size}px`
        }}
        className={styles.colorCircle}
        onClick={onDelete}
      />
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
  onDelete: () => {}
};

export default ColorCircle;
