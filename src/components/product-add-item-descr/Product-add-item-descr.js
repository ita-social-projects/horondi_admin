import React from 'react';
import { connect } from 'react-redux';

import { TextField } from '@material-ui/core';

import { config } from '../../config';

const { typeNumber, typeMultiline } = config.product.descriptionRules;

const INPUT_PROPS = { min: 0, maxLength: 150 };
const INPUT_VARIANT = 'outlined';

const ProductAddItemDescr = ({
  classes,
  option,
  productModel,
  onChangeEvent
}) => {
  const inputMultiline = typeMultiline.includes(option);
  let inputType = 'string';
  if (typeNumber.includes(option)) inputType = 'number';

  return (
    <TextField
      required
      className={classes.textfield}
      id={option}
      label={option}
      name={option}
      value={productModel[option]}
      onChange={onChangeEvent}
      type={inputType}
      variant={INPUT_VARIANT}
      multiline={inputMultiline}
      inputProps={INPUT_PROPS}
    />
  );
};

const mapStateToProps = ({ productModelState: { productModel } }) => ({
  productModel
});

export default connect(mapStateToProps)(ProductAddItemDescr);
