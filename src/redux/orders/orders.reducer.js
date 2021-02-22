import {
  SET_ORDER,
  SET_ORDER_LOADING,
  SET_ORDER_ERROR,
  SET_ORDER_LIST,
  REMOVE_ORDER_FROM_STORE
} from './orders.types';

export const initialState = {
  list: [],
  selectedOrder: null,
  orderLoading: false,
  orderError: null
};

export const selectOrderList = ({ Orders }) => ({
  orderLoading: Orders.orderLoading,
  ordersList: Orders.list.items
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
    return { ...state, list: orders };
  default:
    return state;
  }
};

export default ordersReducer;
