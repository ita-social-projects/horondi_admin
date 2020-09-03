import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { useStyles } from './products-page.styles';

import {
  getFiltredProducts,
  getAllFilters
} from '../../../redux/products/products.actions';

import TableContainerRow from '../../../components/table-container-row';
import TableContainerGenerator from '../../../components/table-container-generator';
import LoadingBar from '../../../components/loading-bar';
import ProductsNav from '../products-nav';
import { config } from '../../../configs';

const tableTitles = config.tableHeadRowTitles.products;

const ProductsPage = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

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
        sortByRate,
        sortByPrice,
        filters,
        sortByPopularity
      },
      Table: { rowsPerPage, currentPage }
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

  const productDeleteHandler = (id) => {
    console.log(id);
  };

  const productsItems = products
    ? products.map(
      (
        { _id, name, category, basePrice, model, purchasedCount, pattern },
        idx
      ) => (
        <TableContainerRow
          key={idx}
          id={_id}
          name={name[0].value}
          category={category.name[0].value}
          model={model[0].value}
          pattern={pattern[0].value}
          price={basePrice[0].value / 100}
          purchasedCount={purchasedCount}
          deleteHandler={() => productDeleteHandler(_id)}
          editHandler={() => {
            dispatch(push(`/products/${_id}`));
          }}
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
      ) : (
        <TableContainerGenerator
          pagination
          tableTitles={tableTitles}
          tableItems={productsItems}
        />
      )}
    </div>
  );
};

export default ProductsPage;
