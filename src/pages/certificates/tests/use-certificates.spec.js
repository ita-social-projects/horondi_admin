import { renderHook, act } from '@testing-library/react-hooks';
import { useMutation, useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import useCertificates from '../hooks/use-certificates';
import { getCertificatesMock, mockStore } from './certificates-page.variables';

const mockOpenSnackbar = jest.fn();
const mutationMock = jest.fn();
const certificatesMock = getCertificatesMock[0].result.data;
const certificatesItems = certificatesMock.getAllCertificates.items;

jest.mock('react-redux');
jest.mock('@apollo/client');
jest.mock('../../../utils/use-success-snackbar', () => ({
  __esModule: true,
  default: () => ({
    openSuccessSnackbar: mockOpenSnackbar
  })
}));

useDispatch.mockImplementation(() => jest.fn());
useSelector.mockImplementation(() => mockStore);
useMutation.mockImplementation(() => [mutationMock]);
useQuery.mockImplementation(() => ({
  loading: false,
  data: certificatesMock,
  refeth: jest.fn()
}));

describe('use-certificates hook', () => {
  it('should not delete certificate', async () => {
    const { result } = renderHook(() => useCertificates());
    await result.current.deleteCertificateHandler();
    expect(result.current.items.length).toBe(
      certificatesMock.getAllCertificates.count
    );
  });

  it('should not update certificate status', async () => {
    const { result } = renderHook(() => useCertificates());
    await result.current.updateCertificateHandler('HOR58332589');
    expect(result.current.items[1].isActivated).toBeTruthy();
  });

  it('should open update modal window', () => {
    const { result } = renderHook(() => useCertificates());
    act(() => {
      result.current.openUpdateModal('HOR58332589');
    });
    expect(mockOpenSnackbar).toHaveBeenCalled();
  });

  it('should open delete modal window', () => {
    const { result } = renderHook(() => useCertificates());
    act(() => {
      result.current.openDeleteModal('624ee35a3daf9e63c88ceac3');
    });
    expect(mockOpenSnackbar).toHaveBeenCalled();
  });

  it('should transform date', () => {
    let date;
    const { result } = renderHook(() => useCertificates());
    act(() => {
      date = result.current.transformDate('2023-04-08T12:59:25.818Z');
    });
    expect(date).toEqual('04/08/2023');
  });

  it('should get active status', () => {
    let status;
    const { result } = renderHook(() => useCertificates());
    act(() => {
      status = result.current.checkStatus(certificatesItems[1]);
    });
    expect(status).toEqual('Активний');
  });

  it('should get used status', () => {
    let status;
    const { result } = renderHook(() => useCertificates());
    act(() => {
      status = result.current.checkStatus(certificatesItems[2]);
    });
    expect(status).toEqual('Використаний');
  });

  it('should get exired status', () => {
    let status;
    const { result } = renderHook(() => useCertificates());
    act(() => {
      status = result.current.checkStatus(certificatesItems[0]);
    });
    expect(status).toEqual('Протермінований');
  });

  it('should get inProgress status', () => {
    let status;
    const { result } = renderHook(() => useCertificates());
    act(() => {
      status = result.current.checkStatus(certificatesItems[3]);
    });
    expect(status).toEqual('В процесі');
  });

  it('should set name of the certificate creator', () => {
    let name;
    const { result } = renderHook(() => useCertificates());
    act(() => {
      name = result.current.setUser([
        { firstName: 'Andrii', lastName: 'Fedyshyn' }
      ]);
    });
    expect(name).toEqual('Andrii Fedyshyn');
  });
});
