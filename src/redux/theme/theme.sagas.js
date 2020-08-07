import { takeEvery } from 'redux-saga/effects';
import { SET_THEME_MODE } from './theme.types';
import { setToLocalStorage } from '../../services/local-storage.service';

function* handleThemeChange({ payload }) {
  yield setToLocalStorage('darkMode', payload);
}

export default function* themeSaga() {
  yield takeEvery(SET_THEME_MODE, handleThemeChange);
}
