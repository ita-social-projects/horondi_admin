import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FormControl, MenuItem, Select, Typography } from '@material-ui/core';
import {
  setSortByPopularity,
  setSortByPrice,
  setSortByRate
} from '../../../../../redux/products/products.actions';
import { useStyles } from './products-nav-sort.styles';

import { config } from '../../../../../configs';
import { productsTranslations } from '../../../../../translations/product.translations';
import { setCurrentPage } from '../../../../../redux/table/table.actions';

const {
  product: { sortBySelectOptions },
  sortAsc,
  sortDesc,
  rate,
  popularity
} = config;
const { SORT } = productsTranslations;

const ProductsNavSort = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [selectedSort, setSelectedSort] = useState(
    sortBySelectOptions[0].value
  );

  const selectOptions = sortBySelectOptions.map(({ label, value }) => (
    <MenuItem key={label} value={value}>
      {label}
    </MenuItem>
  ));

  const selectHandler = (e) => {
    const { value } = e.target;
    setSelectedSort(value);
    dispatch(setCurrentPage(0));
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
      <FormControl className={styles.formControl}>
        <Select
          labelId='checkbox-label'
          id='checkbox'
          value={selectedSort}
          onChange={selectHandler}
          defaultValue={0}
        >
          {selectOptions}
        </Select>
      </FormControl>
    </div>
  );
};

export default ProductsNavSort;
