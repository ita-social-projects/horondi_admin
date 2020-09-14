import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Paper } from '@material-ui/core';
import { useStyles } from './products-add.styles';

import useProductHandler from '../../../utils/use-product-handler';
import ProductsStepper from './product-add-stepper/product-add-stepper';
import {
  getProductSpecies,
  getProductOptions,
  addProduct
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
    productSpecies,
    colors,
    patterns,
    models,
    selectedOptions,
    setOptions,
    additions,
    productImages,
    setProductImages,
    productToSend,
    createProductInfo
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

  const handleAddProduct = () => {
    dispatch(addProduct(productToSend));
  };

  const productAddInfoStep = (
    <ProductAddInfo
      preferedLanguages={preferedLanguages}
      setPreferedLanguages={setPreferedLanguages}
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
    />
  );

  const productAddImagesStep = (
    <ProductAddImages
      productImages={productImages}
      setProductImages={setProductImages}
    />
  );

  const productAddSubmitStep = (
    <ProductAddSubmit
      preferedLanguages={preferedLanguages}
      productSpecies={productSpecies}
      productImages={productImages}
      selectedOptions={selectedOptions}
      additions={additions}
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
        handleAddProduct={handleAddProduct}
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </Paper>
  );
};

export default ProductsAdd;
