import React from 'react';
import { useDispatch } from 'react-redux';

import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {
  setSortByPopularity,
  setSortByPrice,
  setSortByRate
} from '../../../redux/products/products.actions';
import { useStyles } from './products-nav-sort.styles';

import { config } from '../../../configs';
import { productsTranslations } from '../../../translations/product.translations';

const { sortBySelectOptions, sortAsc, sortDesc, rate, popularity } = config;
const { SORT } = productsTranslations;

const ProductsNavSort = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const selectOptions = sortBySelectOptions.map(({ label, value }, idx) => (
    <option key={idx} value={value}>
      {label}
    </option>
  ));

  const selectHandler = (e) => {
    const { value } = e.target;

    switch (value) {
    case sortAsc:
      return dispatch(setSortByPrice(1));
    case sortDesc:
      return dispatch(setSortByPrice(-1));
    case rate:
      return dispatch(setSortByRate(-1));
    case popularity:
      return dispatch(setSortByPopularity(-1));
    default:
    }
  };

  return (
    <div className={styles.sort}>
      <Typography>{SORT}</Typography>
      <TextField
        select
        SelectProps={{ native: true }}
        onChange={selectHandler}
        variant='outlined'
        className={styles.select}
      >
        {selectOptions}
      </TextField>
    </div>
  );
};

export default ProductsNavSort;
