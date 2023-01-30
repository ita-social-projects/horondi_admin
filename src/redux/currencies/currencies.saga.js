import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_CURRENCIES } from './currencies.types';
import { setExchangeRate } from './currencies.actions';

import { getAllCurrencies } from './currencies.operations';

export function* handleCurrenciesLoad() {
  try {
    const currencies = yield call(getAllCurrencies);

    const { exchangeRate } = currencies[0]?.convertOptions.UAH;
    if (exchangeRate) {
      yield put(setExchangeRate({ exchangeRate }));
    }
  } catch (error) {
    yield call(handleCurrenciesError, error);
  }
}

export function handleCurrenciesError(e) {
  console.error(e);
}

export default function* currenciesSaga() {
  yield takeEvery(GET_CURRENCIES, handleCurrenciesLoad);
}
