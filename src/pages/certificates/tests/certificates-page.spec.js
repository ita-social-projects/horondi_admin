import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { useDispatch, useSelector } from 'react-redux';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CertificatesPage from '../certificates-page';
import {
  getCertificatesMock,
  noCertificatesMock
} from './certificates-page.variables';

jest.mock('react-redux');
jest.mock('react-apollo');
jest.mock('connected-react-router', () => ({
  push: jest.fn()
}));

const mockOpenSnackbar = jest.fn();

jest.mock('../../../utils/use-success-snackbar', () => ({
  __esModule: true,
  default: () => ({
    openSuccessSnackbar: mockOpenSnackbar
  })
}));

useDispatch.mockImplementation(() => jest.fn());
useSelector.mockImplementation(() => jest.fn());

describe('Information about certificates page', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render the loading bar while getting data', async () => {
    const { getByRole } = render(
      <BrowserRouter>
        <MockedProvider mocks={getCertificatesMock}>
          <CertificatesPage />
        </MockedProvider>
      </BrowserRouter>
    );
    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render the appropriate message if there is no certificates', async () => {
    const { findByText } = render(
      <BrowserRouter>
        <MockedProvider mocks={noCertificatesMock}>
          <CertificatesPage />
        </MockedProvider>
      </BrowserRouter>
    );

    expect(await findByText(/Сертифікати відсутні/)).toBeInTheDocument();
  });

  it('should render the table with information about certificates', async () => {
    useSelector.mockImplementation(() => ({
      rowsPerPage: 10,
      currentPage: 0
    }));

    const { findAllByRole } = render(
      <BrowserRouter>
        <MockedProvider mocks={getCertificatesMock}>
          <CertificatesPage />
        </MockedProvider>
      </BrowserRouter>
    );

    expect(await findAllByRole('row')).toHaveLength(5);
  });

  it('should simulate deleteHandler', async () => {
    const { findAllByTitle } = render(
      <BrowserRouter>
        <MockedProvider mocks={getCertificatesMock}>
          <CertificatesPage />
        </MockedProvider>
      </BrowserRouter>
    );

    const deleteBtns = await findAllByTitle(/Видалити/);
    userEvent.click(deleteBtns[0]);
    expect(mockOpenSnackbar).toHaveBeenCalledTimes(1);
  });

  it('should simulate editHandler', async () => {
    const { findAllByTitle } = render(
      <BrowserRouter>
        <MockedProvider mocks={getCertificatesMock}>
          <CertificatesPage />
        </MockedProvider>
      </BrowserRouter>
    );

    const editBtns = await findAllByTitle(/Редагувати/);
    userEvent.click(editBtns[0]);
    expect(mockOpenSnackbar).toHaveBeenCalledTimes(1);
  });
});
