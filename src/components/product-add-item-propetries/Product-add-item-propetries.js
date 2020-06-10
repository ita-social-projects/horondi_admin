import React from 'react';
import { connect } from 'react-redux';

import { Paper, Typography } from '@material-ui/core';
import { setProductModel, setSizeModel } from '../../actions';

import { SaveButton, StandardButton } from '../buttons';
import ProductAddPropetriesItem from '../product-add-propetries-item';
import { useStyles } from './Product-add-item-propetries-style';

const ADD_BUTTON_LABEL = 'ADD SIZE';
const REMOVE_BUTTON_LABEL = 'REMOVE SIZE';
const propsKeys = ['size', 'available'];

const AddProductPropetries = ({
  setSizeModel,
  setProductModel,
  sizeModel,
  productModel
}) => {
  const classes = useStyles();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSizeModel({ ...sizeModel, [name]: value });
  };

  const handleAddPropetries = () => {
    setProductModel({
      ...productModel,
      propetries: [...productModel.propetries, sizeModel]
    });
  };

  const handleRemoveProperty = (sizeToRemove) => () => {
    const filteredPropetries = productModel.propetries.filter(
      (property) => property.size !== sizeToRemove
    );
    setProductModel({
      ...productModel,
      propetries: [...filteredPropetries]
    });
  };

  // Form uniquce codes foe each part of SKU
  const formSKU = (product, size) => {
    const catalogCode = product.catalog[0];
    const titleCode = product.title.padEnd(5, '0').slice(0, 5);
    const categoryCode = product.category.slice(0, 2);
    const colorCode = product.color.padEnd(5, '0').slice(0, 5);
    const sizeCode = size.size.padStart(2, '0');
    return `${catalogCode}-${titleCode}-${categoryCode}-${colorCode}-${sizeCode}`.toUpperCase();
  };

  const setSKU = (product, size) => {
    sizeModel.sku = formSKU(product, size);
    return sizeModel.sku;
  };

  const propetryTextFields = propsKeys.map((name) => (
    <ProductAddPropetriesItem
      key={name}
      name={name}
      handleInputChange={handleInputChange}
    />
  ));

  const addedPropetries = productModel.propetries.map((item) => (
    <Paper key={item.size} className={classes.productPropetries}>
      {propsKeys.map((key) => (
        <Typography
          className={classes.propsText}
          key={item[key]}
        >{`${key}: ${item[key]}`}</Typography>
      ))}
      <Typography
        className={classes.propsText}
        key='sku'
      >{`${'sku'.toUpperCase()}: ${setSKU(
        productModel,
        sizeModel
      )}`}</Typography>
      <StandardButton
        size='small'
        color='secondary'
        className={classes.button}
        eventHandler={handleRemoveProperty(item.size)}
        title={REMOVE_BUTTON_LABEL}
        id={item.size}
      />
    </Paper>
  ));

  return (
    <Paper className={classes.productPropetries}>
      {propetryTextFields}
      <div>
        <SaveButton
          id='add'
          title={ADD_BUTTON_LABEL}
          eventHandler={handleAddPropetries}
        />
      </div>
      <div className={classes.addedPropetries}>{addedPropetries}</div>
    </Paper>
  );
};

const mapStateToProps = ({
  productModelState: { productModel, sizeModel, loading }
}) => ({
  productModel,
  sizeModel,
  loading
});

const mapDispatchToProps = {
  setSizeModel,
  setProductModel
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProductPropetries);
