import {
  setAllProducts,
  setAllFilterData,
  setPatternsFilter,
  setColorsFilter,
  setPriceFilter,
  setModelsFilter,
  setCategoryFilter,
  setSearchFilter,
  setProductToSend,
  clearProductToSend,
  setProductsError,
  setProductCategories,
  setModels,
  setFilesToUpload,
  setProduct,
  clearFilesToUpload,
  setFilesToDelete,
  removeImagesToUpload,
  setPrimaryImageToUpload,
  setProductsLoading
} from '../../products/products.actions';

import {
  mockCategoriesList,
  mockError,
  mockFilesToUpload,
  mockFiltersData,
  mockModels,
  mockPrimaryImage,
  mockProduct,
  mockProductsList,
  mockProductsToAddState,
  mockUploadToRemoveImages
} from './products.variables';

import productsReducer, { initialState } from '../../products/products.reducer';

describe('Test products reducers', () => {
  it('should redurn default state', () => {
    expect(productsReducer()).toEqual(initialState);
  });

  it('should set all products into state', () => {
    expect(
      productsReducer(initialState, setAllProducts(mockProductsList.items))
    ).toEqual({
      ...initialState,
      products: mockProductsList.items
    });
  });

  it('should set all filter data into state', () => {
    expect(
      productsReducer(initialState, setAllFilterData(mockFiltersData))
    ).toEqual({
      ...initialState,
      filterData: mockFiltersData
    });
  });

  it('should set patterns filter into state', () => {
    expect(
      productsReducer(initialState, setPatternsFilter(['pattern']))
    ).toEqual({
      ...initialState,
      filters: {
        ...initialState.filters,
        patternsFilter: ['pattern']
      }
    });
  });

  it('should set colors filter into state', () => {
    expect(productsReducer(initialState, setColorsFilter(['color']))).toEqual({
      ...initialState,
      filters: {
        ...initialState.filters,
        colorsFilter: ['color']
      }
    });
  });

  it('should set price filter into state', () => {
    expect(productsReducer(initialState, setPriceFilter(['price']))).toEqual({
      ...initialState,
      filters: {
        ...initialState.filters,
        priceFilter: ['price']
      }
    });
  });

  it('should set models filter into state', () => {
    expect(productsReducer(initialState, setModelsFilter(['models']))).toEqual({
      ...initialState,
      filters: {
        ...initialState.filters,
        modelsFilter: ['models']
      }
    });
  });

  it('should set category filter into state', () => {
    expect(
      productsReducer(initialState, setCategoryFilter(['category']))
    ).toEqual({
      ...initialState,
      filters: {
        ...initialState.filters,
        categoryFilter: ['category']
      }
    });
  });

  it('should set search filter into state', () => {
    expect(productsReducer(initialState, setSearchFilter(['search']))).toEqual({
      ...initialState,
      filters: {
        ...initialState.filters,
        searchFilter: ['search']
      }
    });
  });

  it('should set products loading into state', () => {
    expect(productsReducer(initialState, setProductsLoading(true))).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('should set products to send into state', () => {
    expect(
      productsReducer(initialState, setProductToSend(mockProduct))
    ).toEqual({
      ...initialState,
      productToSend: {
        ...initialState.productToSend,
        ...mockProduct
      }
    });
  });

  it('should clear products to send into state', () => {
    expect(
      productsReducer(mockProductsToAddState, clearProductToSend())
    ).toEqual({
      ...initialState,
      upload: [],
      productToSend: initialState.productToSend
    });
  });

  it('should set products error into state', () => {
    expect(productsReducer(initialState, setProductsError(mockError))).toEqual({
      ...initialState,
      productsError: mockError
    });
  });

  it('should set product categories into state', () => {
    expect(
      productsReducer(initialState, setProductCategories(mockCategoriesList))
    ).toEqual({
      ...initialState,
      productSpecies: {
        ...initialState.productSpecies,
        categories: mockCategoriesList
      }
    });
  });

  it('should set models into state', () => {
    expect(productsReducer(initialState, setModels(mockModels))).toEqual({
      ...initialState,
      productSpecies: {
        ...initialState.productSpecies,
        modelsForSelectedCategory: mockModels
      }
    });
  });

  it('should set files to upload into state', () => {
    expect(
      productsReducer(initialState, setFilesToUpload(mockFilesToUpload))
    ).toEqual({
      ...initialState,
      upload: [...initialState.upload, ...mockFilesToUpload]
    });
  });

  it('should set product into state', () => {
    expect(productsReducer(initialState, setProduct(mockProduct))).toEqual({
      ...initialState,
      selectedProduct: mockProduct
    });
  });

  it('should clear files to upload into state', () => {
    expect(
      productsReducer(
        {
          ...initialState,
          upload: ['some files']
        },
        clearFilesToUpload([])
      )
    ).toEqual({
      ...initialState,
      upload: []
    });
  });

  it('should set files to delete into state', () => {
    expect(
      productsReducer(initialState, setFilesToDelete(['some files']))
    ).toEqual({
      ...initialState,
      filesToDelete: ['some files']
    });
  });

  it('should remove images to upload into state', () => {
    expect(
      productsReducer(
        {
          ...initialState,
          upload: mockUploadToRemoveImages
        },
        removeImagesToUpload('image')
      )
    ).toEqual({
      ...initialState,
      upload: []
    });
  });

  it('should set primary image to upload into state', () => {
    expect(
      productsReducer(initialState, setPrimaryImageToUpload(mockPrimaryImage))
    ).toEqual({
      ...initialState,
      primaryImageUpload: mockPrimaryImage
    });
  });
});
