import {
  GET_CERTIFICATES_LIST,
  SET_CERTIFICATES_LIST,
  DELETE_CERTIFICATE,
  REMOVE_CERTIFICATE_FROM_STORE
} from './certificates.types';

const getCertificateList = (payload) => ({
  type: GET_CERTIFICATES_LIST,
  payload
});

const setCertificateList = (payload) => ({
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

export {
  getCertificateList,
  setCertificateList,
  deleteCertificate,
  removeCertificateFromStore
};
