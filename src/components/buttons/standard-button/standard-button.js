import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const StandardButton = ({ eventHandler, title, ...props }) => (
  <Button color='primary' variant='contained' onClick={eventHandler} {...props}>
    {title}
  </Button>
);

StandardButton.propTypes = {
  eventHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default StandardButton;
