import React from 'react';

import { Button } from '@material-ui/core';

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

export default SaveButton;
