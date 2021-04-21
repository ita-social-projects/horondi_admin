import { takeEvery, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  selectProductsAndTable,
  selectProducts,
  selectProductsToUpload,
  selectFilesToDeleteAndProduct
} from '../selectors/products.selectors';

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
  setFilesToDelete,
  setProductDetails
} from './products.actions';
import { setItemsCount, updatePagination } from '../table/table.actions';

import {
  GET_ALL_FILTERS,
  GET_FILTRED_PRODUCTS,
  GET_MODELS_BY_CATEGORY,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_IMAGES,
  GET_PRODUCT_SPECIES,
  GET_PRODUCT_DETAILS
} from './products.types';

import {
  getAllProducts,
  getAllFilters,
  getProductCategories,
  getModelsByCategory,
  addProduct,
  deleteProduct,
  getProduct,
  updateProduct,
  deleteImages,
  getProductDetails
} from './products.operations';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';

import { config } from '../../configs';
import { handleRefreshTokenPair } from '../auth/auth.sagas';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = config.statuses;

const { routes } = config;

export function* handleFilterLoad() {
  try {
    yield put(setProductsLoading(true));
    const { productsState, tableState } = yield select(selectProductsAndTable);
    const products = yield call(getAllProducts, productsState, tableState);
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

export function* handleProductDetailsLoad() {
  try {
    yield put(setProductsLoading(true));
    const details = yield call(getProductDetails);
    yield put(setProductDetails(details));
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

export function* handleModelsLoad({ payload }) {
  try {
    const models = yield call(getModelsByCategory, payload);
    yield put(setModels(models));
  } catch (e) {
    yield call(handleProductsErrors, e);
  }
}

export function* handleProductAdd({ payload }) {
  try {
    yield put(setProductsLoading(true));
    const { upload } = yield select(selectProducts);
    const product = yield call(addProduct, payload, upload);

    if (product?.data.addProduct?.message) {
      yield call(handleRefreshTokenPair);
      yield handleProductAdd({ payload });
    } else {
      yield call(handleFilterLoad);
      yield put(clearProductToSend());
      yield put(setFilesToUpload([]));
      yield put(push(routes.pathToProducts));
      yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
    }
  } catch (e) {
    yield call(handleProductsErrors, e);
  }
}

export function* handleProductDelete({ payload }) {
  try {
    const product = yield call(deleteProduct, payload.id);

    if (product?.data.deleteProduct?.message) {
      yield call(handleRefreshTokenPair);
      yield handleProductDelete({ payload });
    } else {
      if (payload.request) {
        yield call(handleFilterLoad);
      } else {
        yield put(push(routes.pathToProducts));
      }
      yield put(updatePagination());
      yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
    }
  } catch (e) {
    yield call(handleProductsErrors, e);
  }
}

export function* handleProductUpdate({ payload }) {
  try {
    yield put(setProductsLoading(true));
    const { upload, primaryImageUpload } = yield select(selectProductsToUpload);
    const product = yield call(
      updateProduct,
      payload,
      upload,
      primaryImageUpload
    );
    if (product?.data.updateProduct?.message) {
      yield call(handleRefreshTokenPair);
      yield handleProductUpdate({ payload });
    } else {
      yield put(setProduct({}));
      yield put(clearFilesToUpload());
      yield put(push(routes.pathToProducts));
      yield put(setProductsLoading(false));
      yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
    }
  } catch (e) {
    yield call(handleProductsErrors, e);
  }
}

export function* handleProductLoad({ payload }) {
  try {
    yield put(setProductsLoading(true));
    yield call(handleProductDetailsLoad);
    const product = yield call(getProduct, payload);
    yield put(setProduct(product));
    yield put(setProductsLoading(false));
  } catch (e) {
    yield call(handleProductsErrors, e);
  }
}

export function* handleProductsErrors(e) {
  yield put(setProductsLoading(false));
  yield put(setProductsError({ e }));
  yield call(handleErrorSnackbar, e.message);
}

export function* handleImagesDelete({ payload }) {
  try {
    yield put(setProductsLoading(true));
    const { images, selectedProduct } = yield select(
      selectFilesToDeleteAndProduct
    );
    const newImages = yield call(deleteImages, payload, images);
    yield put(setProduct({ ...selectedProduct, images: newImages }));
    yield put(setFilesToDelete([]));
    yield put(setProductsLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
  } catch (e) {
    yield call(handleProductsErrors, e);
  }
}

export default function* productsSaga() {
  yield takeEvery(GET_ALL_FILTERS, handleGetFilters);
  yield takeEvery(GET_FILTRED_PRODUCTS, handleFilterLoad);
  yield takeEvery(GET_MODELS_BY_CATEGORY, handleModelsLoad);
  yield takeEvery(ADD_PRODUCT, handleProductAdd);
  yield takeEvery(DELETE_PRODUCT, handleProductDelete);
  yield takeEvery(GET_PRODUCT, handleProductLoad);
  yield takeEvery(UPDATE_PRODUCT, handleProductUpdate);
  yield takeEvery(DELETE_IMAGES, handleImagesDelete);
  yield takeEvery(GET_PRODUCT_SPECIES, handleProductSpeciesLoad);
  yield takeEvery(GET_PRODUCT_DETAILS, handleProductDetailsLoad);
}
