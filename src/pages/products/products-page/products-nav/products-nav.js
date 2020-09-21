import React from 'react';
import { push } from 'connected-react-router';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useStyles } from './products-nav.styles';
import ProductsNavFilters from './products-nav-filters';
import ProductsNavClearFilters from './products-nav-clear-filters/products-nav-clear-filters';

import { productsTranslations } from '../../../../translations/product.translations';
import { routes } from '../../../../configs';

const { ADD_PRODUCT } = productsTranslations;

const ProductsNav = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const handleProductAdd = () => {
    dispatch(push(routes.pathToAddProduct));
  };

  return (
    <Grid container direction='column' justify='center' spacing={2}>
      <Grid container item spacing={2}>
        <Grid item>
          <Button
            variant='contained'
            color='primary'
            onClick={handleProductAdd}
          >
            {ADD_PRODUCT}
          </Button>
        </Grid>
      </Grid>
      <Grid container item spacing={2} className={styles.filters}>
        <ProductsNavFilters />
        <ProductsNavClearFilters />
      </Grid>
    </Grid>
  );
};

export default ProductsNav;
