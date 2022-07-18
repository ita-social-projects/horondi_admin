import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  clearFilesToUpload,
  getProduct,
  setPrimaryImageToUpload,
  setProduct
} from '../../../redux/products/products.actions';

import ProductForm from '../../../components/forms/product-form';
import LoadingBar from '../../../components/loading-bar';

import { productModel } from '../../../redux/products/products.reducer';
import { selectSelectedProductAndLoading } from '../../../redux/selectors/products.selectors';

const ProductEdit = ({ id }) => {
  const dispatch = useDispatch();
  const { product, loading } = useSelector(selectSelectedProductAndLoading);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProduct(id));

    return () => {
      dispatch(setProduct(productModel));
      dispatch(clearFilesToUpload());
      dispatch(setPrimaryImageToUpload([]));
    };
  }, [id, dispatch]);

  if (loading || !product.name || !product.name[0].value) {
    return <LoadingBar />;
  }

  return (
    <div>
      <ProductForm isEdit />
    </div>
  );
};

ProductEdit.propTypes = {
  id: PropTypes.string.isRequired
};

export default ProductEdit;
