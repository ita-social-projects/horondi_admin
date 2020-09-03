import React from 'react';

import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const SaveButton = ({ title, type, onClickHandler, ...props }) => (
  <Button
    variant='contained'
    color='primary'
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
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

SaveButton.defaultProps = {
  size: 'small',
  onClickHandler: () => {}
};

export default SaveButton;
