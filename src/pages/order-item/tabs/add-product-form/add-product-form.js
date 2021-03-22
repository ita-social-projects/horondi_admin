import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem, TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';

import { useStyles } from './add-product-form.styles';
import {
  getFiltredProducts,
  getProduct
} from '../../../../redux/products/products.actions';
import configs from '../../../../configs/orders';
import { mergeProducts, inputName } from '../../../../utils/order';

const AddProductForm = ({ items, setFieldValue }) => {
  const styles = useStyles();
  const { productLabels, productAdditionalInfo } = configs;
  const dispatch = useDispatch();
  const { products, loading, sizes } = useSelector(({ Products }) => ({
    products: Products.products,
    loading: Products.loading,
    sizes: Products.selectedProduct.sizes
  }));
  const [productInput, setProductInput] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getFiltredProducts({}));
  }, []);

  useEffect(() => {
    selectedProduct && dispatch(getProduct(selectedProduct._id));
  }, [selectedProduct]);

  useEffect(() => {
    selectedProduct && sizes && setSize(sizes[0]._id);
  }, [sizes]);

  const addProductHandler = () => {
    setQuantity(1);
    setFieldValue(
      inputName.itemsName,
      mergeProducts(selectedProduct, size, quantity, items)
    );
  };

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
            variant='outlined'
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
          value={size}
          onChange={selectHandler}
        >
          {sizeItems}
        </Select>
      </div>
      <Button
        variant='contained'
        color='primary'
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
  items: []
};

AddProductForm.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      options: PropTypes.shape({
        size: PropTypes.objectOf(PropTypes.string)
      }),
      quantity: PropTypes.number,
      product: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
        basePrice: PropTypes.arrayOf(
          PropTypes.shape({
            currency: PropTypes.string,
            value: PropTypes.number
          })
        )
      })
    })
  ),
  setFieldValue: PropTypes.func.isRequired
};

export default AddProductForm;
