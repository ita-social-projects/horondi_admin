import { call, takeEvery, put } from 'redux-saga/effects';
import { ADD_SIZE } from './sizes.types';

import { setSizeLoading } from './sizes.actions';

import { createSize } from './sizes.operations';

import { config } from '../../configs';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';

const { SUCCESS_CREATION_STATUS } = config.statuses;

export function* handleAddModel({ payload }) {
  try {
    yield put(setSizeLoading(true));
    yield call(createSize, payload);
    yield put(setSizeLoading(false));
    yield call(handleSuccessSnackbar, SUCCESS_CREATION_STATUS);
  } catch (error) {
    yield call(handleErrorSnackbar, error);
  }
}

export default function* sizeSaga() {
  yield takeEvery(ADD_SIZE, handleAddModel);
}
