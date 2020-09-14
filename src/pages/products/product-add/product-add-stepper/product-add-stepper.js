import React from 'react';
import PropTypes from 'prop-types';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import { useStyles } from './product-add-stepper.styles';
import { config } from '../../../../configs';

const { productStepsLabels } = config;

export default function ProductsStepper({
  steps,
  handleAddProduct,
  activeStep,
  handleNext,
  handleBack
}) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {productStepsLabels.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {steps[index]}
              {/* <div className={styles.actionsContainer}>
								<div>
									<Button
										disabled={activeStep === 0}
										onClick={handleBack}
										className={styles.button}
									>
										Назад
									</Button>
									<Button
										variant="contained"
										color="primary"
										onClick={
											activeStep === productStepsLabels.length - 1 ? (
												handleAddProduct
											) : (
												handleNext
											)
										}
										className={styles.button}
									>
										{activeStep === productStepsLabels.length - 1 ? (
											'Створити продукт'
										) : (
											'Далі'
										)}
									</Button>
								</div>
							</div> */}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

ProductsStepper.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleAddProduct: PropTypes.func.isRequired,
  activeStep: PropTypes.bool.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired
};
