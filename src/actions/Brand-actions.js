const setBrand = (newBrand) => ({
  type: 'SET_BRAND',
  payload: newBrand
});

const setBrands = (newBrands) => ({
  type: 'SET_BRANDS',
  payload: newBrands
});

const brandLoadingStatus = () => ({
  type: 'LOADING_STATUS'
});

export { setBrand, setBrands, brandLoadingStatus };
