import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { TextField } from '@material-ui/core';
import { useStyles } from './Product-container-details-style';

const ProductContainerDetails = ({
  productEditStatus,
  handleInputChange,
  dispatch,
  ...product
}) => {
  const classes = useStyles();

  const inputReadOnly = {
    readOnly: productEditStatus
  };

  const inputVariant = productEditStatus ? 'filled' : 'standard';

  const productDetails = Object.keys({ ...product }).map((propetry) => (
    <TextField
      key={propetry}
      className={classes.textField}
      fullWidth
      label={propetry}
      name={propetry}
      value={product[propetry]}
      variant={inputVariant}
      size='small'
      multiline
      InputProps={inputReadOnly}
      onChange={handleInputChange}
    />
  ));

  return <Fragment>{productDetails}</Fragment>;
};

const mapStateToProps = ({ productsState: { productEditStatus } }) => ({
  productEditStatus
});

export default connect(mapStateToProps)(ProductContainerDetails);
