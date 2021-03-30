import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Box, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useStyles } from './product-add-images.styles';
import { config } from '../../../../configs/index';

import { productsTranslations } from '../../../../translations/product.translations';
import ImageUploadContainer from '../../../../containers/image-upload-container';
import useProductAddImages from '../../../../hooks/product/use-product-addimages';
import {
  IMAGES_INDEXES,
  imageUploadInputsId,
  PRODUCT_PHOTO_TEXT
} from '../../../../consts/const-addimages';

const { REQUIRED_PHOTOS } = productsTranslations;

function ProductAddImages({
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
}) {
  const styles = useStyles();
  const product = useSelector(({ Products }) => Products.selectedProduct);

  useEffect(() => {
    if (product?.images?.additional) {
      setAdditionalImagesDisplayed(
        product?.images?.additional?.map((e) => config.imagePrefix + e?.large)
      );
    }
  }, [product?.images]);

  const imgUrl = config.imagePrefix + displayed;

  const {
    handlePrimaryImageLoad,
    handleAdditionalImagesLoad
  } = useProductAddImages({
    isEdit,
    additionalImagesDisplayed,
    setAdditionalImagesDisplayed,
    toggleFieldsChanged,
    additionalImages,
    setAdditionalImages,
    setProductImageDisplayed,
    setPrimaryImage
  });

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
}

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
  toggleFieldsChanged: '',
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
