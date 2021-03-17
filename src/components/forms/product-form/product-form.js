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
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import { find } from 'lodash';
import useProductHandlers from '../../../hooks/product/use-product-handlers';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import useProductValidation from '../../../hooks/product/use-product-validation';
import { useStyles } from './product-form.styles';

import ProductInfoContainer from '../../../containers/product-info-container';
import ProductSpeciesContainer from '../../../containers/product-species-container';

import {
  addProduct,
  deleteProduct,
  setFilesToUpload,
  updateProduct
} from '../../../redux/products/products.actions';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';

import { productsTranslations } from '../../../translations/product.translations';
import ProductCarousel from './product-carousel';
import DeleteButton from '../../buttons/delete-button';
import { config } from '../../../configs';
import { BackButton } from '../../buttons';
import ProductMaterialsContainer from '../../../containers/product-materials-container';
import ProductAddImages from '../../../pages/products/product-add/product-add-images';
import { selectSelectedProductAndDetails } from '../../../redux/selectors/products.selectors';
import CommentsSection from '../../comments-section/comments-section';
import { GET_PRODUCT_COMMENTS } from '../../../redux/comments/comments.types';
import CheckboxOptions from '../../checkbox-options';

const { priceLabel } = config.labels.product;

const {
  DELETE_PRODUCT_MESSAGE,
  DELETE_PRODUCT_TITLE,
  SAVE,
  PRODUCT_SPECIFICATION,
  PRODUCT_PRICE,
  PRODUCT_MATERIALS
} = productsTranslations;

const { SHOW_COMMENTS_TITLE, HIDE_COMMENTS_TITLE } = config.buttonTitles;

const ProductForm = ({ isEdit }) => {
  const styles = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const dispatch = useDispatch();

  const { details } = useSelector(selectSelectedProductAndDetails);

  const product = useSelector(({ Products }) => Products.selectedProduct);

  const buttonSize = useMemo(() => (matches ? 'small' : 'medium'), [matches]);

  const [isFieldsChanged, toggleFieldsChanged] = useState(false);

  const [showComments, setShowComments] = useState(false);

  const formikPriceValue = {
    basePrice: Math.round(product?.basePrice[1]?.value / 100) || 0
  };

  const { openSuccessSnackbar } = useSuccessSnackbar();

  const {
    createProductInfo,
    models,
    innerColors,
    setInnerColors,
    mainColors,
    setMainColors,
    bottomColors,
    setBottomColors,
    sizes,
    setSizes,
    getIdFromItem,
    setModels,
    setAdditionalImages,
    additionalImages,
    setPrimaryImage,
    primaryImage,
    setProductImageDisplayed,
    productImageDisplayed
  } = useProductHandlers();

  const { categories, materials, patterns, closures } = details;

  const formikSpeciesValues = {
    category: product?.category?._id || '',
    model: product?.model?._id || '',
    pattern: product?.pattern?._id || '',
    strapLengthInCm: product?.strapLengthInCm || 0,
    closure: product?.closure?._id || '',
    available: product.available || false,
    isHotItem: product.isHotItem || false,
    sizes: product?.sizes?.map((el) => getIdFromItem(el) || [])
  };
  const formikMaterialsValues = {
    innerMaterial: product?.innerMaterial?.material?._id || '',
    innerColor: product?.innerMaterial?.color?._id || '',
    mainMaterial: product?.mainMaterial?.material?._id || '',
    mainColor: product?.mainMaterial?.color?._id || '',
    bottomMaterial: product?.bottomMaterial?.material?._id || '',
    bottomColor: product?.bottomMaterial?.color?._id || ''
  };

  const onSubmit = (formValues) => {
    const {
      strapLengthInCm,
      pattern,
      model,
      category,
      basePrice,
      closure,
      available,
      isHotItem,
      sizes: sizeToSend
    } = formValues;

    const productInfo = createProductInfo(formValues);
    if (!isEdit) {
      setShouldValidate(true);
      if (primaryImage && additionalImages.length) {
        dispatch(setFilesToUpload([primaryImage, ...additionalImages]));
      } else if (primaryImage) {
        dispatch(setFilesToUpload([primaryImage]));
      }
      dispatch(
        addProduct({
          closure,
          sizes: sizeToSend,
          ...productInfo,
          pattern,
          model,
          category,
          basePrice,
          strapLengthInCm,
          available,
          isHotItem
        })
      );
      return;
    }
    dispatch(
      updateProduct({
        product: {
          closure,
          sizes: sizeToSend,
          ...productInfo,
          pattern,
          model,
          category,
          basePrice,
          strapLengthInCm,
          available,
          isHotItem
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
    formikPriceValue,
    formikMaterialsValues
  );

  useEffect(() => {
    if (values.category)
      setModels(
        find(categories, (category) => category._id === values.category)
          ?.models || []
      );
    if (values.model) {
      setSizes(
        find(models, (model) => model._id === values.model)?.sizes || []
      );
    }
    if (values.innerMaterial) {
      setInnerColors(
        find(
          materials.inner,
          (material) => material._id === values.innerMaterial
        )?.colors || []
      );
    }
    if (values.bottomMaterial) {
      setBottomColors(
        find(
          materials.bottom,
          (material) => material._id === values.bottomMaterial
        )?.colors || []
      );
    }
    if (values.mainMaterial) {
      setMainColors(
        find(materials.main, (material) => material._id === values.mainMaterial)
          ?.colors || []
      );
    }
  }, [
    values.category,
    values.model,
    models,
    categories,
    materials,
    values.innerMaterial,
    values.bottomMaterial,
    values.mainMaterial
  ]);
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
  const checkboxes = [
    {
      id: 'isHotItem',
      dataCy: 'isHotItem',
      checked: values.isHotItem,
      value: values.isHotItem,
      color: 'primary',
      label: 'Гарячий продукт',
      handler: () => setFieldValue('isHotItem', !values.isHotItem)
    },
    {
      id: 'available',
      dataCy: 'available',
      checked: values.available,
      value: values.available,
      color: 'primary',
      label: config.labels.pattern.available,
      handler: () => setFieldValue('available', !values.available)
    }
  ];

  const showCommentsHandler = () => setShowComments(!showComments);
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
            {isEdit ? (
              <ProductAddImages
                isEdit={isEdit}
                productImageDisplayed={productImageDisplayed}
                setProductImageDisplayed={setProductImageDisplayed}
                setAdditionalImages={setAdditionalImages}
                additionalImages={additionalImages}
                setPrimaryImage={setPrimaryImage}
                primaryImage={primaryImage}
                validate={shouldValidate}
                displayed={product.images.primary.thumbnail}
              />
            ) : (
              <ProductAddImages
                productImageDisplayed={productImageDisplayed}
                setProductImageDisplayed={setProductImageDisplayed}
                setAdditionalImages={setAdditionalImages}
                additionalImages={additionalImages}
                setPrimaryImage={setPrimaryImage}
                primaryImage={primaryImage}
                validate={shouldValidate}
              />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={7} xl={9}>
          <CheckboxOptions options={checkboxes} />
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
              categories={categories}
              closures={closures}
              sizes={sizes}
              setSizes={setSizes}
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
              <Typography className={styles.title}>
                {PRODUCT_MATERIALS}
              </Typography>
            </Box>
            <Box mt={3} ml={1}>
              <ProductMaterialsContainer
                innerMaterials={materials.inner}
                innerColors={innerColors}
                mainMaterials={materials.main}
                mainColors={mainColors}
                bottomMaterials={materials.bottom}
                bottomColors={bottomColors}
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleSubmit={handleSubmit}
                setFieldValue={setFieldValue}
                toggleFieldsChanged={toggleFieldsChanged}
              />
            </Box>
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
      </Grid>
      <Grid className={styles.showComments}>
        <Button
          variant='contained'
          color='primary'
          onClick={showCommentsHandler}
        >
          {showComments ? HIDE_COMMENTS_TITLE : SHOW_COMMENTS_TITLE}
        </Button>
        {showComments ? (
          <CommentsSection
            value={product._id}
            commentsType={GET_PRODUCT_COMMENTS}
          />
        ) : null}
      </Grid>
      <div className={styles.controlsBlock}>
        <BackButton />
      </div>
    </div>
  );
};

ProductForm.propTypes = {
  isEdit: PropTypes.bool
};

ProductForm.defaultProps = {
  isEdit: false
};

export default ProductForm;
