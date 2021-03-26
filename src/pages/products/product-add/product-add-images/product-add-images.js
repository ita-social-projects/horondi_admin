import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Box, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './product-add-images.styles';
import { config } from '../../../../configs/index';

import { productsTranslations } from '../../../../translations/product.translations';
import ImageUploadContainer from '../../../../containers/image-upload-container';
import {
  setFilesToUpload,
  setPrimaryImageToUpload
} from '../../../../redux/products/products.actions';

const { REQUIRED_PHOTOS } = productsTranslations;

const ProductAddImages = ({
  setAdditionalImagesDisplayed,
  additionalImagesDisplayed,
  setProductImageDisplayed,
  productImageDisplayed,
  setAdditionalImages,
  additionalImages,
  setPrimaryImage,
  primaryImage,
  toggleFieldsChanged,
  validate,
  displayed,
  isEdit
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const product = useSelector(({ Products }) => Products.selectedProduct);
  const products = useSelector(({ Products }) => Products);

  useEffect(() => {
    if (product?.images?.additional) {
      setAdditionalImagesDisplayed(
        product?.images?.additional?.map((e) => config.imagePrefix + e?.large)
      );
    }
  }, [product?.images]);

  console.log(products);

  const imgUrl = config.imagePrefix + displayed;

  const PRODUCT_PHOTO_TEXT = {
    PRIMARY: 'Головне фото',
    ADDITIONAL: 'Додаткові фото'
  };

  const IMAGES_INDEXES = {
    FIRST_ADDITIONAL_IMAGE: 0,
    SECOND_ADDITIONAL_IMAGE: 1,
    THIRD_ADDITIONAL_IMAGE: 2
  };

  const imageUploadInputsId = {
    mainImageInput: 'mainImageInput',
    imageInput1: 'ImgInput1',
    imageInput2: 'ImgInput2',
    imageInput3: 'ImgInput3'
  };

  const handlePrimaryImageLoad = (e) => {
    toggleFieldsChanged(true);
    const reader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      reader.onload = (event) => {
        setProductImageDisplayed(event.target.result);
      };
      setPrimaryImage(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
    if (isEdit) {
      reader.onload = (event) => {
        setProductImageDisplayed(event.target.result);
      };
      dispatch(setPrimaryImageToUpload([e.target.files[0]]));
    }
  };

  const handleAdditionalImagesLoad = (e, index) => {
    const file = e?.target?.files[0];
    const reader = new FileReader();
    if (e.target.files && e.target.files[0] && !isEdit) {
      reader.onload = (event) => {
        const newArr = [...additionalImagesDisplayed];
        newArr[index] = event.target.result;
        setAdditionalImagesDisplayed(newArr);
      };
      e.persist();
      toggleFieldsChanged(true);
      const newArr = [...additionalImages];
      newArr[index] = file;
      setAdditionalImages(newArr);
      reader.readAsDataURL(e.target.files[0]);
    }
    if (isEdit) {
      reader.onload = (event) => {
        const newArr = [...additionalImagesDisplayed];
        newArr[index] = event.target.result;
        setAdditionalImagesDisplayed(newArr);
      };
      e.persist();
      toggleFieldsChanged(true);
      const newArr = [...products?.upload];
      newArr[index] = file;
      dispatch(setFilesToUpload(newArr));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const additionalFirstImageByIndexLoad = (e) =>
    handleAdditionalImagesLoad(e, IMAGES_INDEXES.FIRST_ADDITIONAL_IMAGE);
  const additionalFirstImageByIndexUpdate = (e) =>
    handleAdditionalImagesLoad(e, IMAGES_INDEXES.FIRST_ADDITIONAL_IMAGE);

  const additionalSecondImageByIndexLoad = (e) =>
    handleAdditionalImagesLoad(e, IMAGES_INDEXES.SECOND_ADDITIONAL_IMAGE);

  const additionalSecondImageByIndexUpdate = (e) =>
    handleAdditionalImagesLoad(e, IMAGES_INDEXES.SECOND_ADDITIONAL_IMAGE);

  const additionalThirdImageByIndexLoad = (e) =>
    handleAdditionalImagesLoad(e, IMAGES_INDEXES.THIRD_ADDITIONAL_IMAGE);

  const additionalThirdImageByIndexUpdate = (e) =>
    handleAdditionalImagesLoad(e, IMAGES_INDEXES.THIRD_ADDITIONAL_IMAGE);

  const additionalFirstImageHandler = isEdit
    ? additionalFirstImageByIndexUpdate
    : additionalFirstImageByIndexLoad;

  const additionalSecondImageHandler = isEdit
    ? additionalSecondImageByIndexUpdate
    : additionalSecondImageByIndexLoad;

  const additionalThirdImageHandler = isEdit
    ? additionalThirdImageByIndexUpdate
    : additionalThirdImageByIndexLoad;

  const mainImageSrc = isEdit
    ? productImageDisplayed || imgUrl
    : productImageDisplayed;

  const displaySecondImageLoad = additionalImagesDisplayed[0]
    ? styles.display
    : styles.displayNone;

  const displayThirdImageLoad = additionalImagesDisplayed[1]
    ? styles.display
    : styles.displayNone;

  return (
    <div className={styles.container}>
      <Box my={3}>
        <Grid container spacing={1}>
          <Grid item>
            <span className={styles.text}>{PRODUCT_PHOTO_TEXT.PRIMARY}</span>
            <div className={styles.imageUploadAvatar}>
              <ImageUploadContainer
                handler={handlePrimaryImageLoad}
                src={mainImageSrc}
                id={imageUploadInputsId.mainImageInput}
              />
            </div>
          </Grid>
        </Grid>
        {validate && !primaryImage && (
          <div className={styles.error}>{REQUIRED_PHOTOS}</div>
        )}
      </Box>
      <Box my={3}>
        <Grid container spacing={1}>
          <Grid item>
            <span className={styles.text}>{PRODUCT_PHOTO_TEXT.ADDITIONAL}</span>
            <div className={styles.imageUploadAvatar}>
              <ImageUploadContainer
                handler={additionalFirstImageHandler}
                src={additionalImagesDisplayed[0]}
                id={imageUploadInputsId.imageInput1}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
      <Box my={3}>
        <Grid container spacing={1}>
          <Grid item className={displaySecondImageLoad}>
            <span className={styles.text} />
            <div className={styles.imageUploadAvatar}>
              <ImageUploadContainer
                className={styles.display}
                handler={additionalSecondImageHandler}
                src={additionalImagesDisplayed[1]}
                id={imageUploadInputsId.imageInput2}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
      <Box my={3}>
        <Grid container spacing={1}>
          <Grid item className={displayThirdImageLoad}>
            <span className={styles.text} />
            <div className={styles.imageUploadAvatar}>
              <ImageUploadContainer
                handler={additionalThirdImageHandler}
                src={additionalImagesDisplayed[2]}
                id={imageUploadInputsId.imageInput3}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

ProductAddImages.propTypes = {
  toggleFieldsChanged: PropTypes.func,
  additionalImagesDisplayed: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.object),
    PropTypes.string
  ]),
  setAdditionalImagesDisplayed: PropTypes.func,
  isEdit: PropTypes.bool,
  displayed: PropTypes.string,
  setProductImageDisplayed: PropTypes.func,
  productImageDisplayed: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.object),
    PropTypes.string
  ]),
  setAdditionalImages: PropTypes.func.isRequired,
  setPrimaryImage: PropTypes.func.isRequired,
  additionalImages: PropTypes.arrayOf(PropTypes.string),
  primaryImage: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.object),
    PropTypes.string
  ]),
  validate: PropTypes.bool.isRequired
};

ProductAddImages.defaultProps = {
  toggleFieldsChanged: () => {},
  additionalImagesDisplayed: [],
  setAdditionalImagesDisplayed: '',
  isEdit: false,
  displayed: '',
  setProductImageDisplayed: '',
  productImageDisplayed: '',
  primaryImage: '',
  additionalImages: []
};

export default ProductAddImages;
