import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import ProductsNavFilters from './products-nav-filters';

import { setTableDense } from '../../../../redux/table/table.actions';

import { productsTranslations } from '../../../../translations/product.translations';
import { config } from '../../../../configs';

const { ADD_PRODUCT, COMPACT_TABLE } = productsTranslations;
const { routes } = config.app;

const ProductsNav = () => {
  const dispatch = useDispatch();
  const dense = useSelector(({ Table }) => Table.dense);

  const handleDense = (e) => {
    dispatch(setTableDense(e.target.checked));
  };

  const redirectToProductsAdd = () => {
    dispatch(push(routes.pathToAddProduct));
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Button
          variant='contained'
          color='primary'
          onClick={redirectToProductsAdd}
        >
          {ADD_PRODUCT}
        </Button>
      </Grid>
      <Grid item>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleDense} />}
          label={COMPACT_TABLE}
        />
      </Grid>
      <ProductsNavFilters />
    </Grid>
  );
};

export default ProductsNav;
