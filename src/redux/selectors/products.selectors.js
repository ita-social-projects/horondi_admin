export const selectProductsAndTable = ({ Products, Table }) => ({
  productsState: Products,
  tableState: Table
});

export const selectProducts = ({ Products }) => Products;

export const selectProductsToUpload = ({ Products }) => ({
  upload: Products.upload,
  primaryImageUpload: Products.primaryImageUpload
});

export const selectFilesToDeleteAndProduct = ({ Products }) => ({
  images: Products.filesToDelete,
  selectedProduct: Products.selectedProduct
});
