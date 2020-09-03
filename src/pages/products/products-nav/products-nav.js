import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import ProductsNavFilters from '../products-nav-filters';
import { useStyles } from './products-nav.styles';

import { setTableDense } from '../../../redux/table/table.actions';

const ProductsNav = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const dense = useSelector(({ Table }) => Table.dense);

  const handleDense = (e) => {
    dispatch(setTableDense(e.target.checked));
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Button variant='contained' color='primary'>
          ДОДАТИ ПРОДУКТ
        </Button>
      </Grid>
      <Grid item>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleDense} />}
          label='Компактна таблиця'
        />
      </Grid>
      <ProductsNavFilters />
    </Grid>
  );
};

export default ProductsNav;
