import { takeEvery, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  setAllProducts,
  setProductsLoading,
  setAllFilterData,
  setProductsError,
  setProductCategories,
  setProductOptions,
  setModels,
  clearProductToSend
} from './products.actions';
import { setItemsCount, setPagesCount } from '../table/table.actions';

import {
  GET_ALL_FILTERS,
  GET_FILTRED_PRODUCTS,
  GET_PRODUCT_SPECIES,
  GET_PRODUCT_OPTIONS,
  GET_MODELS_BY_CATEGORY,
  ADD_PRODUCT,
  DELETE_PRODUCT
} from './products.types';
import {
  getAllProducts,
  getAllFilters,
  getProductCategories,
  getProductOptions,
  getModelsByCategory,
  addProduct,
  deleteProduct
} from './products.operations';

import { config } from '../../configs';

import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../snackbar/snackbar.actions';

const { SUCCESS_ADD_STATUS, SUCCESS_DELETE_STATUS } = config.statuses;

export function* handleFilterLoad() {
  try {
    yield put(setProductsLoading(true));
    const { productsState, tableState } = yield select(
      ({ Products, Table }) => ({
        productsState: Products,
        tableState: Table
      })
    );
    const products = yield call(getAllProducts, productsState, tableState);
    yield put(
      setPagesCount(Math.ceil(products.count / tableState.rowsPerPage))
    );
    yield put(setItemsCount(products.count));
    yield put(setAllProducts(products.items));
    yield put(setProductsLoading(false));
  } catch (e) {
    yield call(handleProductsErrors, e);
  }
}

export function* handleGetFilters() {
  try {
    yield put(setProductsLoading(true));
    const filter = yield call(getAllFilters);
    yield put(setAllFilterData(filter));
    yield put(setProductsLoading(false));
  } catch (e) {
    yield call(handleProductsErrors, e);
  }
}

export function* handleProductSpeciesLoad() {
  try {
    const categories = yield call(getProductCategories);
    const species = yield call(getAllFilters);
    yield put(setProductCategories(categories));
    yield put(setAllFilterData(species));
  } catch (e) {
    yield call(handleProductsErrors, e);
  }
}

export function* handleProductOptionsLoad() {
  try {
    const productOptions = yield call(getProductOptions);
    yield put(setProductOptions(productOptions));
  } catch (e) {
    yield call(handleProductsErrors, e);
  }
}

export function* handleModelsLoad({ payload }) {
  try {
    const models = yield call(getModelsByCategory, payload);
    yield put(setModels(models));
  } catch (e) {
    yield call(handleProductsErrors, e);
  }
}

export function* handleProductAdd() {
  try {
    const productState = yield select(({ Products }) => Products)
    yield call(addProduct, productState);
    yield call(handleFilterLoad);
    yield put(push('/products'));
    yield put(clearProductToSend())
    yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
  } catch (e) {
    yield call(handleProductsErrors, e);
  }
}

export function* handleProductDelete({ payload }) {
  try {
    yield put(setProductsLoading(true));
    const productToDelete = yield call(deleteProduct, payload);
    const { products } = yield select(({ Products }) => Products);
    const newProducts = yield products.filter(
      ({ _id }) => _id !== productToDelete
    );
    yield put(setAllProducts(newProducts));
    yield put(setProductsLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (e) {
    yield call(handleProductsErrors, e);
  }
}

export function* handleSuccessSnackbar(message) {
  yield put(setSnackBarSeverity('success'));
  yield put(setSnackBarMessage(message));
  yield put(setSnackBarStatus(true));
}

export function* handleProductsErrors(e) {
  yield put(setProductsLoading(false));
  yield put(setProductsError({ e }));
  yield put(setSnackBarSeverity('error'));
  yield put(setSnackBarMessage(e.message));
  yield put(setSnackBarStatus(true));
}

export default function* productsSaga() {
  yield takeEvery(GET_ALL_FILTERS, handleGetFilters);
  yield takeEvery(GET_FILTRED_PRODUCTS, handleFilterLoad);
  yield takeEvery(GET_PRODUCT_SPECIES, handleProductSpeciesLoad);
  yield takeEvery(GET_PRODUCT_OPTIONS, handleProductOptionsLoad);
  yield takeEvery(GET_MODELS_BY_CATEGORY, handleModelsLoad);
  yield takeEvery(ADD_PRODUCT, handleProductAdd);
  yield takeEvery(DELETE_PRODUCT, handleProductDelete);
}
