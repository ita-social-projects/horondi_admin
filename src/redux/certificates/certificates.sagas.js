import { takeEvery, call, put } from 'redux-saga/effects';

import { getAllCertificates } from './certificates.operations';
import { GET_CERTIFICATES_LIST } from './certificates.types';
import {
  setCertificatesList,
  setCertificatesLoading
} from './certificates.actions';

export function* handleCertificatesListLoad() {
  try {
    yield put(setCertificatesLoading(true));
    const certificates = yield call(getAllCertificates);
    if (certificates) {
      yield put(setCertificatesList(certificates));
    }
  } catch (e) {
    throw new Error(e);
  } finally {
    yield put(setCertificatesLoading(false));
  }
}

export default function* certificatesSaga() {
  yield takeEvery(GET_CERTIFICATES_LIST, handleCertificatesListLoad);
}
