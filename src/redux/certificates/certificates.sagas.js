import { takeEvery, call, put } from 'redux-saga/effects';

import {
  getAllCertificates,
  deleteCertificate
} from './certificates.operations';
import {
  GET_CERTIFICATES_LIST,
  DELETE_CERTIFICATE
} from './certificates.types';
import {
  setCertificateList,
  removeCertificateFromStore
} from './certificates.actions';
import { setItemsCount, updatePagination } from '../table/table.actions';

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

export function* handleDeleteCertificate({ payload }) {
  try {
    const certificate = yield call(deleteCertificate, payload);
    if (certificate) {
      yield put(removeCertificateFromStore(payload));
      yield put(updatePagination());
    }
  } catch (e) {
    throw new Error(e);
  }
}

export default function* certificatesSaga() {
  yield takeEvery(GET_CERTIFICATES_LIST, handleCertificatesListLoad);
  yield takeEvery(DELETE_CERTIFICATE, handleDeleteCertificate);
}
