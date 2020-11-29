import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import StepperControlButtons from '../../../../components/stepper-control-buttons';
import { config } from '../../../../configs';
import useProductValidation from '../../../../hooks/product/use-product-validation';
import { setProductToSend } from '../../../../redux/products/products.actions';

const {
  priceLabel: { name, label }
} = config.labels.product;

const ProductAddPrice = ({ activeStep, handleBack, handleNext }) => {
  const dispatch = useDispatch();
  const basePrice = useSelector(
    ({ Products }) => Products.productToSend.basePrice
  );

  const onSubmit = ({ initialPrice }) => {
    dispatch(setProductToSend({ initialPrice }));
    handleNext();
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
    handleValuesSubmit
  } = useProductValidation('', onSubmit, '', 'productToSend', { basePrice });

  return (
    <form onSubmit={handleSubmit}>
      <Box m={1}>
        <TextField
          label={`${label}'*'`}
          type='number'
          name={name}
          inputProps={{ min: 0 }}
          error={touched[name] && !!errors[name]}
          value={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched[name] && errors[name]}
        />
      </Box>
      <Box mt={3}>
        <StepperControlButtons
          handleNext={handleValuesSubmit}
          handleBack={handleBack}
          activeStep={activeStep}
        />
      </Box>
    </form>
  );
};

ProductAddPrice.propTypes = {
  activeStep: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired
};

export default ProductAddPrice;
