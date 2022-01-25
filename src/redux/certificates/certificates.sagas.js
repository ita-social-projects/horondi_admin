import { takeEvery, call, put } from 'redux-saga/effects';

import { getAllCertificates } from './certificates.operations';
import { GET_CERTIFICATES_LIST } from './certificates.types';
import { setCertificateList } from './certificates.actions';
import { setItemsCount } from '../table/table.actions';

export function* handleCertificatesListLoad({ payload }) {
  try {
    const certificates = yield call(
      getAllCertificates,
      payload.skip,
      payload.limit
    );

    if (certificates) {
      yield put(setItemsCount(certificates?.count));
      yield put(setCertificateList(certificates));
    }
  } catch (e) {
    throw new Error(e);
  }
}

export default function* certificatesSaga() {
  yield takeEvery(GET_CERTIFICATES_LIST, handleCertificatesListLoad);
}
