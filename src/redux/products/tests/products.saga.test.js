import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { combineReducers } from 'redux';
import {
  handleFilterLoad,
  handleGetFilters,
  handleProductSpeciesLoad,
  handleProductOptionsLoad,
  handleModelsLoad,
  handleProductAdd,
  handleProductDelete,
  handleProductUpdate,
  handleProductLoad,
  handleSuccessSnackbar,
  handleProductsErrors,
  handleImagesDelete
} from '../products.sagas';

import {
  setAllProducts,
  setProductsLoading,
  setAllFilterData,
  setProductsError,
  setProductCategories,
  setProductOptions,
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
  getProductOptions,
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
  mockProductOptions,
  mockCategoryId,
  mockModels,
  mockFilledProductsState,
  mockProduct,
  statuses
} from './products.variables';

import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../../snackbar/snackbar.actions';

import { setItemsCount, setPagesCount } from '../../table/table.actions';

import Products from '../products.reducer';
import Table from '../../table/table.reducer';
import Snackbar from '../../snackbar/snackbar.reducer';

import {
  selectProductsAndTable,
  selectProducts
} from '../../selectors/products.selectors';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_CREATION_STATUS,
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
      .put(setPagesCount(pagesCount))
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
        expect(analysisPut).toHaveLength(5);
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
        expect(analysisPut).toHaveLength(3);
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
        expect(analysisPut).toHaveLength(2);
      }));

  it('should load product options', () =>
    expectSaga(handleProductOptionsLoad)
      .withReducer(combineReducers({ Products }), {
        Products: mockProductsState
      })
      .provide([[call(getProductOptions), mockProductOptions]])
      .put(setProductOptions(mockProductOptions))
      .hasFinalState({
        Products: {
          ...mockProductsState,
          productOptions: mockProductOptions
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(1);
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
        expect(analysisPut).toHaveLength(1);
      }));

  it('should add product', () =>
    expectSaga(handleProductAdd)
      .withReducer(combineReducers({ Products }), {
        Products: mockFilledProductsState
      })
      .put(setProductsLoading(true))
      .provide([
        [select(selectProducts), mockFilledProductsState],
        [call(addProduct, mockFilledProductsState), mockProduct],
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
        expect(analysisPut).toHaveLength(4);
      }));
});
