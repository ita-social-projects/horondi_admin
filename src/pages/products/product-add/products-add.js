import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProductDetails } from '../../../redux/products/products.actions';
import ProductForm from '../../../components/forms/product-form';
import LoadingBar from '../../../components/loading-bar';
import { selectProduct } from '../../../redux/selectors/products.selectors';

const ProductsAdd = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetails());
  }, [dispatch]);

  const { loading } = useSelector(selectProduct);

  if (loading) {
    return <LoadingBar />;
  }
  return <ProductForm />;
};

export default ProductsAdd;
