import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListSubheader, TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Select from '@material-ui/core/Select';

import { useLazyQuery } from '@apollo/client';
import { config } from '../../../../configs';
import { getPromoCodeByCode } from '../../../promo-code/operations/promo-code.queries';
import { getCertificateByParams } from '../../../certificates/operations/certificate.queries';
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
  itemsDiscount,
  inputOptions,
  certificate
}) => {
  const { materialUiConstants } = config;
  const styles = useStyles();
  const { productLabels, productAdditionalInfo, promoCodesConsts, discount } =
    configs;
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

  const { handleBlur, touched, errors } = inputOptions;

  const [productInput, setProductInput] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [size, setSize] = useState({ id: '', name: '', price: {} });
  const [certificateOrPromoValue, setCertificateOrPromoValue] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getFiltredProducts({}));
  }, [dispatch]);

  useEffect(() => {
    selectedProduct && dispatch(getProduct(selectedProduct._id));
  }, [selectedProduct, dispatch]);

  useEffect(() => {
    selectedProduct &&
      sizes &&
      setSize({
        id: sizes[0].size._id,
        name: sizes[0].size.name,
        price: sizes[0].price
      });
  }, [sizes, selectedProduct]);

  const [getPromoCode, { error: promoCodeError }] = useLazyQuery(
    getPromoCodeByCode,
    {
      onCompleted: (promoCodeData) => {
        if (promoCodeData) {
          setFieldValue(
            inputName.promoCodeId,
            promoCodeData.getPromoCodeByCode._id
          );
          setCertificateOrPromoValue('');
        }
      }
    }
  );

  const [getCertificate, { error: certificateError }] = useLazyQuery(
    getCertificateByParams,
    {
      fetchPolicy: 'network-only',
      onCompleted: (certificateData) => {
        if (certificateData) {
          setFieldValue(
            inputName.certificateId,
            certificateData.getCertificateByParams._id
          );
          setCertificateOrPromoValue('');
        }
      }
    }
  );

  const certificateOrPromoError = certificateError || promoCodeError;

  const inputHandler = (e) => {
    setCertificateOrPromoValue(e.target.value);
  };

  const checkPromoCodeOrCertificate = () => {
    const searchValue = /^HOR/i;
    if (searchValue.test(certificateOrPromoValue)) {
      getCertificate({
        variables: {
          params: {
            name: certificateOrPromoValue
          }
        }
      });
      return;
    }

    getPromoCode({
      variables: {
        code: certificateOrPromoValue
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
  const isFieldError = (field) => Boolean(touched[field] && errors[field]);
  const certificateOrPromoCode =
    promoCode?.getPromoCodeById || certificate?.getCertificateById;

  const discountInfo = certificateOrPromoCode && (
    <List dense disablePadding className={styles.discounts}>
      <ListSubheader disableGutters className={styles.discountTittle}>
        {discount.tittle}
      </ListSubheader>
      <ListItem disableGutters className={styles.discountSubTittle}>
        {certificateOrPromoCode.categories
          ? discount.promoCode
          : discount.certificate}
      </ListItem>
      <ListItem disableGutters>{`${discount.code} ${
        certificateOrPromoCode.name || certificateOrPromoCode.code
      }`}</ListItem>
      <ListItem disableGutters>{`${discount.discount} ${
        certificateOrPromoCode.categories
          ? `${certificateOrPromoCode.discount}%`
          : `${certificateOrPromoCode.value}грн.`
      }`}</ListItem>
      {certificateOrPromoCode.categories && (
        <ListItem disableGutters>{`${
          discount.categories
        } ${certificateOrPromoCode.categories.join(', ')}`}</ListItem>
      )}
    </List>
  );

  const promoCodeInput = (
    <div className={styles.generate}>
      <TextField
        inputProps={{ 'data-testid': 'promo-input' }}
        className={styles.discountInput}
        variant={materialUiConstants.outlined}
        label='Промокод або сертифікат'
        value={certificateOrPromoValue}
        error={!!certificateOrPromoError}
        onChange={inputHandler}
      />
      <div className={styles.error}>
        {certificateOrPromoError ? promoCodesConsts.error : ''}
      </div>
      <Button
        data-testid='promo-button'
        variant={materialUiConstants.contained}
        color={materialUiConstants.primary}
        onClick={checkPromoCodeOrCertificate}
        className={styles.promoBtn}
        disabled={!certificateOrPromoValue}
      >
        {buttonTitles.ADD_PROMOCODE}
      </Button>
    </div>
  );

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
            setSelectedProduct(value || null);
          }}
          id={inputName.items}
          onBlur={handleBlur}
          inputValue={productInput}
          renderInput={(params) => (
            <TextField
              {...params}
              label={productLabels.product}
              error={isFieldError(inputName.items)}
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
        {isFieldError(inputName.items) && (
          <div className={styles.inputError}>{errors[inputName.items]}</div>
        )}
        <div className={styles.quantity}>
          {productLabels.quantity}
          <Button
            data-testid='item-decrement'
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
      {certificateOrPromoCode ? discountInfo : promoCodeInput}
    </div>
  );
};

AddProductForm.defaultProps = {
  items: [],
  promoCode: {}
};

AddProductForm.propTypes = addProductFormPropTypes;

export default AddProductForm;
