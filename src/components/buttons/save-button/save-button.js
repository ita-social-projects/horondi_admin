import React from 'react';

import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const SaveButton = ({ title, type, onClickHandler, color, ...props }) => (
  <Button
    variant='contained'
    color={color}
    type={type}
    onClick={onClickHandler}
    {...props}
  >
    {title}
  </Button>
);

SaveButton.propTypes = {
  onClickHandler: PropTypes.func,
  size: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

SaveButton.defaultProps = {
  size: 'small',
  color: 'primary',
  onClickHandler: () => {}
};

export default SaveButton;
