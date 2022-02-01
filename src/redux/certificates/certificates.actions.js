import {
  GET_CERTIFICATES_LIST,
  SET_CERTIFICATES_LIST,
  DELETE_CERTIFICATE,
  REMOVE_CERTIFICATE_FROM_STORE,
  SET_CERTIFICATES_LOADING,
  CLEAR_FILTERS,
  SET_FILTER
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

const setFilter = (payload) => ({
  type: SET_FILTER,
  payload
});

const clearFilters = (payload) => ({
  type: CLEAR_FILTERS,
  payload
});

export {
  getCertificatesList,
  setCertificatesList,
  deleteCertificate,
  removeCertificateFromStore,
  setCertificatesLoading,
  setFilter,
  clearFilters
};
