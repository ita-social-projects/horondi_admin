import { call, takeEvery, put } from 'redux-saga/effects';
import { ADD_SIZE } from './sizes.types';

import { setSizeLoading } from './sizes.actions';

import { createSize } from './sizes.operations';

export function* handleAddModel({ payload }) {
  try {
    yield put(setSizeLoading(true));
    yield call(createSize, payload);
    yield put(setSizeLoading(false));
  } catch (error) {
    console.log(error);
  }
}

export default function* sizeSaga() {
  yield takeEvery(ADD_SIZE, handleAddModel);
}
