import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Box, Grid, Chip } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useStyles } from './product-add-images.styles';

import UploadButtonContainer from "../../../../containers/upload-button-container";
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
            <UploadButtonContainer
                buttonLabel={MAIN_PHOTO}
                multiple={false}
                startIcon={true}
                onChangeHandler={handlePrimaryImageLoad}
            />
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
          <UploadButtonContainer
            buttonLabel={ADDITIONAL_PHOTOS}
            multiple={true}
            startIcon={true}
            onChangeHandler={handleAdditionalImagesLoad}
          />
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
