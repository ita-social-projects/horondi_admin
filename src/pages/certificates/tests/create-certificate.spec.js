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
    const { getAllByRole, getByTestId } = screen;
    fireEvent.click(getAllByRole('checkbox')[0]);

    const h5 = getByTestId('quantity');
    fireEvent.click(getByTestId('increment'));
    expect(h5).toHaveTextContent('2');

    fireEvent.click(getByTestId('decrement'));
    expect(h5).toHaveTextContent('1');
  });

  it('should render table component', () => {
    const { getAllByRole, getByTestId, getByText, getByLabelText } = screen;
    const input = getByLabelText('email');
    const datePicker = getByTestId('datePicker');

    expect(getByTestId('emulate')).toHaveAttribute('disabled');

    userEvent.click(datePicker);
    const currentDay = getByText('Today');
    userEvent.click(currentDay);
    userEvent.click(getAllByRole('checkbox')[0]);
    fireEvent.change(input, { target: { value: 'john.dee@someemail.com' } });
    fireEvent.focusOut(input);
    userEvent.click(getByTestId('emulate'));

    expect(getByTestId('table')).toBeInTheDocument();
  });

  it('should show disabled button if there are no emulated certificates', () => {
    const { getByRole } = screen;
    expect(getByRole('button', { name: /bulkGenerate/ })).toBeDisabled();
  });

  describe('test Bulk Generation', () => {
    beforeEach(() => {
      const {
        getByRole,
        getByTestId,
        getAllByRole,
        getByText,
        getByLabelText
      } = screen;

      const input = getByLabelText('email');
      const datePicker = getByTestId('datePicker');
      userEvent.click(datePicker);
      const currentDay = getByText('Today');
      userEvent.click(currentDay);
      userEvent.click(getAllByRole('checkbox')[0]);
      fireEvent.change(input, { target: { value: 'john.dee@someemail.com' } });
      fireEvent.focusOut(input);
      userEvent.click(getByTestId('emulate'));
      userEvent.click(getByRole('button', { name: /bulkGenerate/ }));
    });

    it('should show loader after button generate was clicked', () => {
      const { getByRole } = screen;
      expect(getByRole('progressbar')).toBeInTheDocument();
    });

    it('should render new table', async () => {
      const { findByText } = screen;
      const text = await findByText('HOR###');
      expect(text).toBeInTheDocument();
    });
  });

  describe('timeout for email validation', () => {
    beforeEach(() => {
      const { getByRole } = screen;
      const input = getByRole('textbox', { name: /email/i });
      userEvent.type(input, '42');
    });

    it('should show error that the email is invalid', () => {
      const { queryByText } = screen;
      const errorMessage = queryByText(/Некоректна email адреса/gi);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
