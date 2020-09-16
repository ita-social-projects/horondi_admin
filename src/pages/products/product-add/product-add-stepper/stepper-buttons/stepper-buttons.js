import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { config } from '../../../../../configs';
import { useStyles } from './stepper-buttons.styles';
import {productsTranslations} from "../../../../../translations/product.translations";

const { productStepsLabels } = config;
const { NEXT, CREATE_PRODUCT, BACK } = productsTranslations

const StepperButtons = ({ handleNext, handleBack, activeStep, type }) => {
  const styles = useStyles();

  return (
    <div>
      <Button
        disabled={activeStep === 0}
        onClick={handleBack}
        className={styles.button}
      >
          {BACK}
      </Button>
      <Button
        variant='contained'
        color='primary'
        type={type}
        onClick={handleNext}
        className={styles.button}
      >
        {activeStep === productStepsLabels.length - 1
          ? CREATE_PRODUCT
          : NEXT}
      </Button>
    </div>
  );
};

StepperButtons.propTypes = {
  activeStep: PropTypes.number.isRequired,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
  type: PropTypes.string
};

StepperButtons.defaultProps = {
  handleNext: () => {},
  handleBack: () => {},
  type: null
};

export default StepperButtons;
