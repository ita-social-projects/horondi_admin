import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import useProductValidation from '../../../../hooks/product/use-product-validation';

import { setProductToSend } from '../../../../redux/products/products.actions';
import StepperControlButtons from '../../../../components/stepper-control-buttons/stepper-control-buttons';
import ProductInfoContainer from '../../../../containers/product-info-container';

const ProductAddInfo = ({ activeStep, handleNext, createProductInfo }) => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    const productInfo = createProductInfo(values);
    dispatch(setProductToSend(productInfo));
    handleNext();
  };

  const {
    shouldValidate,
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    handleValuesSubmit
  } = useProductValidation({}, onSubmit, '', 'productToSend');

  return (
    <div>
      <ProductInfoContainer
        shouldValidate={shouldValidate}
        values={values}
        errors={errors}
        touched={touched}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleSubmit={handleSubmit}
        setFieldValue={setFieldValue}
        variant='outlined'
      />
      <StepperControlButtons
        activeStep={activeStep}
        handleNext={handleValuesSubmit}
      />
    </div>
  );
};

ProductAddInfo.propTypes = {
  handleNext: PropTypes.func.isRequired,
  activeStep: PropTypes.number.isRequired,
  createProductInfo: PropTypes.func.isRequired
};

export default ProductAddInfo;
