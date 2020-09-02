import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@material-ui/core';
import { useStyles } from './products-nav.styles';

import ProductsNavFilters from './products-nav-filters';

const ProductsNav = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Button variant='contained' color='primary'>
        ДОДАТИ ПРОДУКТ
      </Button>
      <ProductsNavFilters />
    </div>
  );
};

export default ProductsNav;
