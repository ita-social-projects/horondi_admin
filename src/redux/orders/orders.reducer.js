import {
  SET_ORDER,
  SET_ORDER_LOADING,
  SET_ORDER_ERROR,
  SET_ORDER_LIST,
  SET_ORDER_LIST_USER,
  REMOVE_ORDER_FROM_STORE,
  SET_NOVAPOSHTA_CITIES,
  SET_NOVAPOSHTA_WAREHOUSES,
  SET_DELIVERY_LOADING,
  SET_UKRPOST_REGIONS,
  SET_UKRPOST_DISTRICTS,
  SET_UKRPOST_CITIES,
  SET_UKRPOST_POSTOFFICES,
  CLEAR_FILTERS,
  CLEAR_FILTERS_USER,
  SET_FILTER,
  SET_FILTER_USER,
  SET_SORT,
  SET_ORDER_SORT_LABEL
} from './orders.types';

const initialFilters = {
  status: [],
  paymentStatus: [],
  dateFrom: null,
  dateTo: null,
  search: ''
};

const defaultFiltersUser = { ...initialFilters };

export const initialState = {
  list: { count: 0, items: [] },
  listUser: [],
  filters: initialFilters,
  filtersUser: defaultFiltersUser,
  sort: {
    dateOfCreation: -1
  },
  selectedOrder: null,
  orderLoading: false,
  orderError: null,
  deliveryLoading: false,
  cities: [],
  warehouses: [],
  ukrPoshtaCities: [],
  ukrPoshtaRegions: [],
  ukrPoshtaDistricts: [],
  ukrPoshtaPostOffices: [],
  sortLabel: ''
};

export const selectOrderList = ({ Orders }) => ({
  listUser: Orders.listUser,
  filtersUser: Orders.filtersUser,
  orderLoading: Orders.orderLoading,
  ordersList: Orders.list?.items,
  sort: Orders.sort,
  sortLabel: ''
});

const ordersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ORDER:
      return {
        ...state,
        selectedOrder: action.payload
      };
    case SET_ORDER_SORT_LABEL:
      return {
        ...state,
        sortLabel: action.payload
      };
    case SET_ORDER_LOADING:
      return {
        ...state,
        orderLoading: action.payload
      };
    case SET_ORDER_ERROR:
      return {
        ...state,
        orderError: action.payload
      };
    case SET_ORDER_LIST:
      return {
        ...state,
        list: action.payload
      };
    case SET_ORDER_LIST_USER:
      return {
        ...state,
        listUser: action.payload
      };
    case REMOVE_ORDER_FROM_STORE:
      const allLists = {
        list: state.list?.items ? state.list.items : [],
        listUser: state.listUser
      };

      const filteredLists = Object.keys(allLists).reduce(
        (acumulator, listOrderskey) => {
          acumulator[listOrderskey] = allLists[listOrderskey].filter(
            (order) => order._id !== action.payload
          );
          return acumulator;
        },
        {}
      );

      return {
        ...state,
        list: {
          ...state.list,
          items: filteredLists.list,
          count: state.list.count - 1
        },
        listUser: [...filteredLists.listUser]
      };
    case SET_UKRPOST_REGIONS:
      return {
        ...state,
        ukrPoshtaRegions: action.payload
      };
    case SET_UKRPOST_DISTRICTS:
      return {
        ...state,
        ukrPoshtaDistricts: action.payload
      };
    case SET_UKRPOST_CITIES:
      return {
        ...state,
        ukrPoshtaCities: action.payload
      };
    case SET_UKRPOST_POSTOFFICES:
      return {
        ...state,
        ukrPoshtaPostOffices: action.payload
      };
    case SET_NOVAPOSHTA_CITIES:
      return {
        ...state,
        cities: action.payload
      };
    case SET_NOVAPOSHTA_WAREHOUSES:
      return {
        ...state,
        warehouses: action.payload
      };
    case SET_DELIVERY_LOADING:
      return {
        ...state,
        deliveryLoading: action.payload
      };
    case SET_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    case SET_FILTER_USER:
      return {
        ...state,
        filtersUser: {
          ...state.filtersUser,
          ...action.payload
        }
      };
    case SET_SORT:
      return {
        ...state,
        sort: {
          ...action.payload
        }
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: initialFilters,
        sortLabel: '',
        sort: {}
      };
    case CLEAR_FILTERS_USER:
      return {
        ...state,
        filtersUser: defaultFiltersUser,
        sortLabel: '',
        sort: {}
      };
    default:
      return state;
  }
};

export default ordersReducer;
