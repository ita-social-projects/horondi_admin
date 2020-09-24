import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  clearFilesToUpload,
  getProduct,
  setPrimaryImageToUpload,
  setProduct
} from '../../../redux/products/products.actions';

import ProductEditForm from './product-edit-form';
import LoadingBar from '../../../components/loading-bar';

import { productModel } from '../../../redux/products/products.reducer';

const ProductEdit = ({ id }) => {
  const dispatch = useDispatch();
  const { product, loading, productOptions, categories } = useSelector(({ Products }) => ({
    product: Products.selectedProduct,
    loading: Products.loading,
    productOptions: Products.productOptions,
    categories: Products.productSpecies.categories
  }));

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProduct(id));

    return () => {
      dispatch(setProduct(productModel));
      dispatch(clearFilesToUpload())
      dispatch(setPrimaryImageToUpload([]))
    };
  }, [id, dispatch]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div>
      {
        product.name[0].value && productOptions.sizes.length && categories.length
          ? <ProductEditForm />
          : <LoadingBar />
      }
    </div>
  );
};

ProductEdit.propTypes = {
  id: PropTypes.string.isRequired
};

export default ProductEdit;
