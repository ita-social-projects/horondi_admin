import React from 'react';
import { useStyles } from './Product-details-container-style';
import ProductPage from '../../components/product-page';

const ProductDetailsPage = ({ match }) => {
  const classes = useStyles();
  const { id } = match.params;
  return (
    <div className={classes.container}>
      <ProductPage id={id} />
    </div>
  );
};

export default ProductDetailsPage;
