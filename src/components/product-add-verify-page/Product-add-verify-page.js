import React from 'react';
import { connect } from 'react-redux';

import { Typography, Paper } from '@material-ui/core';

import { config } from '../../config';
import { useStyles } from './Product-add-verify-page-style';

const { productKeys, sizeKeys } = config.product;

const ProductAddVerifyPage = ({ productModel }) => {
  const classes = useStyles();

  const productValues = productKeys.map((key) => (
    <Typography
      className={classes.propsText}
      key={key}
    >{`${key}: ${productModel[key]}`}</Typography>
  ));

  const productPropetries = productModel.propetries.map((item) => (
    <div key={item.size} className={classes.product}>
      {sizeKeys.map((key) => (
        <Typography
          className={classes.propsText}
          key={item[key]}
        >{`${key}: ${item[key]}`}</Typography>
      ))}
    </div>
  ));

  return (
    <Paper className={classes.product}>
      {productValues}
      <div className={classes.props}>{productPropetries}</div>
    </Paper>
  );
};

const mapStateToProps = ({ productModelState: { productModel } }) => ({
  productModel
});

export default connect(mapStateToProps)(ProductAddVerifyPage);
