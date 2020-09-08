import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { useStyles } from './products-nav-clear-filters.styles';
import { productsTranslations } from '../../../translations/product.translations';

import {
  setCategoryFilter,
  setColorsFilter,
  setModelsFilter,
  setPatternsFilter,
  setSearchFilter
} from '../../../redux/products/products.actions';

const { CLEAR_FILTERS } = productsTranslations;

const ProductsNavClearFilters = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const filters = useSelector(({ Products }) => Products.filters);

  const { isHotItemFilter } = filters;

  const handleClearFilters = () => {
    dispatch(setColorsFilter([]));
    dispatch(setPatternsFilter([]));
    dispatch(setCategoryFilter([]));
    dispatch(setSearchFilter(''));
    dispatch(setModelsFilter([]));
  };

  return (
    <Button
      className={styles.clearButton}
      disabled={
        Object.values(filters).every((filter) => !filter.length) &&
        !isHotItemFilter
      }
      onClick={handleClearFilters}
    >
      {CLEAR_FILTERS}
    </Button>
  );
};

export default ProductsNavClearFilters;
