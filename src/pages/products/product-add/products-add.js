import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Paper } from '@material-ui/core';
import { useStyles } from './products-add.styles';

import useProductHandler from '../../../utils/use-product-handler';
import ProductsStepper from './product-add-stepper/product-add-stepper';
import {
  getProductSpecies,
  getProductOptions
} from '../../../redux/products/products.actions';
import ProductAddInfo from './product-add-info';
import ProductAddSpecies from './product-add-species/product-add-species';
import ProductAddOptions from './product-add-options/product-add-options';
import ProductAddImages from './product-add-images/product-add-images';
import ProductAddSubmit from './product-add-submit';

const ProductsAdd = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const {
    preferedLanguages,
    setPreferedLanguages,
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
    getColorToSend,
    getSelectedCategory,
    additionalImages,
    setAdditionalImages,
    primaryImage,
    setPrimaryImage,
    checkedLanguages
  } = useProductHandler();

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
      preferedLanguages={preferedLanguages}
      setPreferedLanguages={setPreferedLanguages}
      createProductInfo={createProductInfo}
      handleNext={handleNext}
      activeStep={activeStep}
      checkedLanguages={checkedLanguages}
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
      getColorToSend={getColorToSend}
      getModelToSend={getModelToSend}
      getPatternToSend={getPatternToSend}
      getSelectedCategory={getSelectedCategory}
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
      checkedLanguages={checkedLanguages}
    />
  );

  const steps = [
    productAddInfoStep,
    productAddSpeciesStep,
    productAddOptionsStep,
    productAddImagesStep,
    productAddSubmitStep
  ];

  return (
    <Paper className={styles.container}>
      <ProductsStepper
        steps={steps}
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </Paper>
  );
};

export default ProductsAdd;
