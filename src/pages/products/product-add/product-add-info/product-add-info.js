import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import useProductValidation from '../../../../utils/use-product-validation';

import { setProductToSend } from '../../../../redux/products/products.actions';
import StepperButtons from '../product-add-stepper/stepper-buttons/stepper-buttons';
import ProductInfoContainer from '../../../../containers/product-info-container';

const ProductAddInfo = ({
  activeStep,
  handleNext,
  preferedLanguages,
  setPreferedLanguages,
  createProductInfo,
  checkedLanguages
}) => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    const productInfo = createProductInfo(values);
    dispatch(setProductToSend(productInfo));
    handleNext();
  };

  const {
    shouldValidate,
    setShouldValidate,
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    submitForm,
    setFieldValue
  } = useProductValidation(checkedLanguages, onSubmit, '', 'productToSend');

  const handleInfoSubmit = async () => {
    setShouldValidate(true);
    await submitForm();
  };

  return (
    <div>
      <ProductInfoContainer
        preferedLanguages={preferedLanguages}
        setPreferedLanguages={setPreferedLanguages}
        checkedLanguages={checkedLanguages}
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
      {checkedLanguages.length ? (
        <StepperButtons activeStep={activeStep} handleNext={handleInfoSubmit} />
      ) : null}
    </div>
  );
};

ProductAddInfo.propTypes = {
  preferedLanguages: PropTypes.objectOf(PropTypes.object).isRequired,
  checkedLanguages: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPreferedLanguages: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  activeStep: PropTypes.number.isRequired,
  createProductInfo: PropTypes.func.isRequired
};

export default ProductAddInfo;
