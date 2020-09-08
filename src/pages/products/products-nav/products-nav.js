import React from 'react';

import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';

import ProductsNavFilters from '../products-nav-filters';
import ProductsNavClearFilters from '../products-nav-clear-filters/products-nav-clear-filters';

import { productsTranslations } from '../../../translations/product.translations';

const { ADD_PRODUCT } = productsTranslations;

const ProductsNav = () => (
  <Grid container direction='column' justify='center' spacing={2}>
    <Grid container item spacing={2}>
      <Grid item>
        <Button variant='contained' color='primary'>
          {ADD_PRODUCT}
        </Button>
      </Grid>
    </Grid>
    <Grid container item spacing={2}>
      <ProductsNavFilters />
      <ProductsNavClearFilters />
    </Grid>
  </Grid>
);

export default ProductsNav;
