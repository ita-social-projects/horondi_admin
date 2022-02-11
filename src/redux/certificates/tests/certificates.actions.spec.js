import {
  GET_CERTIFICATES_LIST,
  SET_CERTIFICATES_LIST,
  SET_CERTIFICATES_LOADING
} from '../certificates.types';

import {
  getCertificatesList,
  setCertificatesList,
  setCertificatesLoading
} from '../certificates.actions';
import { fakeCertificatesList } from './certificates.variables';

describe('Certificates reducer', () => {
  it('should create an action to get certificates list', () => {
    expect(getCertificatesList({})).toEqual({
      type: GET_CERTIFICATES_LIST,
      payload: {}
    });
  });

  it('should create an action to set certificates list', () => {
    expect(setCertificatesList(fakeCertificatesList)).toEqual({
      type: SET_CERTIFICATES_LIST,
      payload: {
        ...fakeCertificatesList
      }
    });
  });

  it('should create an action to set certificates loading', () => {
    expect(setCertificatesLoading(true)).toEqual({
      type: SET_CERTIFICATES_LOADING,
      payload: true
    });
  });
});
