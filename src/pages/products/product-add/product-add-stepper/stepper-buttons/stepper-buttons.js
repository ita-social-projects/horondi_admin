import React from 'react';
import PropTypes from 'prop-types';
import {Box, Button, Grid} from '@material-ui/core';
import { config } from '../../../../../configs';
import { useStyles } from './stepper-buttons.styles';
import {productsTranslations} from "../../../../../translations/product.translations";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useSelector} from "react-redux";

const { productStepsLabels } = config;
const { NEXT, CREATE_PRODUCT, BACK } = productsTranslations

const StepperButtons = ({ handleNext, handleBack, activeStep, type }) => {
  const styles = useStyles();
  const loading = useSelector(({ Products }) => Products.loading)

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
                {activeStep === productStepsLabels.length - 1
                    ? CREATE_PRODUCT
                    : NEXT}
            </Button>
        </Grid>
        <Grid item>
            {loading
                ? <Box mt={1} ml={2} >
                    <CircularProgress size={35} />
                </Box>
                : null}
        </Grid>
    </Grid>
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
