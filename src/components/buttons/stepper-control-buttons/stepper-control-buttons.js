import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Button, Grid } from '@material-ui/core';
import { noop } from 'lodash';
import { useStyles } from './stepper-control-buttons.styles';

import { config } from '../../../configs';
import { productsTranslations } from '../../../configs/product-translations';

const { stepsLabels } = config.labels.product;
const { NEXT, CREATE_PRODUCT, BACK } = productsTranslations;

const StepperControlButtons = ({
  handleNext,
  handleBack,
  activeStep,
  type
}) => {
  const styles = useStyles();
  const loading = useSelector(({ Products }) => Products.loading);

  return (
    <Grid container alignItems='center'>
      <Grid item>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className={styles.button}
        >
          {BACK}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant='contained'
          color='primary'
          type={type}
          onClick={handleNext}
          className={styles.button}
        >
          {activeStep === stepsLabels.length - 1 ? CREATE_PRODUCT : NEXT}
        </Button>
      </Grid>
      <Grid item>
        {loading ? (
          <Box mt={1} ml={2}>
            <CircularProgress size={35} />
          </Box>
        ) : null}
      </Grid>
    </Grid>
  );
};

StepperControlButtons.propTypes = {
  activeStep: PropTypes.number.isRequired,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
  type: PropTypes.string
};

StepperControlButtons.defaultProps = {
  handleNext: noop,
  handleBack: noop,
  type: 'button'
};

export default StepperControlButtons;
