import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { setProductToSend } from '../../../../redux/products/products.actions';
import StepperButtons from '../product-add-stepper/stepper-buttons/stepper-buttons';
import ProductOptionsContainer from '../../../../containers/product-options-container';

const ProductAddOptions = ({
  selectedOptions,
  setOptions,
  additions,
  activeStep,
  handleNext,
  handleBack,
  options
}) => {
  const dispatch = useDispatch();

  const handleOptionsSubmit = () => {
    dispatch(setProductToSend({ options }));
    handleNext();
  };

  return (
    <div>
      <ProductOptionsContainer
        setOptions={setOptions}
        selectedOptions={selectedOptions}
        additions={additions}
      />
      <StepperButtons
        activeStep={activeStep}
        handleNext={handleOptionsSubmit}
        handleBack={handleBack}
      />
    </div>
  );
};

ProductAddOptions.propTypes = {
  selectedOptions: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.array, PropTypes.bool])
  ).isRequired,
  setOptions: PropTypes.func.isRequired,
  additions: PropTypes.arrayOf(PropTypes.object),
  activeStep: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired
};

ProductAddOptions.defaultProps = {
  additions: []
};

export default ProductAddOptions;
