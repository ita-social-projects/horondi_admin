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
  setCertificatesList,
  removeCertificateFromStore,
  setCertificatesLoading
} from './certificates.actions';
import { setItemsCount, updatePagination } from '../table/table.actions';
import { handleSuccessSnackbar } from '../snackbar/snackbar.sagas';
import { config } from '../../configs';

const { SUCCESS_DELETE_STATUS } = config.statuses;

export function* handleCertificatesListLoad({ payload }) {
  try {
    yield put(setCertificatesLoading(true));
    const certificates = yield call(
      getAllCertificates,
      payload.skip,
      payload.limit,
      payload.filter
    );
    if (certificates) {
      yield put(setItemsCount(certificates?.count));
      yield put(setCertificatesList(certificates));
    }
  } catch (e) {
    throw new Error(e);
  } finally {
    yield put(setCertificatesLoading(false));
  }
}

export function* handleUpdateCertificate({ payload }) {
  try {
    yield put(setCertificatesLoading(true));
  } catch (e) {
    throw new Error(e);
  } finally {
    yield put(setCertificatesLoading(false));
  }
}

export function* handleDeleteCertificate({ payload }) {
  try {
    yield put(setCertificatesLoading(true));
    const certificate = yield call(deleteCertificate, payload);
    if (certificate) {
      yield put(removeCertificateFromStore(payload));
      yield put(setCertificatesLoading(false));
      yield put(updatePagination());
      yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
    }
  } catch (e) {
    throw new Error(e);
  }
}

export default function* certificatesSaga() {
  yield takeEvery(GET_CERTIFICATES_LIST, handleCertificatesListLoad);
  yield takeEvery(DELETE_CERTIFICATE, handleDeleteCertificate);
}
