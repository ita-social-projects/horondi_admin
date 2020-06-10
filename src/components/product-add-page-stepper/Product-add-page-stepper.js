import React, { useState } from 'react';
import { Stepper, Step, StepLabel, StepContent } from '@material-ui/core';

import { SaveButton, StepperBackButton, StepperNextButton } from '../buttons';

import { config } from '../../config';

const { labels } = config.stepper;
const SAVE_LABEL = 'SAVE PRODUCT';
const STEP_ORIENTATION = 'vertical';

const ProductAddPageStepper = ({ steps, onSaveHandler }) => {
  const [activeStep, setActiveStep] = useState(0);
  const stepsLength = steps.length;

  const handleNext = (event) => {
    event.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const lastStep = stepsLength - 1;

  const stepperSteps = steps.map((step, index) => {
    const onSubmitHandler = lastStep === index ? onSaveHandler : handleNext;

    return (
      <Step key={labels[index]}>
        <StepLabel>{labels[index]}</StepLabel>
        <StepContent>
          <form onSubmit={onSubmitHandler}>
            {step}
            <div>
              <StepperBackButton
                activeStep={activeStep}
                eventHandler={handleBack}
              />
              {lastStep === index ? (
                <SaveButton id='savebutton' title={SAVE_LABEL} type='submit' />
              ) : (
                <StepperNextButton />
              )}
            </div>
          </form>
        </StepContent>
      </Step>
    );
  });

  return (
    <Stepper activeStep={activeStep} orientation={STEP_ORIENTATION}>
      {stepperSteps}
    </Stepper>
  );
};

export default ProductAddPageStepper;
