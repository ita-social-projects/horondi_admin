import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Box, Button, Grid, Chip } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useStyles } from './product-add-images.styles';

import StepperButtons from '../product-add-stepper/stepper-buttons';
import { setFilesToUpload } from '../../../../redux/products/products.actions';

import { productsTranslations } from '../../../../translations/product.translations';

const { MAIN_PHOTO, ADDITIONAL_PHOTOS, REQUIRED_PHOTOS } = productsTranslations;

const ProductAddImages = ({
  activeStep,
  handleNext,
  handleBack,
  setAdditionalImages,
  additionalImages,
  setPrimaryImage,
  primaryImage
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [shouldValidate, setShouldValidate] = useState(false);

  const handlePrimaryImageLoad = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      setPrimaryImage(files[0]);
    }
  };

  const handleAdditionalImagesLoad = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      const imagesNames = additionalImages.map(({ name }) => name);
      const newImages = Array.from(files).filter(
        ({ name }) => !imagesNames.includes(name) && name !== primaryImage.name
      );
      setAdditionalImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleImagesLoad = () => {
    setShouldValidate(true);
    if (primaryImage && additionalImages.length) {
      dispatch(setFilesToUpload([primaryImage, ...additionalImages]));
      handleNext();
    }
  };

  const handleDeletePrimaryImage = () => {
    setPrimaryImage('');
  };

  const handleDeleteAdditionalImage = (name) => {
    const newImages = additionalImages.filter((image) => image.name !== name);
    setAdditionalImages(newImages);
  };

  return (
    <div className={styles.container}>
      <Box my={3}>
        <Grid container spacing={1}>
          <Grid item>
            <input
              accept='image/*'
              className={styles.input}
              id='upload-primary-image'
              multiple={false}
              type='file'
              onChange={handlePrimaryImageLoad}
            />
            <label htmlFor='upload-primary-image'>
              <Button
                component='span'
                variant='contained'
                color='primary'
                startIcon={<PublishIcon />}
              >
                {MAIN_PHOTO}
              </Button>
            </label>
          </Grid>
          <Grid item>
            {primaryImage ? (
              <Box mt={0.5}>
                <Chip
                  icon={<AttachFileIcon />}
                  label={primaryImage.name}
                  onDelete={handleDeletePrimaryImage}
                />
              </Box>
            ) : null}
          </Grid>
        </Grid>
      </Box>
      <div className={styles.chipContainer}>
        <div>
          <input
            accept='image/*'
            className={styles.input}
            id='upload-additional-image'
            multiple
            type='file'
            onChange={handleAdditionalImagesLoad}
          />
          <label htmlFor='upload-additional-image'>
            <Button
              component='span'
              variant='contained'
              color='primary'
              startIcon={<PublishIcon />}
            >
              {ADDITIONAL_PHOTOS}
            </Button>
          </label>
        </div>
        <div className={styles.chips}>
          {additionalImages.map(({ name }) => (
            <Chip
              icon={<AttachFileIcon />}
              key={name}
              label={name}
              onDelete={() => handleDeleteAdditionalImage(name)}
            />
          ))}
        </div>
      </div>
      {shouldValidate && (!primaryImage || !additionalImages.length) ? (
        <div className={styles.error}>{REQUIRED_PHOTOS}</div>
      ) : null}
      <StepperButtons
        activeStep={activeStep}
        handleBack={handleBack}
        handleNext={handleImagesLoad}
      />
    </div>
  );
};

ProductAddImages.propTypes = {
  activeStep: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  setAdditionalImages: PropTypes.func.isRequired,
  setPrimaryImage: PropTypes.func.isRequired,
  additionalImages: PropTypes.arrayOf(PropTypes.object),
  primaryImage: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.object),
    PropTypes.string
  ])
};

ProductAddImages.defaultProps = {
  primaryImage: '',
  additionalImages: []
};

export default ProductAddImages;
