import React from 'react';
import { useStyles } from './Products-page-container-styles';
import ProductList from '../../components/product-list/Product-list';
import TableNav from '../../components/table-nav';

const ProductsPageContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <TableNav />
      <ProductList />
    </div>
  );
};

export default ProductsPageContainer;
