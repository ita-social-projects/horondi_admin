const initialState = {
  orders: [],
  order: [],
  orderStatus: {},
  loading: true
};

const ordersState = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING_STATUS':
      return {
        ...state,
        loading: true
      };

    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.payload,
        loading: false
      };

    case 'SET_ORDER':
      return {
        ...state,
        order: action.payload,
        loading: false
      };

    case 'SET_ORDER_STATUS':
      return {
        ...state,
        order: action.payload
      };

    default:
      return state;
  }
};

export default ordersState;
