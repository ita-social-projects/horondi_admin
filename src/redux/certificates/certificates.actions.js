import {
  GET_CERTIFICATES_LIST,
  SET_CERTIFICATES_LIST
} from './certificates.types';

const getCertificateList = (payload) => ({
  type: GET_CERTIFICATES_LIST,
  payload
});

const setCertificateList = (payload) => ({
  type: SET_CERTIFICATES_LIST,
  payload
});

export { getCertificateList, setCertificateList };
