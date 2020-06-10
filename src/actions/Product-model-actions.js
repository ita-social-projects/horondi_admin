const setProductModel = (newProductModel) => ({
  type: 'SET_PRODUCT_MODEL',
  payload: newProductModel
});

const setSizeModel = (newSizeModel) => ({
  type: 'SET_SIZE_MODEL',
  payload: newSizeModel
});

const setProductSizes = (newProductSizes) => ({
  type: 'SET_PRODUCT_SIZES',
  payload: newProductSizes
});

export { setProductModel, setSizeModel, setProductSizes };
