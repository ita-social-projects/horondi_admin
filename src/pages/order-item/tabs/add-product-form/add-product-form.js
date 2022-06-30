import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Select from '@material-ui/core/Select';

import { config } from '../../../../configs';
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

const AddProductForm = ({
  items,
  setFieldValue,
  setSizeItems,
  setpricesWithDiscount,
  pricesWithDiscount,
  promoCode
}) => {
  const { materialUiConstants } = config;
  const styles = useStyles();
  const { productLabels, productAdditionalInfo } = configs;
  const dispatch = useDispatch();
  const { products, loading, sizes, category } = useSelector(
    ({ Products }) => ({
      products: Products.products,
      loading: Products.loading,
      sizes: Products.selectedProduct.sizes,
      category: Products.selectedProduct.category
    })
  );
  const [productInput, setProductInput] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [size, setSize] = useState({ id: '', name: '', price: {} });
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
      inputName.itemsName,
      mergeProducts(
        selectedProduct,
        size,
        quantity,
        items,
        category,
        setpricesWithDiscount,
        pricesWithDiscount,
        promoCode
      )
    );
  };

  const sizeItems = setSizeItems(sizes);

  return (
    <div>
      <Autocomplete
        onInputChange={(e, value) => {
          setProductInput(value);
        }}
        noOptionsText={productAdditionalInfo.noOneProduct}
        options={products}
        getOptionLabel={(option) => option?.name[0]?.value}
        onChange={(e, value) => {
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
          onClick={() => setQuantity((prev) => prev - 1)}
          disabled={quantity <= 1}
        >
          <RemoveIcon />
        </Button>
        <h3>{quantity}</h3>
        <Button
          onClick={() => setQuantity((prev) => prev + 1)}
          disabled={!selectedProduct}
        >
          <AddIcon />
        </Button>
      </div>
      <div>
        {productLabels.size}
        <Select
          disabled={!selectedProduct}
          value={size.id}
          onChange={selectHandler}
        >
          {sizeItems}
        </Select>
      </div>
      <Button
        variant={materialUiConstants.contained}
        color={materialUiConstants.primary}
        disabled={!selectedProduct}
        className={styles.addBtn}
        onClick={addProductHandler}
      >
        {productLabels.addProduct}
      </Button>
    </div>
  );
};

AddProductForm.defaultProps = {
  items: [],
  pricesWithDiscount: [],
  promoCode: {}
};

AddProductForm.propTypes = addProductFormPropTypes;

export default AddProductForm;
