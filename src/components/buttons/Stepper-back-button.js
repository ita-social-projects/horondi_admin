import React from 'react';

import { Button } from '@material-ui/core';

const BACK_BUTTON_TITLE = 'Back';

const StepperBackButton = (props) => {
  const { activeStep, eventHandler } = props;

  return (
    <Button disabled={activeStep === 0} onClick={eventHandler}>
      {BACK_BUTTON_TITLE}
    </Button>
  );
};

export default StepperBackButton;
