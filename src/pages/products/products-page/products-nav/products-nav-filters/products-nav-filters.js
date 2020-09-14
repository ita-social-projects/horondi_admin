import React from 'react';
import { useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { useStyles } from './products-nav-filters.styles';

import {
  setCategoryFilter,
  setColorsFilter,
  setModelsFilter,
  setPatternsFilter
} from '../../../../../redux/products/products.actions';

import ProductsFilterContainer from '../../../../../components/products-filters-container';
import ProductsNavSort from '../products-nav-sort';
import ProductsNavSearch from '../products-nav-search';
import { productsTranslations } from '../../../../../translations/product.translations';
import useProductHandler from '../../../../../utils/use-product-handler';

const { CATEGORIES, PATTERNS, MODELS, COLORS } = productsTranslations;

const ProductsNavFilters = () => {
  const styles = useStyles();
  const { filters } = useSelector(({ Products }) => ({
    filters: Products.filters
  }));

  const {
    colors,
    colorsNames,
    patterns,
    patternsNames,
    categories,
    categoriesNames,
    models,
    modelNames
  } = useProductHandler();

  const {
    categoryFilter,
    colorsFilter,
    patternsFilter,
    modelsFilter
  } = filters;

  const filtersOptions = {
    categories: {
      buttonName: CATEGORIES,
      productFilter: categoryFilter,
      setFilter: setCategoryFilter,
      list: categories,
      labels: categoriesNames
    },
    models: {
      buttonName: MODELS,
      productFilter: modelsFilter,
      setFilter: setModelsFilter,
      list: models,
      labels: modelNames
    },
    colors: {
      buttonName: COLORS,
      productFilter: colorsFilter,
      setFilter: setColorsFilter,
      list: colors,
      labels: colorsNames
    },
    patterns: {
      buttonName: PATTERNS,
      productFilter: patternsFilter,
      setFilter: setPatternsFilter,
      list: patterns,
      labels: patternsNames
    }
  };

  const filterButtons = Object.values(
    filtersOptions
  ).map(({ buttonName, productFilter, setFilter, list, labels }, idx) => (
    <ProductsFilterContainer
      key={idx}
      buttonName={buttonName}
      productFilter={productFilter}
      setFilter={setFilter}
      list={list}
      labels={labels}
    />
  ));

  return (
    <Grid container alignItems='center' className={styles.wrapper} spacing={2}>
      <Grid item>
        <ProductsNavSort />
      </Grid>
      <Grid item>
        <Grid container>{filterButtons}</Grid>
      </Grid>
      <Grid item>
        <ProductsNavSearch />
      </Grid>
    </Grid>
  );
};

export default ProductsNavFilters;
