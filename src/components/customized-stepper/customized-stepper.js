import React from 'react';
import PropTypes from 'prop-types';

import { Stepper, Step, StepLabel, StepContent } from '@material-ui/core';
import { useStyles } from './customized-stepper.styles';
import { config } from '../../configs';

const { stepsLabels } = config.product;

const CustomizedStepper = ({ steps, activeStep }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {stepsLabels.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>{steps[index]}</StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

CustomizedStepper.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.node).isRequired,
  activeStep: PropTypes.number.isRequired
};

export default CustomizedStepper;
