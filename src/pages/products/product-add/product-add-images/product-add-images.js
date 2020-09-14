import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';
import { config } from '../../../../configs';
import { useStyles } from './product-add-images.styles';

const { productImagesLabels } = config;

const ProductAddImages = ({ productImages, setProductImages }) => {
  const styles = useStyles();

  const handleImageChange = (event) => {
    const { name, value } = event.target;
    setProductImages({ ...productImages, [name]: value });
  };

  return (
    <div>
      {productImagesLabels.map(({ label, name }) => (
        <TextField
          className={styles.textfield}
          required
          key={name}
          id={label}
          label={label}
          name={name}
          value={productImages[name]}
          onChange={handleImageChange}
          type='string'
          variant='outlined'
          inputProps={{ min: 0, maxLength: 150 }}
        />
      ))}
    </div>
  );
};

ProductAddImages.propTypes = {
  setProductImages: PropTypes.func.isRequired,
  productImages: PropTypes.objectOf(PropTypes.string).isRequired
};

export default ProductAddImages;
