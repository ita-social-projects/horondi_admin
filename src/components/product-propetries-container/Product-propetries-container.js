import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { TextField } from '@material-ui/core';
import { useStyles } from './Product-propetries-container-style';

const ProductPropetriesPage = ({
  propetries: { _id, ...propetries },
  productEditStatus
}) => {
  const classes = useStyles();

  const inputReadOnly = {
    readOnly: productEditStatus
  };

  const inputVariant = productEditStatus ? 'filled' : 'standard';

  const productPropetries = Object.keys({ ...propetries }).map((propetry) => (
    <TextField
      key={propetry}
      className={classes.textField}
      label={propetry}
      value={propetries[propetry]}
      variant={inputVariant}
      size='small'
      InputProps={inputReadOnly}
    />
  ));

  return <Fragment>{productPropetries}</Fragment>;
};

const mapStateToProps = ({ productsState: { productEditStatus } }) => ({
  productEditStatus
});

export default connect(mapStateToProps)(ProductPropetriesPage);
