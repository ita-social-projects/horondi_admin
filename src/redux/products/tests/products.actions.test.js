import {
  getProduct,
  getAllFilters,
  getFiltredProducts,
  getModelsByCategory,
  getProductOptions,
  getProductSpecies,
  setAllFilterData,
  setAllProducts,
  setCategoryFilter,
  setColorsFilter,
  setFilesToDelete,
  setFilesToUpload,
  setModels,
  setModelsFilter,
  setPatternsFilter,
  setPriceFilter,
  setPrimaryImageToUpload,
  setProduct,
  setProductCategories,
  setProductLoading,
  setProductOptions,
  setProductToSend,
  setProductsError,
  setProductsLoading,
  setSearchFilter,
  setSortByDate,
  setSortByPopularity,
  setSortByPrice,
  setSortByRate,
  clearFilesToUpload,
  clearProductToSend,
  addProduct,
  deleteImages,
  deleteProduct,
  removeImagesToUpload,
  updateProduct
} from '../products.actions';

import {
  GET_PRODUCT,
  SET_ALL_PRODUCTS,
  GET_ALL_FILTERS,
  SET_ALL_FILTER_DATA,
  SET_SORT_BY_PRICE,
  SET_SORT_BY_DATE,
  SET_SORT_BY_RATE,
  SET_SORT_BY_POPULARITY,
  GET_FILTRED_PRODUCTS,
  SET_PRODUCTS_LOADING,
  SET_CATEGORY_FILTER,
  SET_PRICE_FILTER,
  SET_COLORS_FILTER,
  SET_PATTERNS_FILTER,
  SET_MODELS_FILTER,
  SET_SEARCH,
  SET_PRODUCT_LOADING,
  SET_PRODUCT_TO_SEND,
  CLEAR_PRODUCT_TO_SEND,
  SET_PRODUCTS_ERROR,
  GET_PRODUCT_SPECIES,
  SET_PRODUCT_CATEGORIES,
  GET_PRODUCT_OPTIONS,
  SET_PRODUCT_OPTIONS,
  GET_MODELS_BY_CATEGORY,
  SET_MODELS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  SET_FILES_TO_UPLOAD,
  SET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_IMAGES,
  CLEAR_FILES_TO_UPLOAD,
  SET_FILES_TO_DELETE,
  REMOVE_IMAGES_TO_UPLOAD,
  SET_PRIMARY_IMAGE_TO_UPLOAD
} from '../products.types';

import {
  mockCategory,
  mockCategoryId,
  mockColors,
  mockError,
  mockFilesToUpload,
  mockFiltersData,
  mockId,
  mockModels,
  mockPrimaryImage,
  mockProduct,
  mockProductOptions,
  mockProductsList,
  mockProductToDelete,
  mockProductToUpdatePayload
} from './products.variables';

describe('Test products actions', () => {
  it('should get product by id', () => {
    expect(getProduct(mockId)).toEqual({
      type: GET_PRODUCT,
      payload: mockId
    });
  });

  it('should set all filters data', () => {
    expect(setAllFilterData(mockFiltersData)).toEqual({
      type: SET_ALL_FILTER_DATA,
      payload: mockFiltersData
    });
  });

  it('should set sort by price', () => {
    expect(setSortByPrice(1)).toEqual({
      type: SET_SORT_BY_PRICE,
      payload: 1
    });
  });

  it('should set sort by date', () => {
    expect(setSortByDate(1)).toEqual({
      type: SET_SORT_BY_DATE,
      payload: 1
    });
  });

  it('should set sort by rate', () => {
    expect(setSortByRate(1)).toEqual({
      type: SET_SORT_BY_RATE,
      payload: 1
    });
  });

  it('should set sort by popularity', () => {
    expect(setSortByPopularity(1)).toEqual({
      type: SET_SORT_BY_POPULARITY,
      payload: 1
    });
  });

  it('should get filtered products', () => {
    expect(getFiltredProducts({})).toEqual({
      type: GET_FILTRED_PRODUCTS,
      payload: {}
    });
  });

  it('should set products loading', () => {
    expect(setProductsLoading(true)).toEqual({
      type: SET_PRODUCTS_LOADING,
      payload: true
    });
  });

  it('should set category filter', () => {
    expect(setCategoryFilter([mockCategoryId])).toEqual({
      type: SET_CATEGORY_FILTER,
      payload: [mockCategoryId]
    });
  });

  it('should set price filter', () => {
    expect(setPriceFilter([1000])).toEqual({
      type: SET_PRICE_FILTER,
      payload: [1000]
    });
  });

  it('should set colors filter', () => {
    expect(setColorsFilter(mockColors)).toEqual({
      type: SET_COLORS_FILTER,
      payload: mockColors
    });
  });

  it('should set colors filter', () => {
    expect(setColorsFilter(mockColors)).toEqual({
      type: SET_COLORS_FILTER,
      payload: mockColors
    });
  });

  it('should set patterns filter', () => {
    expect(setPatternsFilter(['pattern'])).toEqual({
      type: SET_PATTERNS_FILTER,
      payload: ['pattern']
    });
  });

  it('should set models filter', () => {
    expect(setModelsFilter(['model'])).toEqual({
      type: SET_MODELS_FILTER,
      payload: ['model']
    });
  });

  it('should set search filter', () => {
    expect(setSearchFilter(['search'])).toEqual({
      type: SET_SEARCH,
      payload: ['search']
    });
  });

  it('should set all products', () => {
    expect(setAllProducts(mockProductsList)).toEqual({
      type: SET_ALL_PRODUCTS,
      payload: mockProductsList
    });
  });

  it('should get all filters', () => {
    expect(getAllFilters()).toEqual({
      type: GET_ALL_FILTERS
    });
  });

  it('should set product loading', () => {
    expect(setProductLoading(true)).toEqual({
      type: SET_PRODUCT_LOADING,
      payload: true
    });
  });

  it('should set product to send', () => {
    expect(setProductToSend(mockProduct)).toEqual({
      type: SET_PRODUCT_TO_SEND,
      payload: mockProduct
    });
  });

  it('should clear product to send', () => {
    expect(clearProductToSend()).toEqual({
      type: CLEAR_PRODUCT_TO_SEND
    });
  });

  it('should set products error', () => {
    expect(setProductsError(mockError)).toEqual({
      type: SET_PRODUCTS_ERROR,
      payload: mockError
    });
  });

  it('should get products species', () => {
    expect(getProductSpecies()).toEqual({
      type: GET_PRODUCT_SPECIES
    });
  });

  it('should set products categories', () => {
    expect(setProductCategories(mockCategory)).toEqual({
      type: SET_PRODUCT_CATEGORIES,
      payload: mockCategory
    });
  });

  it('should set products options', () => {
    expect(setProductOptions(mockProductOptions)).toEqual({
      type: SET_PRODUCT_OPTIONS,
      payload: mockProductOptions
    });
  });

  it('should get products options', () => {
    expect(getProductOptions()).toEqual({
      type: GET_PRODUCT_OPTIONS
    });
  });

  it('should get model by category', () => {
    expect(getModelsByCategory(mockId)).toEqual({
      type: GET_MODELS_BY_CATEGORY,
      payload: mockId
    });
  });

  it('should set model', () => {
    expect(setModels(mockModels)).toEqual({
      type: SET_MODELS,
      payload: mockModels
    });
  });

  it('should add product', () => {
    expect(addProduct(mockProduct)).toEqual({
      type: ADD_PRODUCT,
      payload: mockProduct
    });
  });

  it('should delete product', () => {
    expect(deleteProduct(mockProductToDelete)).toEqual({
      type: DELETE_PRODUCT,
      payload: mockProductToDelete
    });
  });

  it('should set files to upload', () => {
    expect(setFilesToUpload(mockFilesToUpload)).toEqual({
      type: SET_FILES_TO_UPLOAD,
      payload: mockFilesToUpload
    });
  });

  it('should set product', () => {
    expect(setProduct(mockProduct)).toEqual({
      type: SET_PRODUCT,
      payload: mockProduct
    });
  });

  it('should update product', () => {
    expect(updateProduct(mockProductToUpdatePayload)).toEqual({
      type: UPDATE_PRODUCT,
      payload: mockProductToUpdatePayload
    });
  });

  it('should delete images', () => {
    expect(deleteImages(mockId)).toEqual({
      type: DELETE_IMAGES,
      payload: mockId
    });
  });

  it('should clear files to upload', () => {
    expect(clearFilesToUpload([])).toEqual({
      type: CLEAR_FILES_TO_UPLOAD,
      payload: []
    });
  });

  it('should set files to delete', () => {
    expect(setFilesToDelete(['files to delete'])).toEqual({
      type: SET_FILES_TO_DELETE,
      payload: ['files to delete']
    });
  });

  it('should remove images to upload', () => {
    expect(removeImagesToUpload([])).toEqual({
      type: REMOVE_IMAGES_TO_UPLOAD,
      payload: []
    });
  });

  it('should set primary image to upload', () => {
    expect(setPrimaryImageToUpload(mockPrimaryImage)).toEqual({
      type: SET_PRIMARY_IMAGE_TO_UPLOAD,
      payload: mockPrimaryImage
    });
  });
});
