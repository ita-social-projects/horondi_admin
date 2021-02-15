import { takeEvery, call, put } from 'redux-saga/effects';
import { getAllSizes } from './sizes.operations';
import { setSizes, setSizesLoading, setSizesError } from './sizes.actions';
import { GET_SIZES } from './sizes.types';

export function* handleSizesLoad() {
  try {
    yield put(setSizesLoading(true));
    const sizes = yield call(getAllSizes);
    yield put(setSizes(sizes));
    yield put(setSizesLoading(false));
  } catch (error) {
    yield call(handleSizesError, error);
  }
}
export function* handleSizesError(e) {
  yield put(setSizesLoading(false));
  yield put(setSizesError({ e }));
}

export default function* sizesSaga() {
  yield takeEvery(GET_SIZES, handleSizesLoad);
}
