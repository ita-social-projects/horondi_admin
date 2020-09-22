import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import useProductValidation from '../../../../utils/use-product-validation';

import { useStyles } from './product-add-species.styles';

import {
  getModelsByCategory,
  setProductToSend
} from '../../../../redux/products/products.actions';
import StepperButtons from '../product-add-stepper/stepper-buttons/stepper-buttons';
import ProductSpeciesContainer from '../../../../containers/product-species-container';

const ProductAddSpecies = ({
  colors,
  patterns,
  models,
  activeStep,
  handleNext,
  handleBack,
  getColorToSend,
  getPatternToSend,
  getModelToSend,
  getSelectedCategory
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { productToSend, modelsForSelectedCategory } = useSelector(
    ({ Products }) => ({
      productToSend: Products.productToSend,
      modelsForSelectedCategory:
        Products.productSpecies.modelsForSelectedCategory
    })
  );

  const onSubmit = (values) => {
    const { colors, pattern, model } = values;
    dispatch(
      setProductToSend({
        ...values,
        colors: getColorToSend(colors),
        pattern: getPatternToSend(pattern),
        model: getModelToSend(model)._id
      })
    );
    handleNext();
  };

  const selectedModel = useMemo(
    () =>
      productToSend.model.length && !(productToSend.model instanceof Object)
        ? modelsForSelectedCategory.find(
          ({ _id }) => _id === productToSend.model
        ).name[0].value
        : '',
    [productToSend.model, modelsForSelectedCategory]
  );

  const formikSpeciesValues = {
    category: productToSend.category,
    pattern: productToSend.pattern.length ? productToSend.pattern[0].value : '',
    colors: productToSend.colors.length
      ? productToSend.colors[0].simpleName[0].value
      : '',
    subcategory: productToSend.subcategory,
    model: selectedModel,
    basePrice: productToSend.basePrice,
    strapLengthInCm: productToSend.strapLengthInCm
  };

  const handleSpeciesSubmit = async () => {
    setShouldValidate(true);
    await submitForm();
  };

  const {
    setShouldValidate,
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    submitForm,
    setFieldValue
  } = useProductValidation('', onSubmit, formikSpeciesValues, 'productToSend');

  useEffect(() => {
    if (values.category) dispatch(getModelsByCategory(values.category));
  }, [values.category, dispatch]);

  return (
    <div className={styles.container}>
      <ProductSpeciesContainer
        models={models}
        patterns={patterns}
        colors={colors}
        getSelectedCategory={getSelectedCategory}
        values={values}
        errors={errors}
        touched={touched}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleSubmit={handleSubmit}
        setFieldValue={setFieldValue}
      />
      <div className={styles.buttons}>
        <StepperButtons
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleSpeciesSubmit}
        />
      </div>
    </div>
  );
};

ProductAddSpecies.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.array).isRequired,
  patterns: PropTypes.arrayOf(PropTypes.array).isRequired,
  models: PropTypes.arrayOf(PropTypes.array).isRequired,
  activeStep: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  getColorToSend: PropTypes.func.isRequired,
  getPatternToSend: PropTypes.func.isRequired,
  getModelToSend: PropTypes.func.isRequired,
  getSelectedCategory: PropTypes.func.isRequired
};

export default ProductAddSpecies;
