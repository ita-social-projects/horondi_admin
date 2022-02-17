import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { useDispatch, useSelector } from 'react-redux';
import { render } from '@testing-library/react';

import CertificatesPage from '../certificates-page';
import { certificatesMock, usersMock } from './certificates-page.variables';

jest.mock('react-redux');
jest.mock('connected-react-router', () => ({
  push: jest.fn()
}));
jest.mock('../certificates-page.styles.js', () => ({
  useStyles: () => ({})
}));

const dispatch = jest.fn();

useDispatch.mockImplementation(() => dispatch);

describe('Information about certificates page', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render the loading bar while getting data', async () => {
    useSelector.mockImplementation(() => ({
      ...usersMock,
      loading: true
    }));

    const { getByRole } = render(
      <BrowserRouter>
        <MockedProvider mocks={certificatesMock}>
          <CertificatesPage />
        </MockedProvider>
      </BrowserRouter>
    );
    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render the table with information about certificates', async () => {
    const { findAllByRole } = render(
      <BrowserRouter>
        <MockedProvider mocks={certificatesMock}>
          <CertificatesPage />
        </MockedProvider>
      </BrowserRouter>
    );

    useSelector.mockImplementation(() => ({
      ...usersMock,
      loading: false
    }));

    expect(await findAllByRole('row')).toHaveLength(4);
  });
});
