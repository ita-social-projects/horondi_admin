import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import {
  Paper,
  Grid,
  Button,
  Typography,
  Box,
  Divider
} from '@material-ui/core';
import useProductHandler from '../../../../utils/use-product-handler';
import useSuccessSnackbar from '../../../../utils/use-success-snackbar';
import useProductValidation from '../../../../utils/use-product-validation';

import { useStyles } from './product-edit-form.styles';
import 'react-multi-carousel/lib/styles.css';
import './product-edit-form.css';

import UploadButtonContainer from "../../../../containers/upload-button-container";
import ProductInfoContainer from '../../../../containers/product-info-container';
import ProductSpeciesContainer from '../../../../containers/product-species-container';
import ProductOptionsContainer from '../../../../containers/product-options-container';
import LoadingBar from '../../../../components/loading-bar';

import {
  deleteImages,
  deleteProduct,
  getModelsByCategory, setFilesToUpload,
  updateProduct
} from '../../../../redux/products/products.actions';
import { closeDialog } from '../../../../redux/dialog-window/dialog-window.actions';

import { config } from '../../../../configs';
import { productsTranslations } from '../../../../translations/product.translations';

const {
  product: { responsive },
  imagePrefix
} = config;
const {
  DELETE_PRODUCT_MESSAGE,
  DELETE_PRODUCT_TITLE,
  DELETE_PRODUCT_BTN,
  DELETE_IMAGE_MESSAGE,
  DELETE_IMAGE_TITLE
} = productsTranslations;

const ProductEditForm = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { product, modelsForSelectedCategory } = useSelector(
    ({ Products }) => ({
      product: Products.selectedProduct,
      modelsForSelectedCategory:
        Products.productSpecies.modelsForSelectedCategory
    })
  );

  const [isFieldsChanged, toggleFieldsChanged] = useState(false);
  const [productImages, setProductImages] = useState([])

  const formikSpeciesValues = {
    category: product.category._id,
    subcategory: product.subcategory._id,
    model: product.model[0].value,
    pattern: product.pattern[0].value,
    colors: product.colors[0].simpleName[0].value,
    basePrice: Math.round(product.basePrice[1].value / 100),
    strapLengthInCm: product.strapLengthInCm
  };

  const { openSuccessSnackbar } = useSuccessSnackbar();

  const {
    checkedLanguages,
    preferedLanguages,
    setPreferedLanguages,
    createProductInfo,
    getColorToSend,
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
  } = useProductHandler();

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
    setPreferedLanguages({
      uk: {
        name: 'uk',
        checked: !!product.name[0].value
      },
      en: {
        name: 'en',
        checked: !!product.name[1].value
      }
    });
  }, [product.name, setPreferedLanguages]);

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

  useEffect(() => {
    if(product.images) {
      const images = [
        {url: product.images.primary.large, prefix: true},
        ...product.images.additional.map(({ large }) => ({url: large, prefix: true}))
      ]
      setProductImages(images)
    }

    return () => {
      dispatch(setFilesToUpload([]))
    }
  }, [product.images])

  const onSubmit = (values) => {
    const {
      colors,
      pattern,
      model,
      category,
      subcategory,
      basePrice,
      strapLengthInCm
    } = values;
    const productInfo = createProductInfo(values);
    dispatch(
      updateProduct({
        product: {
          ...productInfo,
          colors: getColorToSend(colors),
          pattern: getPatternToSend(pattern),
          model: getModelToSend(model)._id,
          options,
          category,
          subcategory,
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
    checkedLanguages,
    onSubmit,
    formikSpeciesValues,
    'selectedProduct'
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

  const handleMultipleFilesLoad = async (e)=> {
    const { files } = e.target
    if(files && files[0]) {
      toggleFieldsChanged(true)
      const imagesNames = productImages.map(({ url }) => url);
      const newImages = Array.from(files).filter(({ name }) => !imagesNames.includes(name));
      const results = await Promise.all(convertToBase64(newImages))
      setProductImages((oldImages) => [...oldImages, ...results.map(image => ({ url: image, prefix: false }))])
      dispatch(setFilesToUpload(newImages))
    }
  }

  const convertToBase64 = (files) => (
      files.map(file=> (new Promise(res=> {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
            res(e.target.result);
          };
        })
      ))
  )

  const handleImagesDeleting = (id, url) => {
    const removeProduct = () => {
      dispatch(closeDialog());
      dispatch(setFilesToUpload([url]))
      dispatch(deleteImages(id))
    };
    openSuccessSnackbar(
        removeProduct,
        DELETE_IMAGE_TITLE,
        DELETE_IMAGE_MESSAGE,
        DELETE_PRODUCT_BTN
    );
  }

  const imagesForCarousel = productImages.map(({ prefix, url }) => (
      <div key={url}>
        <div
            className={styles.image}
            style={{
              background: `url(${prefix ? imagePrefix : ''}${url}) no-repeat center`,
              backgroundSize: 'cover'
            }}
        />
        <Grid container justify='center' spacing={2}>
          <Grid item>
            <Box mt={1}>
              <UploadButtonContainer
                  className={styles.imageBtn}
                  buttonLabel='НОВІ ФОТО'
                  onChangeHandler={handleMultipleFilesLoad}
                  startIcon={true}
                  multiple={true}
              />
            </Box>
          </Grid>
          <Grid item>
            <Box mt={1}>
              <Button
                  className={styles.imageBtn}
                  variant='outlined'
                  onClick={() => handleImagesDeleting(product._id, url)}
              >
                ВИДАЛИТИ
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>
  ));

  return (
    <div className={styles.container}>
      {modelsForSelectedCategory.length ? (
        <Grid container justify='center' spacing={3}>
          <Grid item xs={12} container spacing={2}>
            <Grid item>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={!isFieldsChanged}
                onClick={handleProductValidate}
              >
                Зберегти
              </Button>
            </Grid>
            <Grid item>
              <Button
                type='button'
                variant='outlined'
                onClick={handleProductDelete}
              >
                Видалити продукт
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5} xl={3}>
            <Paper className={styles.paper}>
              <Carousel
                className={styles.carousel}
                responsive={responsive}
                swipeable={false}
              >
                {imagesForCarousel}
              </Carousel>
            </Paper>
          </Grid>
          <Grid item xs={12} md={7} xl={9}>
            <Paper className={styles.paper}>
              <ProductInfoContainer
                preferedLanguages={preferedLanguages}
                setPreferedLanguages={setPreferedLanguages}
                checkedLanguages={checkedLanguages}
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
                  Специфікація продукту:
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
              <Box mt={3}>
                <Typography className={styles.title}>
                  Опційні параметри продукту:
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
      ) : (
        <LoadingBar />
      )}
    </div>
  );
};

export default ProductEditForm;
