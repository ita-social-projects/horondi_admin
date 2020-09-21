import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import Typography from '@material-ui/core/Typography';
import { useStyles } from './products-page.styles';

import {
  getFiltredProducts,
  getAllFilters,
  deleteProduct
} from '../../../redux/products/products.actions';

import TableContainerRow from '../../../containers/table-container-row';
import TableContainerGenerator from '../../../containers/table-container-generator';
import LoadingBar from '../../../components/loading-bar';
import ProductsNav from './products-nav';

import { config } from '../../../configs';
import { productsTranslations } from '../../../translations/product.translations';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';

const {
  PRODUCT_NOT_FOUND,
  DELETE_PRODUCT_MESSAGE,
  DELETE_PRODUCT_TITLE,
  DELETE_PRODUCT_BTN
} = productsTranslations;
const tableTitles = config.tableHeadRowTitles.products;
const { imagePrefix } = config;

const ProductsPage = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const {
    loading,
    products,
    currentPage,
    rowsPerPage,
    sortByRate,
    sortByPrice,
    filters,
    sortByPopularity
  } = useSelector(
    ({
      Products: {
        loading,
        products,
        filters,
        sorting: { sortByPopularity, sortByPrice, sortByRate }
      },
      Table: {
        pagination: { rowsPerPage, currentPage }
      }
    }) => ({
      loading,
      products,
      sortByRate,
      sortByPrice,
      filters,
      sortByPopularity,
      rowsPerPage,
      currentPage
    })
  );

  const {
    categoryFilter,
    colorsFilter,
    patternsFilter,
    modelsFilter,
    isHotItemFilter
  } = filters;

  useEffect(() => {
    dispatch(getAllFilters());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFiltredProducts({}));
  }, [
    dispatch,
    sortByRate,
    sortByPrice,
    sortByPopularity,
    rowsPerPage,
    currentPage,
    categoryFilter,
    colorsFilter,
    modelsFilter,
    isHotItemFilter,
    patternsFilter
  ]);

  const handleProductDelete = (id) => {
    const removeProduct = () => {
      dispatch(closeDialog());
      dispatch(deleteProduct({ id, request: true }));
    };
    openSuccessSnackbar(
      removeProduct,
      DELETE_PRODUCT_TITLE,
      DELETE_PRODUCT_MESSAGE,
      DELETE_PRODUCT_BTN
    );
  };

  const handleProductEdit = (id) => {
    dispatch(push(`/product/${id}`));
  };

  const productsItems = products
    ? products.map(
      ({
        _id,
        name,
        category,
        basePrice,
        model,
        purchasedCount,
        pattern,
        rate,
        images
      }) => (
        <TableContainerRow
          key={_id}
          id={_id}
          avatarSrc={`${imagePrefix}${images.primary.small}`}
          name={name[0].value}
          category={category.name[0].value}
          model={model[0].value}
          pattern={pattern[0].value}
          price={Math.round(basePrice[0].value / 100)}
          rate={rate.toFixed(2)}
          purchasedCount={purchasedCount}
          editHandler={() => handleProductEdit(_id)}
          deleteHandler={() => handleProductDelete(_id)}
        />
      )
    )
    : null;

  return (
    <div className={styles.container}>
      <div className={styles.tableNav}>
        <ProductsNav />
      </div>
      {loading ? (
        <LoadingBar />
      ) : products.length ? (
        <TableContainerGenerator
          pagination
          tableTitles={tableTitles}
          tableItems={productsItems}
        />
      ) : (
        <Typography variant='h1' className={styles.productsTitle}>
          {PRODUCT_NOT_FOUND}
        </Typography>
      )}
    </div>
  );
};

export default ProductsPage;
