import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import { useStyles } from './products-nav-filters.styles';

import {
  setCategoryFilter,
  setColorsFilter,
  setModelsFilter,
  setPatternsFilter,
  setSearchFilter,
  getFiltredProducts,
  setSortByPopularity,
  setSortByPrice,
  setSortByRate
} from '../../../../redux/products/products.actions';
import ProductsFilterContainer from '../../../../components/products-filters-container';

import { config } from '../../../../configs';

const { sortBySelectOptions, sortAsc, sortDesc, rate, popularity } = config;
const submitKey = 'Enter';

const ProductsNavFilters = () => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const { filterData, filters } = useSelector(({ Products }) => ({
    filterData: Products.filterData,
    filters: Products.filters
  }));

  const {
    categoryFilter,
    colorsFilter,
    patternsFilter,
    modelsFilter,
    isHotItemFilter,
    searchFilter
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

  const handleClearFilters = () => {
    dispatch(setColorsFilter([]));
    dispatch(setPatternsFilter([]));
    dispatch(setCategoryFilter([]));
    dispatch(setSearchFilter(''));
    dispatch(setModelsFilter([]));
  };

  const handleSearch = (event) => {
    dispatch(setSearchFilter(event.target.value));
  };

  const searchValue = () => {
    dispatch(getFiltredProducts({}));
    dispatch(setSearchFilter(''));
  };

  const handleSearchSubmit = (event) => {
    if (event.key === submitKey) {
      searchValue();
    }
  };

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

  const selectOptions = sortBySelectOptions.map(({ label, value }, idx) => (
    <option key={idx} value={value}>
      {label}
    </option>
  ));

  return (
    <div className={styles.wrapper}>
      <div className={styles.sort}>
        <Typography>Сортувати за:</Typography>
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
      <div className={styles.buttons}>
        {Object.values(filtersOptions).map(
          ({ buttonName, productFilter, setFilter, list, labels }, idx) => (
            <ProductsFilterContainer
              key={idx}
              buttonName={buttonName}
              productFilter={productFilter}
              setFilter={setFilter}
              list={list}
              labels={labels}
            />
          )
        )}
      </div>
      <div className={styles.search}>
        <Paper className={styles.root}>
          <InputBase
            className={styles.input}
            placeholder='Шукати'
            value={searchFilter}
            onChange={handleSearch}
            onKeyPress={handleSearchSubmit}
          />
          <Tooltip title='Шукати' placement='bottom'>
            <IconButton
              className={styles.iconButton}
              aria-label='search'
              onClick={searchValue}
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>
        </Paper>
        <Button
          className={styles.clearButton}
          disabled={
            !Object.values(filters).some((filter) => filter.length) &&
            !isHotItemFilter
          }
          variant='contained'
          color='primary'
          onClick={handleClearFilters}
        >
          ОЧИСТИТИ
        </Button>
      </div>
    </div>
  );
};

export default ProductsNavFilters;
