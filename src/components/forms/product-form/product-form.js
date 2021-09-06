import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
import DeleteButton from '../../buttons/delete-button';
import { config } from '../../../configs';
import { BackButton } from '../../buttons';
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

const {
  DELETE_PRODUCT_MESSAGE,
  DELETE_PRODUCT_TITLE,
  SAVE,
  PRODUCT_SPECIFICATION,
  PRODUCT_PRICE,
  PRODUCT_MATERIALS
} = productsTranslations;

const { SHOW_COMMENTS_TITLE, HIDE_COMMENTS_TITLE } = config.buttonTitles;

const { pathToProducts } = config.routes;

const ProductForm = ({ isEdit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { details } = useSelector(selectSelectedProductAndDetails);

  const product = useSelector(({ Products }) => Products.selectedProduct);

  const [isFieldsChanged, toggleFieldsChanged] = useState(false);

  const [isMountedFirst, setFirstMount] = useState(false);

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
    productImageDisplayed,
    setAdditionalImagesDisplayed,
    additionalImagesDisplayed
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
    sizes: product?.sizes?.map((el) => getIdFromItem(el) || []),
    images: {
      primary: {}
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
    if (!isEdit) {
      setShouldValidate(true);
      actionDispatchHandler(
        primaryImage && additionalImages.length,
        dispatch,
        setFilesToUpload,
        primaryImage,
        additionalImages
      );
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
    formikMaterialsValues
  );

  useEffect(() => {
    if (isMountedFirst) {
      toggleFieldsChanged(true);
    } else {
      setFirstMount(true);
    }
  }, [values]);
  const unblock = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (isFieldsChanged) {
      unblock.current = history.block((tx, action) =>
        window.confirm('Are you sure')
      );
    }
    return () => {
      if (unblock.current) unblock.current();
    };
  }, [history, isFieldsChanged]);

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
    values.mainMaterial
  ]);
  useUnsavedChangesHandler(values);

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
            <BackButton pathBack={pathToProducts} />
          </Grid>
          <Grid item className={styles.button}>
            <Button
              size='medium'
              type={productFormValues.submit}
              variant={productFormValues.contained}
              color={checkboxesValues.primary}
              disabled={!isFieldsChanged}
              onClick={handleProductValidate}
            >
              {SAVE}
            </Button>
          </Grid>
          <Grid item className={styles.button}>
            <DeleteButton
              size='medium'
              variant={productFormValues.outlined}
              onClickHandler={handleProductDelete}
            >
              {DELETE_PRODUCT_TITLE}
            </DeleteButton>
          </Grid>
        </Grid>
      </div>

      <Grid container justify={productFormValues.center} spacing={3}>
        <Grid item xs={12}>
          <Paper className={styles.paper}>
            <ProductAddImages
              isEdit={isEdit}
              setAdditionalImagesDisplayed={setAdditionalImagesDisplayed}
              additionalImagesDisplayed={additionalImagesDisplayed}
              productImageDisplayed={productImageDisplayed}
              setProductImageDisplayed={setProductImageDisplayed}
              setAdditionalImages={setAdditionalImages}
              additionalImages={additionalImages}
              setPrimaryImage={setPrimaryImage}
              primaryImage={primaryImage}
              validate={shouldValidate}
              displayed={product?.images?.primary?.thumbnail}
              toggleFieldsChanged={toggleFieldsChanged}
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
              Vasyl Lymych, [05.09.21 14:29]
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
                label={priceLabel.label}
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
