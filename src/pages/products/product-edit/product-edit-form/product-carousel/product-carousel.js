import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import {
  deleteImages,
  removeImagesToUpload,
  setFilesToDelete,
  setFilesToUpload,
  setPrimaryImageToUpload
} from '../../../../../redux/products/products.actions';
import { closeDialog } from '../../../../../redux/dialog-window/dialog-window.actions';
import UploadButtonContainer from '../../../../../containers/upload-button-container';
import { config } from '../../../../../configs';
import { productsTranslations } from '../../../../../translations/product.translations';
import useSuccessSnackbar from '../../../../../utils/use-success-snackbar';
import { useStyles } from './product-carousel.styles';
import 'react-multi-carousel/lib/styles.css';
import './product-carousel.css';

const {
  imagePrefix,
  product: { responsive }
} = config;
const {
  DELETE_PRODUCT_BTN,
  DELETE_IMAGE_MESSAGE,
  DELETE_IMAGE_TITLE,
  UPDATE_MAIN_PHOTO,
  NEW_PHOTOS
} = productsTranslations;

const ProductCarousel = ({ toggleFieldsChanged }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const product = useSelector(({ Products }) => Products.selectedProduct);

  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    if (product.images) {
      const images = [
        { url: product.images.primary.large, prefix: true },
        ...product.images.additional.map(({ large }) => ({
          url: large,
          prefix: true
        }))
      ];
      setProductImages(images);
    }
  }, [product.images, dispatch]);

  const { openSuccessSnackbar } = useSuccessSnackbar();

  const filterImages = (images) => {
    const imagesNames = productImages.map(({ url }) => url);
    return Array.from(images).filter(({ name }) => !imagesNames.includes(name));
  };

  const handlePrimaryImageLoad = async (e) => {
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

  const handleMultipleFilesLoad = async (e) => {
    const { files } = e.target;
    if (files && files[0]) {
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

  const handleImagesDeleting = (id, url, prefix, name) => {
    let removeProduct;
    if (prefix) {
      const imagesToDelete = product.images.additional.find(
        ({ large }) => large === url
      );
      removeProduct = () => {
        dispatch(closeDialog());
        dispatch(setFilesToDelete(Object.values(imagesToDelete)));
        dispatch(deleteImages(id));
      };
    } else {
      removeProduct = () => {
        dispatch(closeDialog());
        dispatch(removeImagesToUpload(name));
        const newImages = productImages.filter((image) => image.url !== url);
        setProductImages(newImages);
      };
    }
    openSuccessSnackbar(
      removeProduct,
      DELETE_IMAGE_TITLE,
      DELETE_IMAGE_MESSAGE,
      DELETE_PRODUCT_BTN
    );
  };

  return (
    <Carousel
      className={styles.carousel}
      responsive={responsive}
      swipeable={false}
    >
      {productImages.map(({ prefix, url, name }, idx) => (
        <div key={url}>
          <div
            className={styles.image}
            style={{
              background: `url(${
                prefix ? imagePrefix : ''
              }${url}) no-repeat center`,
              backgroundSize: 'cover'
            }}
          />
          <Grid container justify='center' spacing={2}>
            <Grid
              item
              style={{
                width:
                  (idx !== 0 && !prefix) ||
                  (idx !== 0 && product.images.additional.length > 1)
                    ? ''
                    : '100%'
              }}
            >
              <Box mt={1}>
                <UploadButtonContainer
                  className={styles.imageBtn}
                  buttonLabel={idx === 0 ? UPDATE_MAIN_PHOTO : NEW_PHOTOS}
                  onChangeHandler={
                    idx === 0 ? handlePrimaryImageLoad : handleMultipleFilesLoad
                  }
                  startIcon
                  multiple={idx !== 0}
                />
              </Box>
            </Grid>
            {(idx !== 0 && !prefix) ||
            (idx !== 0 && product.images.additional.length > 1) ? (
                <Grid item>
                <Box mt={1}>
                    <Button
                      className={styles.imageBtn}
                      variant='outlined'
                      onClick={() => handleImagesDeleting(product._id, url, prefix, name)}
                    >
                    {DELETE_PRODUCT_BTN}
                  </Button>
                  </Box>
              </Grid>
              ) : null}
          </Grid>
        </div>
      ))}
    </Carousel>
  );
};

ProductCarousel.propTypes = {
  toggleFieldsChanged: PropTypes.func.isRequired
};

export default ProductCarousel;
