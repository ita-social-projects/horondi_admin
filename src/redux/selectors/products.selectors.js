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

export const selectSelectedProduct = ({ Products }) => Products.selectedProduct;
export const selectSelectedProductAndLoading = createSelector(
  selectProductLoading,
  ({ Products }) => ({ product: Products.selectedProduct }),
  (loading, product) => ({
    ...loading,
    ...product
  })
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
