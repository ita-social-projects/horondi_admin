import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { config } from '../../configs';
import routes from '../../configs/routes';
import {
  GET_ORDER,
  UPDATE_ORDER,
  GET_ORDER_LIST,
  DELETE_ORDER,
  GET_NOVAPOSHTA_CITIES,
  GET_NOVAPOSHTA_WAREHOUSES,
  GET_UKRPOST_REGIONS,
  GET_UKRPOST_DISTRICTS,
  GET_UKRPOST_CITIES,
  GET_UKRPOST_POSTOFFICES,
  ADD_ORDER
} from './orders.types';
import {
  getOrderById,
  updateOrder,
  addOrder,
  getAllOrders,
  deleteOrder,
  getNovaPoshtaCities,
  getNovaPoshtaWarehouses,
  getUkrPoshtaCitiesByDistrictId,
  getUkrPoshtaDistrictsByRegionId,
  getUkrPoshtaPostOfficesByCityId,
  getUkrPostRegions
} from './orders.operations';
import { setItemsCount, updatePagination } from '../table/table.actions';

import {
  setOrderList,
  setOrderError,
  setOrderLoading,
  setOrder,
  removeOrderFromStore,
  setNovaPoshtaCities,
  setNovaPoshtaWarehouse,
  setDeliveryLoading,
  setUkrPostRegions,
  setUkrPostDistricts,
  setUkrPostCities,
  setUkrPostPostOffices
} from './orders.actions';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';
import { AUTH_ERRORS } from '../../error-messages/auth';
import { handleAdminLogout } from '../auth/auth.sagas';

const {
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS,
  SUCCESS_CREATION_STATUS
} = config.statuses;

export function* handleOrderUpdate({ payload }) {
  try {
    yield put(setOrderLoading(true));
    const order = yield call(updateOrder, payload.order, payload.id);
    if (order.errors) {
      throw new Error(order.errors[0].message);
    }

    yield put(setOrder(order?.data?.updateOrder));
    yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
  } catch (e) {
    yield call(handleErrorSnackbar, e.message);
    yield put(setOrderError(e));
  } finally {
    yield put(setOrderLoading(false));
  }
}

export function* handleAddOrder({ payload }) {
  try {
    yield put(setOrderLoading(true));
    yield call(addOrder, payload);
    yield call(handleSuccessSnackbar, SUCCESS_CREATION_STATUS);
  } catch (e) {
    yield call(handleErrorSnackbar, e.message);
    yield put(setOrderError(e));
  } finally {
    yield put(setOrderLoading(false));
  }
}

export function* handleOrdersListLoad({ payload }) {
  try {
    yield put(setOrderLoading(true));
    const orders = yield call(
      getAllOrders,
      payload.skip,
      payload.limit,
      payload.filter.orderStatus
    );

    if (orders) {
      yield put(setItemsCount(orders?.count));
      yield put(setOrderList(orders));
    }
  } catch (error) {
    yield call(handleOrdersError, error);
  } finally {
    yield put(setOrderLoading(false));
  }
}

export function* handleOrderLoad({ payload }) {
  try {
    yield put(setOrderLoading(true));
    const order = yield call(getOrderById, payload);

    if (order) {
      yield put(setOrder(order?.data?.getOrderById));
    }
  } catch (e) {
    yield put(setOrderError(e));
  } finally {
    yield put(setOrderLoading(false));
  }
}

export function* handleOrdersError(e) {
  if (
    e.message === AUTH_ERRORS.REFRESH_TOKEN_IS_NOT_VALID ||
    e.message === AUTH_ERRORS.USER_IS_BLOCKED
  ) {
    yield call(handleAdminLogout);
  } else {
    yield put(setOrderLoading(false));
    yield put(setOrderError({ e }));
    yield call(handleErrorSnackbar, e.message);
  }
}

export function* handleOrdersDelete({ payload }) {
  try {
    yield put(setOrderLoading(true));
    const order = yield call(deleteOrder, payload);

    if (order) {
      yield put(removeOrderFromStore(payload));
      yield put(setOrderLoading(false));
      yield put(updatePagination());
      yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
      yield put(push(routes.pathToOrders));
    }
  } catch (error) {
    yield call(handleOrdersError, error);
  }
}

export function* handleNovaPoshtaCities({ payload }) {
  try {
    yield put(setDeliveryLoading(true));

    const cities = yield call(getNovaPoshtaCities, payload);

    if (cities) {
      yield put(setNovaPoshtaCities(cities));
      yield put(setDeliveryLoading(false));
    }
  } catch (error) {
    yield put(setDeliveryLoading(false));
    yield call(handleOrdersError, error);
  }
}

export function* handleNovaPoshtaWarehouse({ payload }) {
  try {
    yield put(setDeliveryLoading(true));

    const warehouses = yield call(getNovaPoshtaWarehouses, payload);

    if (warehouses) {
      yield put(setNovaPoshtaWarehouse(warehouses));
      yield put(setDeliveryLoading(false));
    }
  } catch (error) {
    yield put(setDeliveryLoading(false));
    yield call(handleOrdersError, error);
  }
}

export function* handleUkrPostRegions() {
  try {
    yield put(setDeliveryLoading(true));

    const regions = yield call(getUkrPostRegions);

    if (regions) {
      yield put(setUkrPostRegions(regions));
      yield put(setDeliveryLoading(false));
    }
  } catch (error) {
    yield put(setDeliveryLoading(false));
    yield call(handleOrdersError, error);
  }
}

export function* handleUkrPostDistricts({ payload }) {
  try {
    yield put(setDeliveryLoading(true));

    const districts = yield call(getUkrPoshtaDistrictsByRegionId, payload);

    if (districts) {
      yield put(setUkrPostDistricts(districts));
      yield put(setDeliveryLoading(false));
    }
  } catch (error) {
    yield put(setDeliveryLoading(false));
    yield call(handleOrdersError, error);
  }
}

export function* handleUkrPostCities({ payload }) {
  try {
    yield put(setDeliveryLoading(true));

    const cities = yield call(getUkrPoshtaCitiesByDistrictId, payload);

    if (cities) {
      yield put(setUkrPostCities(cities));
      yield put(setDeliveryLoading(false));
    }
  } catch (error) {
    yield put(setDeliveryLoading(false));
    yield call(handleOrdersError, error);
  }
}

export function* handleUkrPostPostOffices({ payload }) {
  try {
    yield put(setDeliveryLoading(true));

    const offices = yield call(getUkrPoshtaPostOfficesByCityId, payload);

    if (offices) {
      yield put(setUkrPostPostOffices(offices));
      yield put(setDeliveryLoading(false));
    }
  } catch (error) {
    yield put(setDeliveryLoading(false));
    yield call(handleOrdersError, error);
  }
}

export default function* ordersSaga() {
  yield takeEvery(GET_ORDER_LIST, handleOrdersListLoad);
  yield takeEvery(GET_ORDER, handleOrderLoad);
  yield takeEvery(UPDATE_ORDER, handleOrderUpdate);
  yield takeEvery(ADD_ORDER, handleAddOrder);
  yield takeEvery(DELETE_ORDER, handleOrdersDelete);
  yield takeEvery(GET_NOVAPOSHTA_CITIES, handleNovaPoshtaCities);
  yield takeEvery(GET_NOVAPOSHTA_WAREHOUSES, handleNovaPoshtaWarehouse);
  yield takeEvery(GET_UKRPOST_REGIONS, handleUkrPostRegions);
  yield takeEvery(GET_UKRPOST_DISTRICTS, handleUkrPostDistricts);
  yield takeEvery(GET_UKRPOST_CITIES, handleUkrPostCities);
  yield takeEvery(GET_UKRPOST_POSTOFFICES, handleUkrPostPostOffices);
}
