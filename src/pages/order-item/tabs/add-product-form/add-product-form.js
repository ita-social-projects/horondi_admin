import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Select from '@material-ui/core/Select';

import { useLazyQuery } from '@apollo/client';
import { config } from '../../../../configs';
import { getPromoCodeByCode } from '../../../promo-code/operations/promo-code.queries';
import { useStyles } from './add-product-form.styles';
import {
  getFiltredProducts,
  getProduct
} from '../../../../redux/products/products.actions';
import configs from '../../../../configs/orders';
import {
  mergeProducts,
  inputName,
  addProductFormPropTypes
} from '../../../../utils/order';
import buttonTitles from '../../../../configs/button-titles';

const AddProductForm = ({
  items,
  setFieldValue,
  setSizeItems,
  promoCode,
  itemsPriceWithDiscount,
  itemsDiscount
}) => {
  const { materialUiConstants } = config;
  const styles = useStyles();
  const { productLabels, productAdditionalInfo, promoCodesConsts } = configs;
  const dispatch = useDispatch();
  const { products, loading, sizes, category, model } = useSelector(
    ({ Products }) => ({
      products: Products.products,
      loading: Products.loading,
      sizes: Products.selectedProduct.sizes,
      category: Products.selectedProduct.category,
      model: Products.selectedProduct.model
    })
  );

  const [productInput, setProductInput] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [size, setSize] = useState({ id: '', name: '', price: {} });
  const [promoCodeValue, setPromoCodeValue] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getFiltredProducts({}));
  }, []);

  useEffect(() => {
    selectedProduct && dispatch(getProduct(selectedProduct._id));
  }, [selectedProduct]);

  useEffect(() => {
    selectedProduct &&
      sizes &&
      setSize({
        id: sizes[0].size._id,
        name: sizes[0].size.name,
        price: sizes[0].price
      });
  }, [sizes]);

  const [getPromoCode, { error }] = useLazyQuery(getPromoCodeByCode, {
    onCompleted: (promocodeByCode) => {
      if (promocodeByCode) {
        setFieldValue(
          inputName.promoCodeId,
          promocodeByCode.getPromoCodeByCode._id
        );
        setPromoCodeValue('');
      }
    }
  });
  const inputHandler = (e) => {
    setPromoCodeValue(e.target.value);
  };

  const checkPromoCode = () => {
    getPromoCode({
      variables: {
        code: promoCodeValue
      }
    });
  };

  const selectHandler = (e) => {
    setSize({
      id: e.target.value,
      price: sizes.find(({ size: sz }) => sz._id === e.target.value).price,
      name: sizes.find(({ size: sz }) => sz._id === e.target.value).size.name
    });
  };

  const addProductHandler = () => {
    setQuantity(1);
    setFieldValue(
      inputName.items,
      mergeProducts(
        selectedProduct,
        size,
        quantity,
        items,
        category,
        model,
        promoCode,
        setFieldValue,
        itemsDiscount,
        itemsPriceWithDiscount
      )
    );
  };

  const sizeItems = setSizeItems(sizes);

  return (
    <div className={styles.section}>
      <div>
        <Autocomplete
          data-testid='autocomplete'
          onInputChange={(_e, value) => {
            setProductInput(value);
          }}
          noOptionsText={productAdditionalInfo.noOneProduct}
          options={products}
          getOptionLabel={(option) => option?.name[0]?.value}
          onChange={(_e, value) => {
            if (value) {
              setSelectedProduct(value);
            } else {
              setSelectedProduct(null);
            }
          }}
          inputValue={productInput}
          renderInput={(params) => (
            <TextField
              {...params}
              label={productLabels.product}
              variant={materialUiConstants.outlined}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading && <CircularProgress size={20} />}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
        />
        <div className={styles.quantity}>
          {productLabels.quantity}
          <Button
            data-testid='decrement'
            onClick={() => setQuantity((prev) => prev - 1)}
            disabled={quantity <= 1}
          >
            <RemoveIcon />
          </Button>
          <h3 data-testid='quantity'>{quantity}</h3>
          <Button
            data-testid='increment'
            onClick={() => setQuantity((prev) => prev + 1)}
            disabled={!selectedProduct}
          >
            <AddIcon />
          </Button>
        </div>
        <div>
          {productLabels.size}
          <Select
            data-testid='size-input'
            disabled={!selectedProduct}
            value={size.id}
            onChange={selectHandler}
          >
            {sizeItems}
          </Select>
        </div>
        <Button
          data-testid='add-btn'
          variant={materialUiConstants.contained}
          color={materialUiConstants.primary}
          disabled={!selectedProduct || loading}
          className={styles.addBtn}
          onClick={addProductHandler}
        >
          {productLabels.addProduct}
        </Button>
      </div>
      <div className={styles.generate}>
        <TextField
          inputProps={{ 'data-testid': 'promo-input' }}
          className={styles.textField}
          variant={materialUiConstants.outlined}
          label='Промокод'
          value={promoCodeValue}
          error={error}
          onChange={(e) => inputHandler(e)}
        />
        <div className={styles.error}>
          {error ? promoCodesConsts.error : ''}
        </div>
        <Button
          data-testid='promo-button'
          variant={materialUiConstants.contained}
          color={materialUiConstants.primary}
          onClick={checkPromoCode}
          className={styles.promoBtn}
          disabled={!promoCodeValue}
        >
          {buttonTitles.ADD_PROMOCODE}
        </Button>
      </div>
    </div>
  );
};

AddProductForm.defaultProps = {
  items: [],
  promoCode: {}
};

AddProductForm.propTypes = addProductFormPropTypes;

export default AddProductForm;
