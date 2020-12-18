import { config } from '../../configs';
import {
  SET_POPULAR_CATEGORIES,
  SET_STATS_LOADING,
  SET_DOUGHNUT_VALUE,
  SET_DATE_VALUE,
  SET_BAR_VALUE,
  SET_POPULAR_PRODUCTS,
  SET_USERS_STATS,
  SET_ALL_ORDERS_STATS,
  SET_PAID_ORDERS_STATS,
  SET_UPDATING_BAR_DATA,
  SET_UPDATING_DOGHNUT_DATA
} from './stats.types';

const { labels, doughnut, bar } = config;

const initialState = {
  loading: false,
  doughnut: {
    categories: doughnut.initialValues,
    orders: doughnut.initialValues,
    selectedValue: labels.doughnut.select[0].value,
    updatingData: false
  },
  bar: {
    products: bar.initialValues,
    orders: bar.initialValues,
    users: bar.initialValues,
    selectedValue: labels.bar.select[0].value,
    updatingData: false
  },
  date: 7
};

export const statsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_STATS_LOADING: {
    return {
      ...state,
      loading: action.payload
    };
  }
  case SET_POPULAR_CATEGORIES: {
    return {
      ...state,
      doughnut: {
        ...state.doughnut,
        categories: action.payload
      }
    };
  }
  case SET_USERS_STATS: {
    return {
      ...state,
      bar: {
        ...state.bar,
        users: action.payload
      }
    };
  }
  case SET_DOUGHNUT_VALUE: {
    return {
      ...state,
      doughnut: {
        ...state.doughnut,
        selectedValue: action.payload
      }
    };
  }
  case SET_DATE_VALUE: {
    return {
      ...state,
      date: action.payload
    };
  }
  case SET_BAR_VALUE: {
    return {
      ...state,
      bar: {
        ...state.bar,
        selectedValue: action.payload
      }
    };
  }
  case SET_POPULAR_PRODUCTS: {
    return {
      ...state,
      bar: {
        ...state.bar,
        products: action.payload
      }
    };
  }
  case SET_ALL_ORDERS_STATS: {
    return {
      ...state,
      doughnut: {
        ...state.doughnut,
        orders: action.payload
      }
    };
  }
  case SET_PAID_ORDERS_STATS: {
    return {
      ...state,
      bar: {
        ...state.bar,
        orders: action.payload
      }
    };
  }
  case SET_UPDATING_BAR_DATA: {
    return {
      ...state,
      bar: {
        ...state.bar,
        updatingData: action.payload
      }
    };
  }
  case SET_UPDATING_DOGHNUT_DATA: {
    return {
      ...state,
      doughnut: {
        ...state.doughnut,
        updatingData: action.payload
      }
    };
  }
  default:
    return state;
  }
};
