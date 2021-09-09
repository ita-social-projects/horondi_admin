import { GET_CURRENCIES, SET_EXCHANGE_RATE } from './currencies.types';

export const getCurrencies = () => ({
  type: GET_CURRENCIES
});

export const setExchangeRate = (payload) => ({
  type: SET_EXCHANGE_RATE,
  payload
});
