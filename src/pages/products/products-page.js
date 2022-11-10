import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import Typography from '@material-ui/core/Typography';

import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  getFiltredProducts,
  deleteProduct
} from '../../redux/products/products.actions';

import TableContainerRow from '../../containers/table-container-row';
import LoadingBar from '../../components/loading-bar';

import { config } from '../../configs';
import { productsErrors } from '../../configs/error-modal-messages';
import { productsTranslations } from '../../configs/product-translations';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import { selectProductsAndTable } from '../../redux/selectors/multiple.selectors';
import { useCommonStyles } from '../common.styles';
import { handleProductsPage } from '../../utils/handle-products-page';
import useProductFilters from '../../hooks/filters/use-product-filters';
import FilterNavbar from '../../components/filter-search-sort';
import { selectProductsLoadingAndDetails } from '../../redux/selectors/products.selectors';

const pathToProductAddPage = config.routes.pathToAddProduct;
const pathToProductEditPage = config.routes.pathToProducts;

const { DELETE_PRODUCT_MESSAGE, DELETE_PRODUCT_TITLE } = productsTranslations;
const { PRODUCT_NOT_FOUND } = productsErrors;
const tableTitles = config.tableHeadRowTitles.products;
const { imagePrefix } = config;

const ProductsPage = () => {
  const common = useCommonStyles();

  const dispatch = useDispatch();
  const productFilters = useProductFilters();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const {
    loading,
    products,
    currentPage,
    rowsPerPage,
    filters,
    sort,
    itemsCount
  } = useSelector(selectProductsAndTable);
  const { loading: detailLoading } = useSelector(
    selectProductsLoadingAndDetails
  );

  useEffect(() => {
    dispatch(
      getFiltredProducts({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage,
        filter: {
          pattern: filters.pattern,
          category: filters.category,
          models: filters.models
        },
        sort,
        search: filters.search
      })
    );
  }, [dispatch, sort, rowsPerPage, currentPage, filters]);

  const handleProductDelete = (id) => {
    const removeProduct = async () => {
      dispatch(closeDialog());
      dispatch(
        deleteProduct({
          id,
          request: true,
          limit: rowsPerPage,
          skip: rowsPerPage * currentPage
        })
      );
    };
    openSuccessSnackbar(
      removeProduct,
      DELETE_PRODUCT_MESSAGE,
      DELETE_PRODUCT_TITLE
    );
  };

  const handleProductEdit = (id) => {
    dispatch(push(`${pathToProductEditPage}/${id}`));
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
            price={basePrice}
            rate={rate.toFixed(2)}
            purchasedCount={purchasedCount || '0'}
            editHandler={() => handleProductEdit(_id)}
            deleteHandler={() => handleProductDelete(_id)}
          />
        )
      )
    : null;

  if (loading || detailLoading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.container}>
      <div className={common.adminHeader}>
        <Typography
          variant='h1'
          className={common.materialTitle}
          data-cy='product-header'
        >
          {config.titles.productTitles.mainPageTitle}
        </Typography>
        <Button
          data-cy='add-product'
          component={Link}
          to={pathToProductAddPage}
          variant='contained'
          color='primary'
        >
          {productsTranslations.CREATE_PRODUCT}
        </Button>
      </div>
      <FilterNavbar options={productFilters} />

      {products?.length ? (
        handleProductsPage(products, itemsCount, tableTitles, productsItems)
      ) : (
        <p className={common.noRecords}>{PRODUCT_NOT_FOUND}</p>
      )}
    </div>
  );
};

export default ProductsPage;
