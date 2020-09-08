import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { useStyles } from './products-nav-filters.styles';

import {
  setCategoryFilter,
  setColorsFilter,
  setModelsFilter,
  setPatternsFilter
} from '../../../redux/products/products.actions';
import ProductsFilterContainer from '../../../containers/products-filters-container';

import ProductsNavSort from '../products-nav-sort';
import ProductsNavSearch from '../products-nav-search';

import { productsTranslations } from '../../../translations/product.translations';
import { setCurrentPage } from '../../../redux/table/table.actions';

const { CATEGORIES, PATTERNS, MODELS, COLORS } = productsTranslations;

const ProductsNavFilters = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
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
      colorsNames.map(
        (color) =>
          filterData.find(
            ({ colors }) => colors[0].simpleName[0].value === color
          ).colors
      ),
    [filterData, colorsNames]
  );

  const patternsNames = useMemo(
    () => [...new Set(filterData.map(({ pattern }) => pattern[0].value))],
    [filterData]
  );

  const patterns = useMemo(
    () =>
      patternsNames.map(
        (item) =>
          filterData.find(({ pattern }) => pattern[0].value === item).pattern
      ),
    [filterData, patternsNames]
  );

  const modelNames = useMemo(
    () => [...new Set(filterData.map(({ model }) => model[0].value))],
    [filterData]
  );

  const models = useMemo(
    () =>
      modelNames.map(
        (item) => filterData.find(({ model }) => model[0].value === item).model
      ),
    [filterData, modelNames]
  );

  const handleFilterChange = ({ target }, setFilter) => {
    dispatch(setFilter(target.value));
    dispatch(setCurrentPage(0));
  };

  const filtersOptions = {
    categories: {
      buttonName: CATEGORIES,
      productFilter: categoryFilter,
      list: categories,
      labels: categoriesNames,
      filterHandler: (e) => handleFilterChange(e, setCategoryFilter)
    },
    models: {
      buttonName: MODELS,
      productFilter: modelsFilter,
      list: models,
      labels: modelNames,
      filterHandler: (e) => handleFilterChange(e, setModelsFilter)
    },
    colors: {
      buttonName: COLORS,
      productFilter: colorsFilter,
      list: colors,
      labels: colorsNames,
      filterHandler: (e) => handleFilterChange(e, setColorsFilter)
    },
    patterns: {
      buttonName: PATTERNS,
      productFilter: patternsFilter,
      list: patterns,
      labels: patternsNames,
      filterHandler: (e) => handleFilterChange(e, setPatternsFilter)
    }
  };

  const filterButtons = Object.values(
    filtersOptions
  ).map(({ buttonName, productFilter, list, labels, filterHandler }, idx) => (
    <ProductsFilterContainer
      key={labels[idx]}
      buttonName={buttonName}
      productFilter={productFilter}
      list={list}
      labels={labels}
      filterHandler={filterHandler}
    />
  ));

  return (
    <div>
      <Grid
        container
        alignItems='center'
        className={styles.wrapper}
        spacing={2}
      >
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
    </div>
  );
};

export default ProductsNavFilters;
