import { takeEvery, call, put, select } from 'redux-saga/effects';
import {
  setAllProducts,
  setProductsLoading,
  setAllFilterData,
  setProduct,
  setProductLoading,
  setProductsError
} from './products.actions';
import { setItemsCount, setPagesCount } from '../table/table.actions';

import {
  GET_ALL_FILTERS,
  GET_FILTRED_PRODUCTS,
  GET_PRODUCT
} from './products.types';
import { getAllProducts, getAllFilters } from './products.operations';
import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
} from '../snackbar/snackbar.actions';

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
}
