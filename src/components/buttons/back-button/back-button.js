import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import GO_BACK_TITLE from '../../../configs/button-titles';

const BackButton = ({ onClickHandler, type, color, ...props }) => (
  <Button
    type={type}
    color={color}
    variant='outlined'
    onClick={onClickHandler}
    {...props}
  >
    {GO_BACK_TITLE}
  </Button>
);

BackButton.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  type: PropTypes.string
};
BackButton.defaultProps = {
  color: 'primary',
  type: 'button'
};

export default BackButton;
