import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Grid,
  Button,
  Typography,
  Box,
  Divider
} from '@material-ui/core';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { find } from 'lodash';
import useProductHandlers from '../../../hooks/product/use-product-handlers';
import useProductValidation from '../../../hooks/product/use-product-validation';
import { useStyles } from './product-form.styles';
import ProductInfoContainer from '../../../containers/product-info-container';
import ProductSpeciesContainer from '../../../containers/product-species-container';
import { checkInitialValue } from '../../../utils/check-initial-values';
import {
  addProduct,
  setFilesToUpload,
  setPrimaryImageToUpload,
  updateProduct
} from '../../../redux/products/products.actions';
import { productsTranslations } from '../../../configs/product-translations';
import { config } from '../../../configs';
import { BackButton, SaveButton } from '../../buttons';
import ProductMaterialsContainer from '../../../containers/product-materials-container';
import ProductAddImages from '../../../pages/products/product-add/product-add-images';
import { selectSelectedProductAndDetails } from '../../../redux/selectors/products.selectors';
import CommentsSection from '../../comments-section/comments-section';
import { GET_PRODUCT_COMMENTS } from '../../../redux/comments/comments.types';
import CheckboxOptions from '../../checkbox-options';
import {
  actionDispatchHandler,
  setModelsHandler,
  setSizesHandler,
  setInnerColorsHandler,
  setBottomColorsHandler,
  setMainColorsHandler,
  getFormikMaterialsValues
} from '../../../utils/product-form';

import {
  checkboxesValues,
  productFormValues
} from '../../../consts/product-form';
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';

const { priceLabel } = config.labels.product;

const { PRODUCT_SPECIFICATION, PRODUCT_PRICE, PRODUCT_MATERIALS } =
  productsTranslations;

const { SHOW_COMMENTS_TITLE, HIDE_COMMENTS_TITLE, MODEL_SAVE_TITLE } =
  config.buttonTitles;

const { pathToProducts } = config.routes;
const { materialUiConstants } = config;

const ProductForm = ({ isEdit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { details } = useSelector(selectSelectedProductAndDetails);

  const product = useSelector(({ Products }) => Products.selectedProduct);

  const toggleFieldsChanged = useState(false)[1];

  const [isMountedFirst, setFirstMount] = useState(false);

  const [showComments, setShowComments] = useState(false);

  const formikPriceValue = {
    basePrice: Math.round(product?.basePrice) || 0
  };

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
    productImages,
    setProductImages
  } = useProductHandlers();

  const { categories, materials, patterns, closures } = details;

  const formikSpeciesValues = {
    category: product?.category?._id,
    model: product?.model?._id,
    pattern: product?.pattern?._id,
    strapLengthInCm: product?.strapLengthInCm || 0,
    closure: product?.closure?._id,
    available: product.available || false,
    isHotItem: product.isHotItem || false,
    sizes: product?.sizes?.map((el) => getIdFromItem(el.size) || []),
    images: {
      primary: product.images?.primary || {},
      additional: product.images?.additional || []
    }
  };
  const formikMaterialsValues = getFormikMaterialsValues(product);
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
      images,
      sizes: sizeToSend
    } = formValues;

    const productInfo = createProductInfo(formValues);

    actionDispatchHandler(
      isEdit,
      dispatch,
      setFilesToUpload,
      setPrimaryImageToUpload,
      productImages
    );
    if (!isEdit) {
      setShouldValidate(true);

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
          images,
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
          isHotItem,
          images
        },
        id: product._id
      })
    );
    setShouldValidate(false);
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
    productFormValues.selectedProduct,
    formikPriceValue,
    formikMaterialsValues,
    product?.images
  );

  const unblock = useUnsavedChangesHandler(values);

  useEffect(() => {
    if (isMountedFirst) {
      toggleFieldsChanged(true);
    } else {
      setFirstMount(true);
    }
  }, [values, isMountedFirst, toggleFieldsChanged]);

  useEffect(() => {
    setModelsHandler(values, setModels, find, categories);
    setSizesHandler(values, setSizes, find, models);
    setInnerColorsHandler(values, setInnerColors, find, materials);
    setBottomColorsHandler(values, setBottomColors, find, materials);
    setMainColorsHandler(values, setMainColors, find, materials);
  }, [
    values.category,
    values.model,
    models,
    categories,
    materials,
    values.innerMaterial,
    values.bottomMaterial,
    values.mainMaterial,
    setBottomColors,
    setInnerColors,
    setMainColors,
    setModels,
    setSizes,
    values
  ]);

  useEffect(() => {
    if (isEdit) {
      const previousImages = product.images.additional.map((e) => ({
        src: e,
        primary: false
      }));
      previousImages.push({
        src: product.images.primary,
        primary: true
      });
      setProductImages(previousImages);
    }
  }, [product.images, isEdit, setProductImages]);

  const handleProductValidate = async () => {
    setShouldValidate(true);

    await submitForm();

    if (unblock) unblock();
  };

  const checkboxes = [
    {
      id: checkboxesValues.isHotItem,
      dataCy: checkboxesValues.isHotItem,
      checked: values.isHotItem,
      value: values.isHotItem,
      color: checkboxesValues.primary,
      label: checkboxesValues.hotItemUa,
      handler: () =>
        setFieldValue(checkboxesValues.isHotItem, !values.isHotItem)
    },
    {
      id: checkboxesValues.available,
      dataCy: checkboxesValues.available,
      checked: values.available,
      value: values.available,
      color: checkboxesValues.primary,
      label: config.labels.pattern.available,
      handler: () =>
        setFieldValue(checkboxesValues.available, !values.available)
    }
  ];

  const valueEquality = checkInitialValue(
    {
      available: formikSpeciesValues.available,
      basePrice: formikPriceValue.basePrice,
      bottomColor: formikMaterialsValues.bottomColor,
      bottomMaterial: formikMaterialsValues.bottomMaterial,
      category: formikSpeciesValues.category,
      closure: formikSpeciesValues.closure,
      enDescription: product.description[1].value,
      enName: product.name[1].value,
      images: formikSpeciesValues.images,
      innerColor: formikMaterialsValues.innerColor,
      innerMaterial: formikMaterialsValues.innerMaterial,
      isHotItem: formikSpeciesValues.isHotItem,
      mainColor: formikMaterialsValues.mainColor,
      mainMaterial: formikMaterialsValues.mainMaterial,
      model: formikSpeciesValues.model,
      pattern: formikSpeciesValues.pattern,
      sizes: formikSpeciesValues.sizes,
      strapLengthInCm: formikSpeciesValues.strapLengthInCm,
      uaDescription: product.description[0].value,
      uaName: product.name[0].value
    },
    values
  );

  const showCommentsPanel = () => {
    if (product._id) {
      return (
        <Grid className={styles.showComments}>
          <Button
            variant={productFormValues.contained}
            color={checkboxesValues.primary}
            onClick={showCommentsHandler}
          >
            {showComments ? HIDE_COMMENTS_TITLE : SHOW_COMMENTS_TITLE}
          </Button>
          {showComments ? (
            <CommentsSection
              id={product._id}
              commentsType={GET_PRODUCT_COMMENTS}
            />
          ) : null}
        </Grid>
      );
    }
  };

  const showCommentsHandler = () => setShowComments(!showComments);
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Grid container spacing={2} className={styles.fixedButtons}>
          <Grid item className={styles.button}>
            <BackButton initial={!valueEquality} pathBack={pathToProducts} />
          </Grid>
          <Grid item className={styles.button}>
            <SaveButton
              data-cy={materialUiConstants.save}
              type={materialUiConstants.types.submit}
              title={MODEL_SAVE_TITLE}
              onClickHandler={handleProductValidate}
              values={values}
              errors={errors}
              unblockFunction={unblock}
            />
          </Grid>
        </Grid>
      </div>

      <Grid container justify={productFormValues.center} spacing={3}>
        <Grid item xs={12}>
          <Paper className={styles.paper}>
            <ProductAddImages
              isEdit={isEdit}
              productImages={productImages}
              setProductImages={setProductImages}
              toggleFieldsChanged={toggleFieldsChanged}
              setFieldValue={setFieldValue}
              errors={errors}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
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
                innerMaterials={materials?.inner || []}
                innerColors={innerColors}
                mainMaterials={materials?.main || []}
                mainColors={mainColors}
                bottomMaterials={materials?.bottom || []}
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
                type={productFormValues.number}
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
      {showCommentsPanel()}
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
