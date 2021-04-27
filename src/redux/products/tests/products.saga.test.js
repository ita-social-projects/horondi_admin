import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { combineReducers } from 'redux';
import {
  handleFilterLoad,
  handleGetFilters,
  handleProductSpeciesLoad,
  handleModelsLoad,
  handleProductAdd,
  handleProductDelete,
  handleProductUpdate,
  handleProductLoad,
  handleProductsErrors,
  handleImagesDelete
} from '../products.sagas';

import {
  setAllProducts,
  setProductsLoading,
  setAllFilterData,
  setProductsError,
  setProductCategories,
  setModels,
  clearProductToSend,
  setProduct,
  setFilesToUpload,
  clearFilesToUpload,
  setFilesToDelete
} from '../products.actions';

import {
  getAllProducts,
  getAllFilters,
  getProductCategories,
  getModelsByCategory,
  addProduct,
  deleteProduct,
  getProduct,
  updateProduct,
  deleteImages
} from '../products.operations';

import {
  mockProductsState,
  mockTableState,
  mockProductsList,
  pagesCount,
  mockFiltersData,
  mockCategoriesList,
  mockCategoryId,
  mockModels,
  mockProductsToAddState,
  mockProduct,
  statuses,
  mockProductToDelete,
  mockProductToUpdatePayload,
  mockProductToUpload,
  mockSnackarState,
  mockError,
  mockProductsStateToDeleteImages,
  mockId
} from './products.variables';

import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../../snackbar/snackbar.actions';

import { setItemsCount } from '../../table/table.actions';

import Products from '../products.reducer';
import Table from '../../table/table.reducer';
import Snackbar from '../../snackbar/snackbar.reducer';

import {
  selectProductsAndTable,
  selectProducts,
  selectProductsToUpload,
  selectFilesToDeleteAndProduct
} from '../../selectors/products.selectors';
import { handleSuccessSnackbar } from '../../snackbar/snackbar.sagas';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = statuses;

describe('Test products saga', () => {
  it('should load filter', () =>
    expectSaga(handleFilterLoad)
      .withReducer(combineReducers({ Products, Table }), {
        Products: mockProductsState,
        Table: mockTableState
      })
      .put(setProductsLoading(true))
      .provide([
        [
          select(selectProductsAndTable),
          {
            productsState: mockProductsState,
            tableState: mockTableState
          }
        ],
        [
          call(getAllProducts, mockProductsState, mockTableState),
          mockProductsList
        ]
      ])
      .put(setItemsCount(mockProductsList.count))
      .put(setAllProducts(mockProductsList.items))
      .put(setProductsLoading(false))
      .hasFinalState({
        Products: {
          ...mockProductsState,
          products: mockProductsList.items
        },
        Table: {
          ...mockTableState,
          pagination: {
            ...mockTableState.pagination,
            pagesCount
          },
          itemsCount: mockProductsList.count
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        const analysisSelect = analysis.filter((e) => e.type === 'SELECT');
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(1);
        expect(analysisSelect).toHaveLength(1);
      }));

  it('should get filters', () =>
    expectSaga(handleGetFilters)
      .withReducer(combineReducers({ Products }), {
        Products: mockProductsState
      })
      .put(setProductsLoading(true))
      .provide([[call(getAllFilters), mockFiltersData]])
      .put(setAllFilterData(mockFiltersData))
      .put(setProductsLoading(false))
      .hasFinalState({
        Products: {
          ...mockProductsState,
          filterData: mockFiltersData
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);
      }));

  it('should load product species', () =>
    expectSaga(handleProductSpeciesLoad)
      .withReducer(combineReducers({ Products }), {
        Products: mockProductsState
      })
      .provide([
        [call(getProductCategories), mockCategoriesList],
        [call(getAllFilters), mockProductsList.items]
      ])
      .put(setProductCategories(mockCategoriesList))
      .put(setAllFilterData(mockProductsList.items))
      .hasFinalState({
        Products: {
          ...mockProductsState,
          productSpecies: {
            ...mockProductsState.productSpecies,
            categories: mockCategoriesList
          },
          filterData: mockProductsList.items
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(2);
        expect(analysisCall).toHaveLength(2);
      }));

  it('should load model by id', () =>
    expectSaga(handleModelsLoad, { payload: mockCategoryId })
      .withReducer(combineReducers({ Products }), {
        Products: mockProductsState
      })
      .provide([[call(getModelsByCategory, mockCategoryId), mockModels]])
      .put(setModels(mockModels))
      .hasFinalState({
        Products: {
          ...mockProductsState,
          productSpecies: {
            ...mockProductsState.productSpecies,
            modelsForSelectedCategory: mockModels
          }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(1);
        expect(analysisCall).toHaveLength(1);
      }));

  it.skip('should add product', () =>
    expectSaga(handleProductAdd, { payload: {} })
      .withReducer(combineReducers({ Products }), {
        Products: mockProductsToAddState
      })
      .put(setProductsLoading(true))
      .provide([
        [select(selectProducts), mockProductsToAddState],
        [call(addProduct, mockProductsToAddState, []), mockProduct],
        [call(handleFilterLoad)],
        [call(handleSuccessSnackbar, SUCCESS_ADD_STATUS)]
      ])
      .put(clearProductToSend())
      .put(setFilesToUpload([]))
      .put(push(`/product/${mockProduct._id}`))
      .hasFinalState({
        Products: {
          ...mockProductsState,
          loading: true
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        const analysisSelect = analysis.filter((e) => e.type === 'SELECT');
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(3);
        expect(analysisSelect).toHaveLength(1);
      }));

  it('should delete product', () =>
    expectSaga(handleProductDelete, { payload: mockProductToDelete })
      .withReducer(combineReducers({ Products }), {
        Products: mockProductsState
      })
      .provide([
        [call(deleteProduct, mockProductToDelete.id)],
        [call(handleFilterLoad)],
        [call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS)]
      ])
      .hasFinalState({
        Products: mockProductsState
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisCall).toHaveLength(1);
      }));

  it.skip('should update product', () =>
    expectSaga(handleProductUpdate, { payload: mockProductToUpdatePayload })
      .withReducer(combineReducers({ Products }), {
        Products: mockProductToUpload
      })
      .put(setProductsLoading(true))
      .provide([
        [
          select(selectProductsToUpload),
          {
            upload: mockProductToUpload.upload,
            primaryImageUpload: mockProductToUpload.primaryImageUpload
          }
        ],
        [
          call(
            updateProduct,
            mockProductToUpdatePayload,
            mockProductToUpload.upload,
            mockProductToUpload.primaryImageUpload
          ),
          mockProductsList.items[0]
        ],
        [call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS)]
      ])
      .put(setProduct(mockProductsList.items[0]))
      .put(clearFilesToUpload())
      .put(setProductsLoading(false))
      .hasFinalState({
        Products: {
          ...mockProductToUpload,
          upload: [],
          selectedProduct: mockProductsList.items[0]
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisSelect = analysis.filter((e) => e.type === 'SELECT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisSelect).toHaveLength(1);
        expect(analysisCall).toHaveLength(2);
        expect(analysisPut).toHaveLength(4);
      }));

  it.skip('should load product by id', () =>
    expectSaga(handleProductLoad, { payload: mockProduct._id })
      .withReducer(combineReducers({ Products }), {
        Products: mockProductsState
      })
      .put(setProductsLoading(true))
      .provide([
        [call(handleProductSpeciesLoad)],
        [call(getProduct, mockProduct._id), mockProduct]
      ])
      .put(setProduct(mockProduct))
      .put(setProductsLoading(false))
      .hasFinalState({
        Products: {
          ...mockProductsState,
          selectedProduct: mockProduct
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(2);
      }));

  it('should handle snackbar success', () =>
    expectSaga(handleSuccessSnackbar, SUCCESS_ADD_STATUS)
      .withReducer(combineReducers({ Snackbar }), {
        Snackbar: mockSnackarState
      })
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(SUCCESS_ADD_STATUS))
      .put(setSnackBarStatus(true))
      .hasFinalState({
        Snackbar: {
          snackBarStatus: true,
          snackBarSeverity: 'success',
          snackBarMessage: SUCCESS_ADD_STATUS
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));

  it('should handle products errors', () =>
    expectSaga(handleProductsErrors, mockError)
      .withReducer(combineReducers({ Products, Snackbar }), {
        Products: {
          ...mockProductsState,
          loading: true
        },
        Snackbar: mockSnackarState
      })
      .put(setProductsLoading(false))
      .put(setProductsError({ e: mockError }))
      .put(setSnackBarSeverity('error'))
      .put(setSnackBarMessage(mockError.message))
      .put(setSnackBarStatus(true))
      .hasFinalState({
        Products: {
          ...mockProductsState,
          loading: false,
          productsError: { e: mockError }
        },
        Snackbar: {
          snackBarStatus: true,
          snackBarSeverity: 'error',
          snackBarMessage: mockError.message
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(5);
      }));

  it('should delete images by id', () =>
    expectSaga(handleImagesDelete, { payload: mockId })
      .withReducer(combineReducers({ Products }), {
        Products: mockProductsStateToDeleteImages
      })
      .put(setProductsLoading(true))
      .provide([
        [
          select(selectFilesToDeleteAndProduct),
          {
            images: mockProductsStateToDeleteImages.filesToDelete,
            selectedProduct: mockProductsStateToDeleteImages.selectedProduct
          }
        ],
        [
          call(
            deleteImages,
            mockId,
            mockProductsStateToDeleteImages.filesToDelete
          ),
          {}
        ],
        [call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS)]
      ])
      .put(setProduct({ ...mockProduct, images: {} }))
      .put(setFilesToDelete([]))
      .put(setProductsLoading(false))
      .hasFinalState({
        Products: {
          ...mockProductsStateToDeleteImages,
          filesToDelete: [],
          selectedProduct: {
            ...mockProduct,
            images: {}
          }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        const analysisSelect = analysis.filter((e) => e.type === 'SELECT');
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(2);
        expect(analysisSelect).toHaveLength(1);
      }));
});
