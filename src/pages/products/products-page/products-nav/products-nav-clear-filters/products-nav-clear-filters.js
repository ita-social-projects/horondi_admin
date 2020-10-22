import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box } from '@material-ui/core';
import { useStyles } from './products-nav-clear-filters.styles';
import { productsTranslations } from '../../../../../translations/product.translations';

import {
  setCategoryFilter,
  setColorsFilter,
  setModelsFilter,
  setPatternsFilter,
  setSearchFilter
} from '../../../../../redux/products/products.actions';

const { CLEAR_FILTERS } = productsTranslations;

const ProductsNavClearFilters = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const filters = useSelector(({ Products }) => Products.filters);

  const { isHotItemFilter, searchFilter, ...arrayFilters } = filters;

  const handleClearFilters = () => {
    dispatch(setColorsFilter([]));
    dispatch(setPatternsFilter([]));
    dispatch(setCategoryFilter([]));
    dispatch(setSearchFilter(''));
    dispatch(setModelsFilter([]));
  };

  return (
    <Box ml={1}>
      <Button
        className={styles.clearButton}
        disabled={
          Object.values(arrayFilters).every((filter) => !filter.length) &&
          !isHotItemFilter &&
          !searchFilter.trim().length
        }
        onClick={handleClearFilters}
      >
        {CLEAR_FILTERS}
      </Button>
    </Box>
  );
};

export default ProductsNavClearFilters;
