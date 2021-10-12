import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

import { productsTranslations } from '../../../../translations/product.translations';
import ImagesUploadContainer from '../../../../containers/images-upload-container';
import ImagesPreviewContainer from '../../../../containers/images-preview-container';
import useProductAddImages from '../../../../hooks/product/use-product-addimages';

const { MAIN_PHOTO, ADDITIONAL_PHOTOS } = productsTranslations;

const ProductAddImages = ({
  productImages,
  setProductImages,
  toggleFieldsChanged,
  errors,
  touched,
  setFieldValue,
  isEdit
}) => {
  const { handleImagesLoad } = useProductAddImages({
    isEdit,
    toggleFieldsChanged,
    productImages,
    setProductImages
  });

  const maxImages = 8;
  useEffect(() => {
    if (productImages.length === 1) productImages[0].primary = true;
    setFieldValue('productImages', productImages);
  }, [productImages]);

  const labels = {
    primary: MAIN_PHOTO,
    additional: ADDITIONAL_PHOTOS
  };

  const previewImages = isEdit
    ? productImages?.map((image) =>
        image?.src?.preview
          ? { src: image.src.preview, primary: image.primary }
          : image
      )
    : productImages?.map((image) => ({
        src: image.src.preview,
        primary: image.primary
      }));

  return (
    <Grid container spacing={1}>
      <ImagesUploadContainer
        handler={handleImagesLoad}
        multiple
        maxFiles={maxImages - productImages.length}
      />
      <ImagesPreviewContainer
        src={previewImages}
        multiple
        imageHandler={setProductImages}
        labels={labels}
      />
      {errors && touched && errors.productImages}
    </Grid>
  );
};

ProductAddImages.propTypes = {
  productImages: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.object()])
    )
  ).isRequired,
  isEdit: PropTypes.bool,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  setProductImages: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  toggleFieldsChanged: PropTypes.func
};

ProductAddImages.defaultProps = {
  toggleFieldsChanged: '',
  isEdit: false
};

export default ProductAddImages;
