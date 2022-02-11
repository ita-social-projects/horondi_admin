import certificatesReducer, { initialState } from '../certificates.reducer';
import {
  setCertificatesList,
  setCertificatesLoading
} from '../certificates.actions';

describe('Certificates reducer', () => {
  it('should set certificates list', () => {
    expect(
      certificatesReducer(
        initialState,
        setCertificatesList({ count: 0, items: [] })
      )
    ).toEqual({
      ...initialState,
      list: { count: 0, items: [] }
    });
  });

  it('should set certificates loading', () => {
    expect(
      certificatesReducer(initialState, setCertificatesLoading(true))
    ).toEqual({
      ...initialState,
      certificatesLoading: true
    });
  });
});
