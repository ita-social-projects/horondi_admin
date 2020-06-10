import React from 'react';
import { connect } from 'react-redux';

import { TextField } from '@material-ui/core';

import { config } from '../../config';

import { useStyles } from './Product-add-propetries-item-style';

const { typeNumber, typeString, numberCategories } = config.product.sizesRules;

const input = {
  string: 'string',
  number: 'number',
  size: 'size',
  available: 'available',
  nativeSelect: {
    native: true
  }
};

const inputVariant = 'outlined';

const ProductAddPropetriesItem = ({
  sizeModel,
  productModel,
  name,
  handleInputChange
}) => {
  const classes = useStyles();
  const select = name === input.size;
  const inputType = name !== input.available ? input.string : input.number;

  const { category } = productModel;

  const numberSize = numberCategories.find((value) => value === category);
  const sizes = !numberSize ? typeString : typeNumber;

  const sizeOptions = sizes.map((size) => (
    <option key={size} value={size}>
      {size}
    </option>
  ));

  return (
    <TextField
      required
      key={name}
      select={select}
      className={classes.textfield}
      name={name}
      label={name}
      type={inputType}
      value={sizeModel[name]}
      onChange={handleInputChange}
      SelectProps={input.nativeSelect}
      variant={inputVariant}
      id={name}
    >
      <option value='' />
      {sizeOptions}
    </TextField>
  );
};

const mapStateToProps = ({
  productModelState: { productModel, sizeModel }
}) => ({
  productModel,
  sizeModel
});

export default connect(mapStateToProps)(ProductAddPropetriesItem);
