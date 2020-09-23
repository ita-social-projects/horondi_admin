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
} from './products.types';

export const getProduct = (id) => ({
  type: GET_PRODUCT,
  payload: id
});

export const setAllFilterData = (payload) => ({
  type: SET_ALL_FILTER_DATA,
  payload
});

export const setSortByPrice = (payload) => ({
  type: SET_SORT_BY_PRICE,
  payload
});

export const setSortByDate = (payload) => ({
  type: SET_SORT_BY_DATE,
  payload
});

export const setSortByRate = (payload) => ({
  type: SET_SORT_BY_RATE,
  payload
});

export const setSortByPopularity = (payload) => ({
  type: SET_SORT_BY_POPULARITY,
  payload
});

export const getFiltredProducts = (payload) => ({
  type: GET_FILTRED_PRODUCTS,
  payload
});

export const setProductsLoading = (loading) => ({
  type: SET_PRODUCTS_LOADING,
  payload: loading
});

export const setCategoryFilter = (payload) => ({
  type: SET_CATEGORY_FILTER,
  payload
});

export const setPriceFilter = (payload) => ({
  type: SET_PRICE_FILTER,
  payload
});

export const setColorsFilter = (payload) => ({
  type: SET_COLORS_FILTER,
  payload
});

export const setPatternsFilter = (payload) => ({
  type: SET_PATTERNS_FILTER,
  payload
});

export const setModelsFilter = (payload) => ({
  type: SET_MODELS_FILTER,
  payload
});

export const setSearchFilter = (payload) => ({
  type: SET_SEARCH,
  payload
});

export const setAllProducts = (payload) => ({
  type: SET_ALL_PRODUCTS,
  payload
});

export const getAllFilters = () => ({
  type: GET_ALL_FILTERS
});

export const setProductLoading = (payload) => ({
  type: SET_PRODUCT_LOADING,
  payload
});

export const setProductToSend = (payload) => ({
  type: SET_PRODUCT_TO_SEND,
  payload
});

export const clearProductToSend = () => ({
  type: CLEAR_PRODUCT_TO_SEND
});

export const setProductsError = (payload) => ({
  type: SET_PRODUCTS_ERROR,
  payload
});

export const getProductSpecies = () => ({
  type: GET_PRODUCT_SPECIES
});

export const setProductCategories = (payload) => ({
  type: SET_PRODUCT_CATEGORIES,
  payload
});

export const setProductOptions = (payload) => ({
  type: SET_PRODUCT_OPTIONS,
  payload
});

export const getProductOptions = () => ({
  type: GET_PRODUCT_OPTIONS
});

export const getModelsByCategory = (payload) => ({
  type: GET_MODELS_BY_CATEGORY,
  payload
});

export const setModels = (payload) => ({
  type: SET_MODELS,
  payload
});

export const addProduct = (payload) => ({
  type: ADD_PRODUCT,
  payload
});

export const deleteProduct = (payload) => ({
  type: DELETE_PRODUCT,
  payload
});

export const setFilesToUpload = (payload) => ({
  type: SET_FILES_TO_UPLOAD,
  payload
});

export const setProduct = (payload) => ({
  type: SET_PRODUCT,
  payload
});

export const updateProduct = (payload) => ({
  type: UPDATE_PRODUCT,
  payload
});

export const deleteImages = (payload) => ({
  type: DELETE_IMAGES,
  payload
});

export const clearFilesToUpload = (payload) => ({
  type: CLEAR_FILES_TO_UPLOAD,
  payload
});

export const setFilesToDelete = (payload) => ({
  type: SET_FILES_TO_DELETE,
  payload
});

export const removeImagesToUpload = (payload) => ({
  type: REMOVE_IMAGES_TO_UPLOAD,
  payload
});

export const setPrimaryImageToUpload = (payload) => ({
  type: SET_PRIMARY_IMAGE_TO_UPLOAD,
  payload
});

