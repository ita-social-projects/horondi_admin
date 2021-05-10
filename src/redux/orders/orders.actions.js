import {
  SET_ORDER,
  UPDATE_ORDER,
  ADD_ORDER,
  SET_ORDER_LOADING,
  SET_ORDER_ERROR,
  GET_ORDER,
  GET_ORDER_LIST,
  SET_ORDER_LIST,
  DELETE_ORDER,
  REMOVE_ORDER_FROM_STORE,
  SET_NOVAPOSHTA_CITIES,
  GET_NOVAPOSHTA_CITIES,
  GET_NOVAPOSHTA_WAREHOUSES,
  SET_NOVAPOSHTA_WAREHOUSES,
  SET_DELIVERY_LOADING,
  SET_UKRPOST_REGIONS,
  GET_UKRPOST_REGIONS,
  SET_UKRPOST_DISTRICTS,
  GET_UKRPOST_DISTRICTS,
  SET_UKRPOST_CITIES,
  GET_UKRPOST_CITIES,
  SET_UKRPOST_POSTOFFICES,
  GET_UKRPOST_POSTOFFICES,
  SET_FILTER,
  CLEAR_FILTERS,
  SET_SORT, SET_ORDER_SORT_LABEL
} from './orders.types';

const getOrder = (payload) => ({
  type: GET_ORDER,
  payload
});

const setOrder = (payload) => ({
  type: SET_ORDER,
  payload
});

const updateOrder = (order, id) => ({
  type: UPDATE_ORDER,
  payload: {
    order,
    id
  }
});

const addOrder = (payload) => ({
  type: ADD_ORDER,
  payload
});

const getOrderList = (payload) => ({
  type: GET_ORDER_LIST,
  payload
});

const setOrderList = (payload) => ({
  type: SET_ORDER_LIST,
  payload
});

const setOrderLoading = (loading) => ({
  type: SET_ORDER_LOADING,
  payload: loading
});

const setOrderError = (error) => ({
  type: SET_ORDER_ERROR,
  payload: error
});

const deleteOrder = (payload) => ({
  type: DELETE_ORDER,
  payload
});

const removeOrderFromStore = (payload) => ({
  type: REMOVE_ORDER_FROM_STORE,
  payload
});

const setNovaPoshtaCities = (cities) => ({
  type: SET_NOVAPOSHTA_CITIES,
  payload: cities
});

const getNovaPoshtaCities = (payload) => ({
  type: GET_NOVAPOSHTA_CITIES,
  payload
});

const setNovaPoshtaWarehouse = (payload) => ({
  type: SET_NOVAPOSHTA_WAREHOUSES,
  payload
});

const getNovaPoshtaWarehouse = (payload) => ({
  type: GET_NOVAPOSHTA_WAREHOUSES,
  payload
});

const setUkrPostRegions = (payload) => ({
  type: SET_UKRPOST_REGIONS,
  payload
});

const getUkrPostRegions = () => ({
  type: GET_UKRPOST_REGIONS
});
const setUkrPostDistricts = (payload) => ({
  type: SET_UKRPOST_DISTRICTS,
  payload
});

const getUkrPostDistricts = (payload) => ({
  type: GET_UKRPOST_DISTRICTS,
  payload
});
const setUkrPostCities = (payload) => ({
  type: SET_UKRPOST_CITIES,
  payload
});

const getUkrPostCities = (payload) => ({
  type: GET_UKRPOST_CITIES,
  payload
});
const setUkrPostPostOffices = (payload) => ({
  type: SET_UKRPOST_POSTOFFICES,
  payload
});

const getUkrPostPostOffices = (payload) => ({
  type: GET_UKRPOST_POSTOFFICES,
  payload
});

const setDeliveryLoading = (payload) => ({
  type: SET_DELIVERY_LOADING,
  payload
});

const setOrderFilter = (payload) => ({
  type: SET_FILTER,
  payload
});

const clearOrderFilters = () => ({
  type: CLEAR_FILTERS
});

const setOrderSort = (sort) => ({
  type: SET_SORT,
  payload: sort
});

const setOrderSortLabel = (payload) => ({
  type: SET_ORDER_SORT_LABEL,
  payload
});

export {
  getOrder,
  setOrder,
  updateOrder,
  addOrder,
  setOrderLoading,
  setOrderError,
  getOrderList,
  setOrderList,
  deleteOrder,
  removeOrderFromStore,
  getNovaPoshtaCities,
  setNovaPoshtaCities,
  getNovaPoshtaWarehouse,
  setNovaPoshtaWarehouse,
  setDeliveryLoading,
  getUkrPostCities,
  setUkrPostCities,
  getUkrPostDistricts,
  setUkrPostDistricts,
  getUkrPostPostOffices,
  setUkrPostPostOffices,
  getUkrPostRegions,
  setUkrPostRegions,
  setOrderFilter,
  clearOrderFilters,
  setOrderSort,
  setOrderSortLabel
};
