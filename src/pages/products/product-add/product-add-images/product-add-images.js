import React, { useEffect, useState } from 'react';
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

  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    if (product.images) {
      const images = [
        { url: encodeURIComponent(product.images.primary.large), prefix: true },
        ...product.images.additional.map(({ large }) => ({
          url: large,
          prefix: true
        }))
      ];
      setProductImages(images);
    }
  }, [product.images, dispatch]);

  const filterImages = (images) => {
    const imagesNames = productImages.map(({ url }) => url);
    return Array.from(images).filter(({ name }) => !imagesNames.includes(name));
  };

  const convertToBase64 = (files) =>
    files.map(
      (file) =>
        new Promise((res) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
            res(e.target.result);
          };
        })
    );

  const handlePrimaryImageUpdate = async (e) => {
    const { files } = e.target;
    if (files[0]) {
      toggleFieldsChanged(true);
      const newImages = filterImages(files);
      const results = await Promise.all(convertToBase64(newImages));
      if (results[0]) {
        setProductImages((oldImages) => [
          { url: results[0], prefix: false, name: newImages[0].name },
          ...oldImages.slice(1)
        ]);
        dispatch(setPrimaryImageToUpload(newImages));
      }
    }
  };

  const handleAdditionalImagesLoadOnUpdating = async (e) => {
    const { files } = e.target;
    if (e.target.files && e.target.files[0]) {
      toggleFieldsChanged(true);
      const newImages = filterImages(files);
      const results = await Promise.all(convertToBase64(newImages));

      if (results.length) {
        setProductImages((oldImages) => [
          ...oldImages,
          ...results.map((image, idx) => ({
            url: image,
            prefix: false,
            name: newImages[idx].name
          }))
        ]);
        dispatch(setFilesToUpload(newImages));
      }
    }
  };

  const imgUrl = config.imagePrefix + displayed;

  const imageUploadInputsId = {
    mainImageInput: 'mainImageInput',
    imageInput1: 'ImgInput1',
    imageInput2: 'ImgInput2',
    imageInput3: 'ImgInput3'
  };

  const handlePrimaryImageLoad = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProductImageDisplayed(event.target.result);
      };
      toggleFieldsChanged(true);
      setPrimaryImage(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const IMAGES_INDEXES = {
    FIRST_ADDITIONAL_IMAGE: 0,
    SECOND_ADDITIONAL_IMAGE: 1,
    THIRD_ADDITIONAL_IMAGE: 2
  };

  const handleAdditionalImagesLoadOnCreating = (e, index) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
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
  };

  const additionalFirstImageByIndex = (e) =>
    handleAdditionalImagesLoadOnCreating(
      e,
      IMAGES_INDEXES.FIRST_ADDITIONAL_IMAGE
    );

  const additionalSecondImageByIndex = (e) =>
    handleAdditionalImagesLoadOnCreating(
      e,
      IMAGES_INDEXES.SECOND_ADDITIONAL_IMAGE
    );

  const additionalThirdImageByIndex = (e) =>
    handleAdditionalImagesLoadOnCreating(
      e,
      IMAGES_INDEXES.THIRD_ADDITIONAL_IMAGE
    );

  const additionalFirstImageHandler = isEdit
    ? handleAdditionalImagesLoadOnUpdating
    : additionalFirstImageByIndex;

  const additionalSecondImageHandler = isEdit
    ? handleAdditionalImagesLoadOnUpdating
    : additionalSecondImageByIndex;

  const additionalThirdImageHandler = isEdit
    ? handleAdditionalImagesLoadOnUpdating
    : additionalThirdImageByIndex;

  const primaryImageHandler = isEdit
    ? handlePrimaryImageUpdate
    : handlePrimaryImageLoad;

  const mainImageSrc = isEdit
    ? productImageDisplayed || imgUrl
    : productImageDisplayed;

  return (
    <div className={styles.container}>
      <Box my={3}>
        <Grid container spacing={1}>
          <Grid item>
            <span className={styles.text}>Головне фото</span>
            <div className={styles.imageUploadAvatar}>
              <ImageUploadContainer
                handler={primaryImageHandler}
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
            <span className={styles.text}>Додаткові фото</span>
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
          <Grid
            item
            className={
              additionalImagesDisplayed[0] ? styles.display : styles.displayNone
            }
          >
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
          <Grid
            item
            className={
              additionalImagesDisplayed[1] ? styles.display : styles.displayNone
            }
          >
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
