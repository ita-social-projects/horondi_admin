import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MockedProvider } from '@apollo/client/testing';
import { useDispatch } from 'react-redux';

import CreateCertificate from '../create-certificate';
import { mutationVars } from './create-certificate.variables';

jest.mock('react-redux');

useDispatch.mockImplementation(() => jest.fn());

describe('test certificates Emulation and Generation', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mutationVars} addTypename={false}>
        <CreateCertificate />
      </MockedProvider>
    );
  });

  it('should change quantity in appropriate h5', () => {
    const { getAllByRole } = screen;
    fireEvent.click(getAllByRole('checkbox')[0]);
    const h5 = screen.getByTestId('quantity');
    fireEvent.click(screen.getByTestId('increment'));

    expect(h5).toHaveTextContent('2');
    fireEvent.click(screen.getByTestId('decrement'));
    expect(h5).toHaveTextContent('1');
  });

  it('should render table component', () => {
    const { getAllByRole } = screen;
    const input = document.querySelector('.MuiInputBase-input');

    expect(screen.getByTestId('emulate')).toHaveAttribute('disabled');

    userEvent.click(getAllByRole('checkbox')[0]);
    fireEvent.change(input, { target: { value: 'john.dee@someemail.com' } });
    fireEvent.focusOut(input);
    userEvent.click(screen.getByTestId('emulate'));

    expect(screen.getByTestId('table')).toBeInTheDocument();
  });

  it('should show disabled button if there are no emulated certificates', () => {
    expect(screen.getByRole('button', { name: /bulkGenerate/ })).toBeDisabled();
  });

  describe('test Bulk Generation', () => {
    beforeEach(() => {
      userEvent.click(screen.getAllByRole('checkbox')[0]);
      userEvent.click(screen.getByTestId('emulate'));

      userEvent.click(screen.getByRole('button', { name: /bulkGenerate/ }));
    });

    it('should show loader after button generate was clicked', () => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should render new table', async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(await screen.findByText('HOR12345678')).toBeInTheDocument();
    });
  });

  describe('timeout for email validation', () => {
    beforeEach(() => {
      const input = screen.getByRole('textbox', { name: /email/i });
      userEvent.type(input, '42');
    });

    it('should not show error if there are no delay', () => {
      const errorMessage = screen.queryByText(/Некоректна email адреса/gi);

      expect(errorMessage).not.toBeInTheDocument();
    });

    it('should show error after >500ms', async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const errorMessage = screen.queryByText(/Некоректна email адреса/gi);

      expect(errorMessage).toBeInTheDocument();
    });
  });
});
