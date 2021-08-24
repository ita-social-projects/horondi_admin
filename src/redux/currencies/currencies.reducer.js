import { SET_EXCHANGE_RATE } from './currencies.types';

export const initialState = {
  exchangeRate: null
};

const currenciesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_EXCHANGE_RATE:
      return {
        ...state,
        exchangeRate: action.payload.exchangeRate
      };
    default:
      return state;
  }
};

export default currenciesReducer;
