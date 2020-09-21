import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './products-nav-search.styles';

import {
  getFiltredProducts,
  setSearchFilter
} from '../../../../../redux/products/products.actions';

import { productsTranslations } from '../../../../../translations/product.translations';
import { config } from '../../../../../configs';

const { submitKey } = config;
const { SEARCH } = productsTranslations;

const ProductsNavSearch = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const filters = useSelector(({ Products }) => Products.filters);

  const { searchFilter } = filters;

  const handleSearch = (event) => {
    dispatch(setSearchFilter(event.target.value));
  };

  const searchValue = () => {
    if (searchFilter.trim().length) {
      dispatch(getFiltredProducts({}));
    }
  };

  const handleSearchSubmit = (event) => {
    if (event.key === submitKey) {
      searchValue();
    }
  };

  return (
    <div>
      <Paper className={styles.root}>
        <InputBase
          placeholder={SEARCH}
          value={searchFilter}
          onChange={handleSearch}
          onKeyPress={handleSearchSubmit}
        />
        <Tooltip title={SEARCH} placement='bottom'>
          <IconButton
            className={styles.iconButton}
            aria-label='search'
            onClick={searchValue}
          >
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </Paper>
    </div>
  );
};

export default ProductsNavSearch;
