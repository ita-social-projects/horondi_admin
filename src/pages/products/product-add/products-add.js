import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Paper } from '@material-ui/core';
import { useStyles } from './products-add.styles';

import useProductHandlers from '../../../hooks/product/use-product-handlers';
import CustomizedStepper from '../../../components/customized-stepper/customized-stepper';
import {
  getProductSpecies,
  getProductOptions
} from '../../../redux/products/products.actions';
import ProductAddInfo from './product-add-info';
import ProductAddSpecies from './product-add-species';
import ProductAddOptions from './product-add-options';
import ProductAddImages from './product-add-images';
import ProductAddSubmit from './product-add-submit';
import ProductAddPrice from './product-add-price';

const ProductsAdd = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const {
    colors,
    patterns,
    models,
    selectedOptions,
    setOptions,
    additions,
    createProductInfo,
    options,
    getModelToSend,
    getPatternToSend,
    getColorsToSend,
    getSelectedCategory,
    additionalImages,
    setAdditionalImages,
    primaryImage,
    setPrimaryImage
  } = useProductHandlers();

  useEffect(() => {
    dispatch(getProductSpecies());
    dispatch(getProductOptions());
  }, [dispatch]);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const productAddInfoStep = (
    <ProductAddInfo
      createProductInfo={createProductInfo}
      handleNext={handleNext}
      activeStep={activeStep}
    />
  );

  const productAddSpeciesStep = (
    <ProductAddSpecies
      activeStep={activeStep}
      handleNext={handleNext}
      handleBack={handleBack}
      colors={colors}
      patterns={patterns}
      models={models}
      getColorsToSend={getColorsToSend}
      getModelToSend={getModelToSend}
      getPatternToSend={getPatternToSend}
      getSelectedCategory={getSelectedCategory}
    />
  );

  const productAddPriceStep = (
    <ProductAddPrice
      handleBack={handleBack}
      handleNext={handleNext}
      activeStep={activeStep}
    />
  );

  const productAddOptionsStep = (
    <ProductAddOptions
      selectedOptions={selectedOptions}
      setOptions={setOptions}
      additions={additions}
      activeStep={activeStep}
      handleNext={handleNext}
      handleBack={handleBack}
      options={options}
    />
  );

  const productAddImagesStep = (
    <ProductAddImages
      activeStep={activeStep}
      handleNext={handleNext}
      handleBack={handleBack}
      primaryImage={primaryImage}
      setPrimaryImage={setPrimaryImage}
      additionalImages={additionalImages}
      setAdditionalImages={setAdditionalImages}
    />
  );

  const productAddSubmitStep = (
    <ProductAddSubmit
      selectedOptions={selectedOptions}
      additions={additions}
      activeStep={activeStep}
      handleBack={handleBack}
      getSelectedCategory={getSelectedCategory}
    />
  );

  const steps = [
    productAddInfoStep,
    productAddSpeciesStep,
    productAddPriceStep,
    productAddOptionsStep,
    productAddImagesStep,
    productAddSubmitStep
  ];

  return (
    <Paper className={styles.container}>
      <CustomizedStepper steps={steps} activeStep={activeStep} />
    </Paper>
  );
};

export default ProductsAdd;
