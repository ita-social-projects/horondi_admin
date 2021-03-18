import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Grid, Avatar } from '@material-ui/core';
import { Image } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './product-add-images.styles';
import { config } from '../../../../configs/index';

import { productsTranslations } from '../../../../translations/product.translations';
import ImageUploadContainer from '../../../../containers/image-upload-container';

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
  validate,
  displayed,
  isEdit
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  // const dispatch = useDispatch();
  // const product = useSelector(({ Products }) => Products.selectedProduct);
  // const [productImages, setProductImages] = useState([]);
  //
  // useEffect(() => {
  //   if (product.images) {
  //     const images = [
  //       { url: encodeURIComponent(product.images.primary.large), prefix: true },
  //       ...product.images.additional.map(({ large }) => ({
  //         url: large,
  //         prefix: true
  //       }))
  //     ];
  //     setProductImages(images);
  //   }
  // }, [product.images, dispatch]);

  const imgUrl = config.imagePrefix + displayed;

  const imageUploadInputsId = {
    mainImageInput: 'mainImageInput',
    imageInput: 'ImgInput'
  };

  const handlePrimaryImageLoad = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProductImageDisplayed(event.target.result);
      };
      setPrimaryImage(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAdditionalImagesLoad = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAdditionalImagesDisplayed((prevImages) => [
          ...prevImages,
          event.target.result
        ]);
      };
      e.persist();
      setAdditionalImages((prevImages) => [...prevImages, e.target.files[0]]);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className={styles.container}>
      <Box my={3}>
        <Grid container spacing={1}>
          <Grid item>
            <div className={styles.imageUploadAvatar}>
              <ImageUploadContainer
                handler={handlePrimaryImageLoad}
                src={
                  isEdit
                    ? productImageDisplayed || imgUrl
                    : productImageDisplayed
                }
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
            <div className={styles.imageUploadAvatar}>
              <ImageUploadContainer
                handler={handleAdditionalImagesLoad}
                src={
                  additionalImagesDisplayed.length !== 0
                    ? additionalImagesDisplayed[0]
                    : null
                }
                id={imageUploadInputsId.imageInput}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

ProductAddImages.propTypes = {
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
