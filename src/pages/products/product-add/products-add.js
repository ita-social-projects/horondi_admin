import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProductDetails } from '../../../redux/products/products.actions';
import ProductEditForm from '../product-edit/product-edit-form';
import LoadingBar from '../../../components/loading-bar';

const ProductsAdd = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetails());
  }, [dispatch]);

  const { loading, details } = useSelector(({ Products }) => ({
    loading: Products.loading,
    details: Products.details
  }));
  if (loading && !details.categories.length) {
    return <LoadingBar />;
  }
  return <ProductEditForm />;
};

export default ProductsAdd;
