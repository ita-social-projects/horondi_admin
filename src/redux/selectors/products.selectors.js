import { createSelector } from 'reselect';

export const selectProductsAndTable = ({ Products, Table }) => ({
  productsState: Products,
  tableState: Table
});

export const selectProducts = ({ Products }) => Products;

export const selectProductsToUpload = ({ Products }) => ({
  upload: Products.upload,
  primaryImageUpload: Products.primaryImageUpload
});

export const selectProductDetails = ({ Products }) => ({
  details: Products.details
});

export const selectProductLoading = ({ Products }) => ({
  loading: Products.loading
});

export const selectSelectedProduct = ({ Products }) => ({
  product: Products.selectedProduct
});

export const selectSelectedProductAndLoading = createSelector(
  selectProductLoading,
  selectSelectedProduct,
  (loading, product) => ({
    ...loading,
    ...product
  })
);

export const selectProduct = createSelector(
  selectProducts,
  (product) => product
);

export const selectSelectedProductAndDetails = createSelector(
  selectProductDetails,
  selectSelectedProduct,
  (details, product) => ({ ...product, ...details })
);

export const selectProductsLoadingAndDetails = createSelector(
  selectProductDetails,
  selectProductLoading,
  (details, loading) => ({
    ...details,
    ...loading
  })
);

export const selectFilesToDeleteAndProduct = ({ Products }) => ({
  images: Products.filesToDelete,
  selectedProduct: Products.selectedProduct
});
