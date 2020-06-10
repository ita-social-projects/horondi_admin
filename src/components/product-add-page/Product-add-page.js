import React from 'react';
import { Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import wrapWithAdminService from '../wrappers';

import { useStyles } from './Product-add-page-style';

import {
  setProductModel,
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage
} from '../../actions';

import ProductAddItemOptions from '../product-add-item-options';
import ProductAddItemDescr from '../product-add-item-descr';
import ProductAddPropetries from '../product-add-item-propetries';
import ProductAddPageStepper from '../product-add-page-stepper';
import ProductAddVerifyPage from '../product-add-verify-page';

import { config } from '../../config';

const { descriptionLabels } = config.product;

const successMessage = (id) => `Product succesfully saved id: ${id}`;
const SUCCESS_STATUS = 'success';

const PATH_TO_PRODUCT = (id) => `/product/${id}`;

const ProductAddPage = ({
  history,
  adminService,
  productModel,
  setProductModel,
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage
}) => {
  const classes = useStyles();
  const { productsService } = adminService;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductModel({ ...productModel, [name]: value });
  };

  const handleSaveProduct = async (event) => {
    event.preventDefault();
    const productId = await productsService
      .postProduct(productModel)
      .then((res) => {
        setSnackBarSeverity(SUCCESS_STATUS);
        setSnackBarMessage(successMessage(res._id));
        setSnackBarStatus(true);
        return res._id;
      });
    history.push(PATH_TO_PRODUCT(productId));
  };

  const productAddOptions = (
    <ProductAddItemOptions
      classes={classes}
      onChangeEvent={handleInputChange}
    />
  );

  const productAddDescriptions = descriptionLabels.map((option) => (
    <ProductAddItemDescr
      key={option}
      classes={classes}
      option={option}
      onChangeEvent={handleInputChange}
    />
  ));

  const pruductAddPropetries = <ProductAddPropetries />;

  const productVerifyPage = <ProductAddVerifyPage product={productModel} />;

  const stepperSteps = [
    productAddOptions,
    productAddDescriptions,
    pruductAddPropetries,
    productVerifyPage
  ];

  return (
    <Paper className={classes.content}>
      <ProductAddPageStepper
        steps={stepperSteps}
        onSaveHandler={handleSaveProduct}
      />
    </Paper>
  );
};

const mapStateToProps = ({ productModelState: { productModel } }) => ({
  productModel
});
const mapDispatchToProps = {
  setProductModel,
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage
};

export default wrapWithAdminService()(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductAddPage))
);
