import {
    SET_ORDER,
    SET_ORDER_LOADING,
    SET_ORDER_ERROR,
    SET_ORDER_LIST,
    REMOVE_ORDER_FROM_STORE,
    SET_NOVAPOSHTA_CITIES,
    SET_NOVAPOSHTA_WAREHOUSES,
    SET_DELIVERY_LOADING,
    SET_UKRPOST_REGIONS,
    SET_UKRPOST_DISTRICTS,
    SET_UKRPOST_CITIES,
    SET_UKRPOST_POSTOFFICES,
    CLEAR_FILTERS, SET_FILTER, SET_SORT
} from './orders.types';

const initialFilters = {
    status: [],
    paymentStatus: [],
    dateFrom: '',
    dateTo: '',
    search: ''
};

export const initialState = {
    list: [],
    filters: initialFilters,
    sort: {},
    selectedOrder: null,
    orderLoading: false,
    orderError: null,
    deliveryLoading: false,
    cities: [],
    warehouses: [],
    ukrPoshtaCities: [],
    ukrPoshtaRegions: [],
    ukrPoshtaDistricts: [],
    ukrPoshtaPostOffices: []
};

export const selectOrderList = ({Orders}) => ({
    orderLoading: Orders.orderLoading,
    ordersList: Orders.list?.items
});

const ordersReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_ORDER:
            return {
                ...state,
                selectedOrder: action.payload
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
        case REMOVE_ORDER_FROM_STORE:
            const orders = state.list.items.filter(
                (order) => order._id !== action.payload
            );
            return {
                ...state,
                list: {...state.list, items: orders, count: state.list.count - 1}
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
                filters: initialFilters
            };
        default:
            return state;
    }
};

export default ordersReducer;
