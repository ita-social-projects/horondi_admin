import React from 'react';
import { push } from 'connected-react-router';
import { Button, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import ProductsNavFilters from './products-nav-filters';
import ProductsNavClearFilters from './products-nav-clear-filters/products-nav-clear-filters';

import { productsTranslations } from '../../../../translations/product.translations';
import routes from '../../../../configs/routes';
import { useCommonStyles } from '../../../common';
import { config } from '../../../../configs';

const { ADD_PRODUCT } = productsTranslations;

const ProductsNav = () => {
  const common = useCommonStyles();

  const dispatch = useDispatch();
  const handleProductAdd = () => {
    dispatch(push(routes.pathToAddProduct));
  };

  return (
    <div>
      <div className={common.adminHeader}>
        <Typography variant='h1' className={common.materialTitle}>
          {config.titles.productPageTitles.mainPageTitle}
        </Typography>
        <Button variant='contained' color='primary' onClick={handleProductAdd}>
          {ADD_PRODUCT}
        </Button>
      </div>
      <ProductsNavFilters />
      <ProductsNavClearFilters />
    </div>
  );
};

export default ProductsNav;
