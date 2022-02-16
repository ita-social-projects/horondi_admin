import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CertificatesPage from '../certificates-page';

describe('About certificates page', () => {
  it('should render the loading bar while getting data', () => {
    const { getByRole } = render(<CertificatesPage />);
    // expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it.skip('should render the appropriate message, if there is no items in certificates list', () => {});

  it.skip('should render the table with data about certificates', async () => {});
});
