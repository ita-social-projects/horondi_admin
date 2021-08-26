import { SET_EXCHANGE_RATE } from './currencies.types';

export const initialState = {
  exchangeRate: null
};

const currenciesReducer = (state = initialState, action = {}) => {
  if (action.type === SET_EXCHANGE_RATE) {
    return {
      ...state,
      exchangeRate: action.payload.exchangeRate
    };
  }
  return state;
};

export default currenciesReducer;
