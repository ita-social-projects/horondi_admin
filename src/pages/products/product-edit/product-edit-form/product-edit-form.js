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

import {
  deleteProduct,
  updateProduct
} from '../../../../redux/products/products.actions';
import { closeDialog } from '../../../../redux/dialog-window/dialog-window.actions';

import { productsTranslations } from '../../../../translations/product.translations';
import ProductCarousel from './product-carousel';
import DeleteButton from '../../../../components/buttons/delete-button';
import CommentsPage from '../../../comments';
import { config } from '../../../../configs';
import { BackButton } from '../../../../components/buttons';

const { priceLabel } = config.labels.product;

const {
  DELETE_PRODUCT_MESSAGE,
  DELETE_PRODUCT_TITLE,
  SAVE,
  PRODUCT_SPECIFICATION,
  PRODUCT_PRICE
} = productsTranslations;

const ProductEditForm = () => {
  const styles = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const dispatch = useDispatch();
  const product = useSelector(({ Products }) => Products.selectedProduct);

  const buttonSize = useMemo(() => (matches ? 'small' : 'medium'), [matches]);

  const [isFieldsChanged, toggleFieldsChanged] = useState(false);

  const formikSpeciesValues = {
    category: product.category._id || '',
    model: product.model._id || '',
    pattern: product.pattern._id || '',
    strapLengthInCm: product.strapLengthInCm || 0
  };

  const formikPriceValue = {
    basePrice: Math.round(product.basePrice[1].value / 100)
  };

  const { openSuccessSnackbar } = useSuccessSnackbar();

  const {
    createProductInfo,
    colors: productColors,
    patterns,
    models,
    categories,
    setModels
  } = useProductHandlers();

  const onSubmit = (formValues) => {
    const { strapLengthInCm, pattern, model, category, basePrice } = formValues;
    console.log(formValues);
    const productInfo = createProductInfo(formValues);
    dispatch(
      updateProduct({
        product: {
          ...productInfo,
          images: product.images,
          pattern,
          model,
          category,
          basePrice,
          strapLengthInCm
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
    if (values.category)
      setModels(
        categories.find((category) => category._id === values.category)
          .models || []
      );
  }, [values.category, categories, dispatch]);

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
      DELETE_PRODUCT_MESSAGE,
      DELETE_PRODUCT_TITLE
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Grid container spacing={2} className={styles.fixedButtons}>
          <Grid item className={styles.button}>
            <Button
              size={buttonSize}
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
              size={buttonSize}
              variant='outlined'
              onClickHandler={handleProductDelete}
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
              colors={productColors}
              categories={categories}
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
          </Paper>
        </Grid>
        <CommentsPage productId={product._id} />
      </Grid>
      <div className={styles.controlsBlock}>
        <BackButton />
      </div>
    </div>
  );
};

export default ProductEditForm;
