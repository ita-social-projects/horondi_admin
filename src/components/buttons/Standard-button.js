import React from 'react';
import { Button } from '@material-ui/core';

const StandardButton = ({ eventHandler, title, ...props }) => (
  <Button color='primary' variant='contained' onClick={eventHandler} {...props}>
    {title}
  </Button>
);

export default StandardButton;
