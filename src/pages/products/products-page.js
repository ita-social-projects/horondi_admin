import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import {
  getFiltredProducts,
  getAllFilters,
  deleteProduct
} from '../../redux/products/products.actions';

import TableContainerRow from '../../containers/table-container-row';
import LoadingBar from '../../components/loading-bar';

import { config } from '../../configs';
import { productsTranslations } from '../../translations/product.translations';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import { selectProductsAndTable } from '../../redux/selectors/multiple.selectors';
import { useCommonStyles } from '../common.styles';
import { handleProductsPage } from '../../utils/handle-products-page';

const {
  PRODUCT_NOT_FOUND,
  DELETE_PRODUCT_MESSAGE,
  DELETE_PRODUCT_TITLE
} = productsTranslations;
const tableTitles = config.tableHeadRowTitles.products;
const { imagePrefix } = config;

const ProductsPage = () => {
  const common = useCommonStyles();

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
    sortByPopularity,
    itemsCount
  } = useSelector(selectProductsAndTable);

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
      DELETE_PRODUCT_MESSAGE,
      DELETE_PRODUCT_TITLE
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
          image={`${imagePrefix}${images.primary.small}`}
          name={name[0].value}
          category={category.name[0].value}
          model={model.name[0].value}
          pattern={pattern.name[0].value}
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
    <div className={common.container}>
      {loading ? (
        <LoadingBar />
      ) : (
        handleProductsPage(
          products,
          itemsCount,
          tableTitles,
          productsItems,
          common.materialTitle,
          PRODUCT_NOT_FOUND
        )
      )}
    </div>
  );
};

export default ProductsPage;
