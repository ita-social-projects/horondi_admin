import React, { useEffect, useState } from 'react';
import { Modal, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { useStyles } from './edit-product-form.styles';
import { editProductFormPropTypes, inputName } from '../../../../utils/order';
import { getProduct } from '../../../../redux/products/products.actions';
import configs from '../../../../configs/orders';

const EditProductForm = ({
  open,
  onCloseHandler,
  selectedItem,
  setFieldValue,
  items
}) => {
  const { productLabels } = configs;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (selectedItem) {
      setQuantity(selectedItem.quantity);
      setSize(selectedItem.options.size._id);
    }
  }, [selectedItem]);

  const { sizes } = useSelector(({ Products }) => ({
    sizes: Products.selectedProduct.sizes
  }));

  useEffect(() => {
    selectedItem && dispatch(getProduct(selectedItem.product._id));
  }, [selectedItem]);

  const selectHandler = (e) => {
    setSize(e.target.value);
  };

  const sizeItems =
    sizes &&
    sizes.length &&
    sizes
      .filter(({ available, name }) => available && name)
      .map((item) => (
        <MenuItem key={item._id} value={item._id}>
          {item.name}
        </MenuItem>
      ));

  const confirmHandler = () => {
    const index = items.findIndex(
      (item) => item.product._id === selectedItem.product._id
    );
    const newValue = { ...items[index], ...items[index].options };
    newValue.options.size = { _id: size };
    newValue.quantity = quantity;
    setFieldValue(inputName.itemsName, [
      ...items.slice(0, index),
      newValue,
      ...items.slice(index + 1)
    ]);
    onCloseHandler();
  };
  return (
    <Modal open={open} onClose={onCloseHandler}>
      <div className={classes.selectedProduct}>
        <h2 className={classes.productHeading}>
          {selectedItem?.product && selectedItem.product.name[0].value}
        </h2>
        <div className={classes.quantity}>
          {productLabels.quantity}
          <Button
            onClick={() => setQuantity((prev) => prev - 1)}
            disabled={quantity <= 1}
          >
            <RemoveIcon />
          </Button>
          <h3>{quantity}</h3>
          <Button onClick={() => setQuantity((prev) => prev + 1)}>
            <AddIcon />
          </Button>
        </div>
        <div>
          {productLabels.size}
          <Select value={size} onChange={selectHandler}>
            {sizeItems}
          </Select>
        </div>
        <br />
        <Button
          variant='contained'
          color='primary'
          disabled={
            size === selectedItem?.options.size._id &&
            quantity === selectedItem?.quantity
          }
          onClick={confirmHandler}
        >
          {productLabels.saveProduct}
        </Button>
      </div>
    </Modal>
  );
};

EditProductForm.defaultProps = {
  items: [],
  selectedItem: {}
};

EditProductForm.propTypes = editProductFormPropTypes;

export default EditProductForm;
