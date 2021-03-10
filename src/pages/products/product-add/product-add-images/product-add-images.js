import React from 'react';
import PropTypes from 'prop-types';

import { Box, Grid, Avatar } from '@material-ui/core';
import { Image } from '@material-ui/icons';
import { useStyles } from './product-add-images.styles';

import { productsTranslations } from '../../../../translations/product.translations';
import ImageUploadContainer from '../../../../containers/image-upload-container';

const { MAIN_PHOTO, ADDITIONAL_PHOTOS, REQUIRED_PHOTOS } = productsTranslations;

const ProductAddImages = ({
  setAdditionalImages,
  additionalImages,
  setPrimaryImage,
  primaryImage,
  validate
}) => {
  const styles = useStyles();

  const handlePrimaryImageLoad = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // setPrimaryImage(event.target.result)
      };
      setPrimaryImage(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAdditionalImagesLoad = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // setAdditionalImages((prevImages) => [
        //   ...prevImages,
        //   event.target.result
        // ]);
      };
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
                buttonLabel={MAIN_PHOTO}
              />
              {validate && primaryImage && (
                <Avatar src={primaryImage}>
                  <Image />
                </Avatar>
              )}
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
                buttonLabel={ADDITIONAL_PHOTOS}
              />
              <div className={styles.avatarWrapper}>
                {additionalImages.map((e) => (
                  <Avatar key={e} src={e}>
                    <Image />
                  </Avatar>
                ))}
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

ProductAddImages.propTypes = {
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
  primaryImage: '',
  additionalImages: []
};

export default ProductAddImages;
