import React from 'react';

import { Button } from '@material-ui/core';

const NEXT_BUTTON_TITLE = 'Next';

const StepperNextButton = (/* { eventHandler } */) => (
  <Button
    id='next'
    variant='contained'
    color='primary'
    type='submit' /* onClick={eventHandler} */
  >
    {NEXT_BUTTON_TITLE}
  </Button>
);

export default StepperNextButton;
