import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './products-add-stepper.styles';
import { config } from '../../../configs';

const { productStepsLabels } = config;

export default function ProductsStepper({ steps }) {
  const styles = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={styles.root}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {productStepsLabels.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {steps[index]}
              <div className={styles.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={styles.button}
                  >
                    Назад
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleNext}
                    className={styles.button}
                  >
                    {activeStep === productStepsLabels.length - 1
                      ? 'Додати продукт'
                      : 'Далі'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === productStepsLabels.length && (
        <Paper square elevation={0} className={styles.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={styles.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}

ProductsStepper.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.object).isRequired
};
