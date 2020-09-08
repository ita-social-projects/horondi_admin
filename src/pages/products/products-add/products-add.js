import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Paper } from '@material-ui/core';
import { useStyles } from './products-add.styles';

import useProductHandler from '../../../utils/use-product-handler';
import ProductAddInfo from '../product-add-info';
import ProductsStepper from '../products-add-stepper/products-add-stepper';
import { getProductSpecies } from '../../../redux/products/products.actions';
import ProductAddSpecies from '../product-add-species/product-add-species';

const ProductsAdd = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const {
    productInputs,
    setProductInputs,
    preferedLanguages,
    setPreferedLanguages,
    productSelects,
    setProductSelects,
    colors,
    patterns,
    modelsForSelectedCategory,
    models,
    getModels
  } = useProductHandler();

  useEffect(() => {
    dispatch(getProductSpecies());
  }, [dispatch]);

  const handleInputChange = (event, idx) => {
    const { name, value } = event.target;
    const oldInput = productInputs[name];
    const newInput = [
      ...oldInput.slice(0, idx),
      { ...oldInput[idx], value },
      ...oldInput.slice(idx + 1)
    ];
    setProductInputs({
      ...productInputs,
      [name]: newInput
    });
  };

  const productAddInfoStep = (
    <ProductAddInfo
      productInputs={productInputs}
      onChangeHandler={handleInputChange}
      preferedLanguages={preferedLanguages}
      setPreferedLanguages={setPreferedLanguages}
    />
  );

  const productAddSpeciesStep = (
    <ProductAddSpecies
      productSelects={productSelects}
      setProductSelects={setProductSelects}
      colors={colors}
      patterns={patterns}
      modelsForSelectedCategory={modelsForSelectedCategory}
      getModels={getModels}
      models={models}
    />
  );

  const steps = [productAddInfoStep, productAddSpeciesStep];

  return (
    <Paper className={styles.container}>
      <ProductsStepper steps={steps} />
    </Paper>
  );
};

export default ProductsAdd;
