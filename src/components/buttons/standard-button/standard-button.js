import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const StandardButton = ({ onClickHandler, title, type, color, ...props }) => (
  <Button
    type={type}
    color={color}
    variant='contained'
    onClick={onClickHandler}
    {...props}
  >
    {title}
  </Button>
);

StandardButton.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  type: PropTypes.string
};
StandardButton.defaultProps = {
  color: 'primary',
  type: 'button'
};

export default StandardButton;
