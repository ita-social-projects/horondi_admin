import React from 'react';

import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const SaveButton = ({ title, type, eventHandler, ...props }) => (
  <Button
    variant='contained'
    color='primary'
    type={type}
    onClick={eventHandler}
    {...props}
  >
    {title}
  </Button>
);

SaveButton.propTypes = {
  eventHandler: PropTypes.func,
  size: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

SaveButton.defaultProps = {
  size: 'small',
  eventHandler: () => {}
};
export default SaveButton;
