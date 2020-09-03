import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { ButtonGroup } from '@material-ui/core';
import { useStyles } from './products-nav-filters.styles';

import {
  setCategoryFilter,
  setColorsFilter,
  setModelsFilter,
  setPatternsFilter
} from '../../../redux/products/products.actions';
import ProductsFilterContainer from '../../../components/products-filters-container';

import ProductsNavSort from '../products-nav-sort';
import ProductsNavSearch from '../products-nav-search';

const ProductsNavFilters = () => {
  const styles = useStyles();
  const { filterData, filters } = useSelector(({ Products }) => ({
    filterData: Products.filterData,
    filters: Products.filters
  }));

  const {
    categoryFilter,
    colorsFilter,
    patternsFilter,
    modelsFilter
  } = filters;

  const categoriesNames = useMemo(
    () => [
      ...new Set(filterData.map(({ category }) => category.name[0].value))
    ],
    [filterData]
  );

  const categories = useMemo(
    () =>
      categoriesNames.map(
        (category) =>
          filterData.find(
            ({ category: { name } }) => category === name[0].value
          ).category
      ),
    [filterData, categoriesNames]
  );

  const colorsNames = useMemo(
    () => [
      ...new Set(filterData.map(({ colors }) => colors[0].simpleName[0].value))
    ],
    [filterData]
  );

  const colors = useMemo(
    () =>
      colorsNames.map((color) =>
        filterData.find(({ colors }) => colors[0].simpleName[0].value === color)
      ),
    [filterData, colorsNames]
  );

  const patternsNames = useMemo(
    () => [...new Set(filterData.map(({ pattern }) => pattern[0].value))],
    [filterData]
  );

  const patterns = useMemo(
    () =>
      patternsNames.map((item) =>
        filterData.find(({ pattern }) => pattern[0].value === item)
      ),
    [filterData, patternsNames]
  );

  const modelNames = useMemo(
    () => [...new Set(filterData.map(({ model }) => model[0].value))],
    [filterData]
  );

  const models = useMemo(
    () =>
      modelNames.map((item) =>
        filterData.find(({ model }) => model[0].value === item)
      ),
    [filterData, modelNames]
  );

  const filtersOptions = {
    categories: {
      buttonName: 'КАТЕГОРІЇ',
      productFilter: categoryFilter,
      setFilter: setCategoryFilter,
      list: categories,
      labels: categoriesNames
    },
    models: {
      buttonName: 'МОДЕЛІ',
      productFilter: modelsFilter,
      setFilter: setModelsFilter,
      list: models,
      labels: modelNames
    },
    colors: {
      buttonName: 'КОЛЬОРИ',
      productFilter: colorsFilter,
      setFilter: setColorsFilter,
      list: colors,
      labels: colorsNames
    },
    patterns: {
      buttonName: 'ГОБЕЛЕНИ',
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
