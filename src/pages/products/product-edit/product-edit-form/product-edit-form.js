import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Grid,
  Button,
  Typography,
  Box,
  Divider,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import useProductHandlers from '../../../../hooks/product/use-product-handlers';
import useSuccessSnackbar from '../../../../utils/use-success-snackbar';
import useProductValidation from '../../../../hooks/product/use-product-validation';
import { useStyles } from './product-edit-form.styles';

import ProductInfoContainer from '../../../../containers/product-info-container';
import ProductSpeciesContainer from '../../../../containers/product-species-container';
import ProductOptionsContainer from '../../../../containers/product-options-container';

import {
  deleteProduct,
  getModelsByCategory,
  updateProduct
} from '../../../../redux/products/products.actions';
import { closeDialog } from '../../../../redux/dialog-window/dialog-window.actions';

import { productsTranslations } from '../../../../translations/product.translations';
import ProductCarousel from './product-carousel';
import DeleteButton from '../../../../components/buttons/delete-button';
import { config } from '../../../../configs';

const { priceLabel } = config.labels.product;

const {
  DELETE_PRODUCT_MESSAGE,
  DELETE_PRODUCT_TITLE,
  DELETE_PRODUCT_BTN,
  SAVE,
  PRODUCT_SPECIFICATION,
  PRODUCT_OPTIONS,
  PRODUCT_PRICE
} = productsTranslations;

const ProductEditForm = () => {
  const styles = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const dispatch = useDispatch();
  const product = useSelector(({ Products }) => Products.selectedProduct);

  const size = useMemo(() => (matches ? 'small' : 'medium'), [matches]);

  const [isFieldsChanged, toggleFieldsChanged] = useState(false);

  const formikSpeciesValues = {
    category: product.category._id,
    subcategory: product.subcategory._id,
    model: product.model[0].value,
    pattern: product.pattern[0].value,
    colors: product.colors[0].simpleName[0].value
  };

  const formikPriceValue = {
    basePrice: Math.round(product.basePrice[1].value / 100)
  };

  const { openSuccessSnackbar } = useSuccessSnackbar();

  const {
    createProductInfo,
    getColorsToSend,
    getPatternToSend,
    getModelToSend,
    colors,
    patterns,
    models,
    options,
    getSelectedCategory,
    setOptions,
    selectedOptions,
    additions
  } = useProductHandlers();

  const uniqueSizes = useMemo(
    () => [
      ...new Set(
        product.options
          .filter(({ size }) => !!size)
          .map(({ size: { name } }) => name)
      )
    ],
    [product.options]
  );

  const uniqueBottomMaterials = useMemo(
    () => [
      ...new Set(
        product.options
          .filter(({ bottomMaterial: item }) => item && item.available)
          .map(({ bottomMaterial: item }) => item.name[0].value)
      )
    ],
    [product.options]
  );

  const uniqueAdditions = useMemo(
    () => [
      ...new Set(
        product.options
          .filter(({ additions }) => additions.length > 0)
          .map(
            ({ additions: [{ available, name }] }) => available && name[0].value
          )
      )
    ],
    [product.options]
  );

  useEffect(() => {
    if (product.options.length) {
      setOptions({
        sizes: uniqueSizes,
        bottomMaterials: uniqueBottomMaterials,
        additions: !!uniqueAdditions.length
      });
    }
  }, [
    product.options,
    setOptions,
    uniqueBottomMaterials,
    uniqueAdditions.length,
    uniqueSizes
  ]);

  const onSubmit = (values) => {
    const { colors, pattern, model, category, subcategory, basePrice } = values;

    const productInfo = createProductInfo(values);
    dispatch(
      updateProduct({
        product: {
          ...productInfo,
          colors: getColorsToSend(colors),
          pattern: getPatternToSend(pattern),
          model: getModelToSend(model)._id,
          images: product.images,
          options,
          category,
          subcategory,
          basePrice
        },
        id: product._id
      })
    );
    setShouldValidate(false);
    toggleFieldsChanged(false);
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
  } = useProductValidation(
    {},
    onSubmit,
    formikSpeciesValues,
    'selectedProduct',
    formikPriceValue
  );

  useEffect(() => {
    if (values.category) dispatch(getModelsByCategory(values.category));
  }, [values.category, dispatch]);

  const handleProductValidate = async () => {
    setShouldValidate(true);
    await submitForm();
  };

  const handleProductDelete = () => {
    const removeProduct = () => {
      dispatch(closeDialog());
      dispatch(deleteProduct({ id: product._id }));
    };
    openSuccessSnackbar(
      removeProduct,
      DELETE_PRODUCT_TITLE,
      DELETE_PRODUCT_MESSAGE,
      DELETE_PRODUCT_BTN
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Grid container spacing={2} className={styles.fixedButtons}>
          <Grid item className={styles.button}>
            <Button
              size={size}
              type='submit'
              variant='contained'
              color='primary'
              disabled={!isFieldsChanged}
              onClick={handleProductValidate}
            >
              {SAVE}
            </Button>
          </Grid>
          <Grid item className={styles.button}>
            <DeleteButton
              size={size}
              variant='outlined'
              onClick={handleProductDelete}
            >
              {DELETE_PRODUCT_TITLE}
            </DeleteButton>
          </Grid>
        </Grid>
      </div>
      <Grid container justify='center' spacing={3}>
        <Grid item xs={12} md={5} xl={3}>
          <Paper className={styles.paper}>
            <ProductCarousel toggleFieldsChanged={toggleFieldsChanged} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={7} xl={9}>
          <Paper className={styles.paper}>
            <ProductInfoContainer
              shouldValidate={shouldValidate}
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              handleSubmit={handleSubmit}
              toggleFieldsChanged={toggleFieldsChanged}
              setFieldValue={setFieldValue}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={styles.paper}>
            <Box mb={1}>
              <Typography className={styles.title}>
                {PRODUCT_SPECIFICATION}
              </Typography>
            </Box>
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
              toggleFieldsChanged={toggleFieldsChanged}
            />
            <Box mt={3}>
              <Divider />
            </Box>
            <Box mt={2}>
              <Typography className={styles.title}>{PRODUCT_PRICE}</Typography>
            </Box>
            <Box mt={3} ml={1}>
              <TextField
                className={styles.input}
                label={`${priceLabel.label}*`}
                type='number'
                name={priceLabel.name}
                inputProps={{ min: 0 }}
                error={touched[priceLabel.name] && !!errors[priceLabel.name]}
                value={values[priceLabel.name]}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Box>
            <Box mt={3}>
              <Divider />
            </Box>
            <Box mt={3}>
              <Typography className={styles.title}>
                {PRODUCT_OPTIONS}
              </Typography>
            </Box>
            <ProductOptionsContainer
              setOptions={setOptions}
              selectedOptions={selectedOptions}
              additions={additions}
              toggleFieldsChanged={toggleFieldsChanged}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductEditForm;
