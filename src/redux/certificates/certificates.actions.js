import {
  GET_CERTIFICATES_LIST,
  SET_CERTIFICATES_LIST,
  DELETE_CERTIFICATE,
  REMOVE_CERTIFICATE_FROM_STORE,
  SET_CERTIFICATES_LOADING
} from './certificates.types';

const getCertificatesList = (payload) => ({
  type: GET_CERTIFICATES_LIST,
  payload
});

const setCertificatesList = (payload) => ({
  type: SET_CERTIFICATES_LIST,
  payload
});

const deleteCertificate = (payload) => ({
  type: DELETE_CERTIFICATE,
  payload
});

const removeCertificateFromStore = (payload) => ({
  type: REMOVE_CERTIFICATE_FROM_STORE,
  payload
});

const setCertificatesLoading = (payload) => ({
  type: SET_CERTIFICATES_LOADING,
  payload
});

export {
  getCertificatesList,
  setCertificatesList,
  deleteCertificate,
  removeCertificateFromStore,
  setCertificatesLoading
};
