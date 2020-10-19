import {
  SET_ORDER,
  SET_ORDERS_CURRENT_PAGE,
  SET_ORDER_ERROR,
  SET_ORDER_LOADING,
  SET_ORDERS_PAGES_COUNT,
  SET_ORDERS_PER_PAGE
} from './orders.types';
import { SET_NEWS } from '../news/news.types';

const initialState = {
  list: [],
  orderLoading: false,
  OrderError: null,
  pagination: {
    currentPage: 0,
    orderPerPage: 6,
    pagesCount: 1
  }
};

const orderReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_ORDER:
    return {
      ...state,
      list: action.payload
    };
  default:
    return state;
  }
};

export default orderReducer;
