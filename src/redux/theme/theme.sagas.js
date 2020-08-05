import { takeEvery } from 'redux-saga/effects';
import { SET_THEME_MODE } from './theme.types';

function* handleThemeChange({ payload }) {
  yield localStorage.setItem('darkMode', payload);
}

export default function* themeSaga() {
  yield takeEvery(SET_THEME_MODE, handleThemeChange);
}
