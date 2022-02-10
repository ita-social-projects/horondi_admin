import {
  GET_CERTIFICATES_LIST,
  SET_CERTIFICATES_LIST,
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

const setCertificatesLoading = (payload) => ({
  type: SET_CERTIFICATES_LOADING,
  payload
});

export { getCertificatesList, setCertificatesList, setCertificatesLoading };
