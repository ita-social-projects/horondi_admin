import React, { useEffect, useState } from 'react';
import { Modal } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { useLazyQuery } from '@apollo/client';
import { config } from '../../../../configs';
import { useStyles } from './edit-product-form.styles';
import {
  calcPriceWithDiscount,
  editProductFormPropTypes,
  inputName
} from '../../../../utils/order';
import { getProduct } from '../../../../redux/products/products.actions';
import configs from '../../../../configs/orders';
import FetchPromoCode from '../../../../components/fetch-promo-code';

import { getPromoCodeByCode } from '../add-product-form/add-product-form.operations';

const EditProductForm = ({
  open,
  onCloseHandler,
  selectedItem,
  setFieldValue,
  setSizeItems,
  items
}) => {
  const { materialUiConstants } = config;
  const { productLabels } = configs;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [size, setSize] = useState({ _id: '', name: '', price: {} });
  const [quantity, setQuantity] = useState('');
  const [promoCodeValue, setPromoCodeValue] = useState('');

  const [getPromoCode, { data: promoCode }] = useLazyQuery(getPromoCodeByCode, {
    variables: {
      code: promoCodeValue
    }
  });

  useEffect(() => {
    if (selectedItem) {
      setQuantity(selectedItem.quantity);
      setSize(selectedItem.options.size);
    }
  }, [selectedItem]);

  const { sizes } = useSelector(({ Products }) => ({
    sizes: Products.selectedProduct.sizes
  }));

  useEffect(() => {
    selectedItem && dispatch(getProduct(selectedItem.product._id));
  }, [selectedItem]);

  const selectHandler = (e) => {
    setSize({
      _id: e.target.value,
      name: sizes.filter(({ size: sz }) => sz._id === e.target.value)[0].size
        .name,
      price: sizes.filter(({ size: sz }) => sz._id === e.target.value)[0].price
    });
  };

  const sizeItems = setSizeItems(sizes);

  const confirmHandler = () => {
    const index = items.findIndex(
      (item) => item.product._id === selectedItem.product._id
    );
    const { discount, categories } = promoCode?.getPromoCodeByCode || {};
    const isAllowCategory =
      categories?.includes(selectedItem.category) || false;

    const newValue = { ...items[index], ...items[index].options };
    newValue.options.size._id = size._id;
    newValue.options.size.price = size.price;
    newValue.options.size.name = size.name;
    newValue.quantity = quantity;
    newValue.discount = discount || 0;
    newValue.priceToPay = [
      {
        currency: 'UAH',
        value: calcPriceWithDiscount(
          size.price[0].value,
          discount,
          isAllowCategory
        )
      },
      {
        currency: 'USD',
        value: calcPriceWithDiscount(
          size.price[1].value,
          discount,
          isAllowCategory
        )
      }
    ];

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
          <Select value={size._id} onChange={selectHandler}>
            {sizeItems}
          </Select>
        </div>
        <FetchPromoCode
          getPromoCode={getPromoCode}
          setPromoCodeValue={setPromoCodeValue}
          promoCode={promoCode}
        />
        <Button
          variant={materialUiConstants.contained}
          color={materialUiConstants.primary}
          disabled={
            size._id === selectedItem?.options.size._id &&
            quantity === selectedItem?.quantity &&
            !promoCodeValue
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
