import { takeEvery, call, put } from 'redux-saga/effects';

import {
  getAllColors,
  getColorById,
  createColor,
  deleteColor
} from './color.operations';

import {
  setColors,
  setColorsLoading,
  setColorsError,
  setColor,
  removeColorFromState,
  addColorToState,
  showColorDialogWindow,
  showBoundMaterialsWindow,
  setBoundMaterials
} from './color.actions';

import { GET_COLORS, GET_COLOR, ADD_COLOR, DELETE_COLOR } from './color.types';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';

import { config } from '../../configs';
import { AUTH_ERRORS } from '../../error-messages/auth';
import { handleAdminLogout } from '../auth/auth.sagas';

const { SUCCESS_ADD_STATUS, SUCCESS_DELETE_STATUS } = config.statuses;

export function* handleColorsLoad() {
  try {
    yield put(setColorsLoading(true));
    const colors = yield call(getAllColors);
    if (colors) {
      yield put(setColors(colors));
      yield put(setColorsLoading(false));
    }
  } catch (error) {
    yield call(handleColorError, error);
  }
}

export function* handleColorLoad({ payload }) {
  try {
    yield put(setColorsLoading(true));
    const color = yield call(getColorById, payload);

    if (color) {
      yield put(setColor(color));
      yield put(setColorsLoading(false));
    }
  } catch (error) {
    yield call(handleColorError, error);
  }
}

export function* handleCreateColor({ payload }) {
  try {
    yield put(setColorsLoading(true));
    const newColor = yield call(createColor, payload);
    if (newColor) {
      yield put(addColorToState(newColor));
      yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
      yield put(showColorDialogWindow(false));
      yield put(setColorsLoading(false));
    }
  } catch (error) {
    yield call(handleColorError, error);
  }
}

export function* handleDeleteColor({ payload }) {
  try {
    yield put(setColorsLoading(true));
    const response = yield call(deleteColor, payload);
    if (response?._id) {
      yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
      yield put(removeColorFromState(response._id));
    } else {
      yield put(setBoundMaterials(response));
      yield put(showBoundMaterialsWindow(true));
    }
    yield put(setColorsLoading(false));
  } catch (error) {
    yield call(handleColorError, error);
  }
}

export function* handleColorError(e) {
  if (
    e.message === AUTH_ERRORS.REFRESH_TOKEN_IS_NOT_VALID ||
    e.message === AUTH_ERRORS.USER_IS_BLOCKED
  ) {
    yield call(handleAdminLogout);
  } else {
    yield put(setColorsLoading(false));
    yield put(setColorsError({ e }));
    yield call(handleErrorSnackbar, e.message);
  }
}

export default function* colorsSaga() {
  yield takeEvery(GET_COLORS, handleColorsLoad);
  yield takeEvery(GET_COLOR, handleColorLoad);
  yield takeEvery(ADD_COLOR, handleCreateColor);
  yield takeEvery(DELETE_COLOR, handleDeleteColor);
}
