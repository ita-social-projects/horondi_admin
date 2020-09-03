import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const StandardButton = ({ onClickHandler, title, ...props }) => (
  <Button
    color='primary'
    variant='contained'
    onClick={onClickHandler}
    {...props}
  >
    {title}
  </Button>
);

StandardButton.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default StandardButton;
