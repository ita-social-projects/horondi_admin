import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { useStyles } from './products-nav-filters.styles';

import {
  setCategoryFilter,
  setColorsFilter,
  setModelsFilter,
  setPatternsFilter
} from '../../../../redux/products/products.actions';
import ProductsFiltersContainer from '../../../../containers/products-filters-container';

import ProductsNavSort from '../products-nav-sort';
import ProductsNavSearch from '../products-nav-search';

import { setCurrentPage } from '../../../../redux/table/table.actions';
import { productsTranslations } from '../../../../translations/product.translations';
import useProductSpecies from '../../../../hooks/product/use-product-species';
import ProductsNavClearFilters from '../products-nav-clear-filters/products-nav-clear-filters';

const { CATEGORIES, PATTERNS, MODELS, COLORS } = productsTranslations;

const ProductsNavFilters = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const filters = useSelector(({ Products }) => Products.filters);

  const {
    categoryFilter,
    colorsFilter,
    patternsFilter,
    modelsFilter
  } = filters;

  const {
    categories,
    categoriesNames,
    colorsNames,
    patternsNames,
    modelNames
  } = useProductSpecies();

  const handleFilterChange = ({ target }, setFilter) => {
    dispatch(setFilter(target.value));
    dispatch(setCurrentPage(0));
  };
  const handleFilterClear = (setFilter) => {
    dispatch(setFilter([]));
  };
  const filtersOptions = {
    categories: {
      buttonName: CATEGORIES,
      productFilter: categoryFilter,
      list: categories,
      labels: categoriesNames,
      clearFilter: () => handleFilterClear(setCategoryFilter),
      filterHandler: (e) => handleFilterChange(e, setCategoryFilter)
    },
    models: {
      buttonName: MODELS,
      productFilter: modelsFilter,
      list: modelNames,
      clearFilter: () => handleFilterClear(setModelsFilter),
      filterHandler: (e) => handleFilterChange(e, setModelsFilter)
    },
    colors: {
      buttonName: COLORS,
      productFilter: colorsFilter,
      list: colorsNames,
      clearFilter: () => handleFilterClear(setColorsFilter),
      filterHandler: (e) => handleFilterChange(e, setColorsFilter)
    },
    patterns: {
      buttonName: PATTERNS,
      productFilter: patternsFilter,
      list: patternsNames,
      clearFilter: () => handleFilterClear(setPatternsFilter),
      filterHandler: (e) => handleFilterChange(e, setPatternsFilter)
    }
  };

  const filterButtons = Object.values(
    filtersOptions
  ).map(
    ({
      buttonName,
      productFilter,
      list,
      labels,
      filterHandler,
      clearFilter
    }) => (
      <ProductsFiltersContainer
        key={buttonName}
        buttonName={buttonName}
        productFilter={productFilter}
        list={list}
        labels={labels}
        filterHandler={filterHandler}
        clearFilter={clearFilter}
      />
    )
  );

  return (
    <div>
      <Grid
        container
        alignItems='center'
        className={styles.wrapper}
        spacing={2}
      >
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <ProductsNavSort />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={5}>
          <ProductsNavSearch />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <ProductsNavClearFilters />
        </Grid>
        <Grid
          container
          alignItems='center'
          className={styles.wrapper}
          spacing={2}
        >
          {filterButtons}
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductsNavFilters;
