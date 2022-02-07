import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MockedProvider } from '@apollo/client/testing';
import { useDispatch } from 'react-redux';

import CreateCertificate from '../create-certificate';
import { mutationVars } from './create-certificate.variables';

jest.mock('react-redux');

jest.mock('../../../services/local-storage.service', () => ({
  getFromLocalStorage: jest.fn().mockReturnValue(42)
}));

useDispatch.mockImplementation(() => jest.fn());

describe('test certificates Emulation and Generation', () => {

  /* beforeEach(() => {
  const mockedDate = new Date('2023-02-04T17:28:59.947Z');
  jest.spyOn(global, 'Date').mockImplementation(() => mockedDate);
  console.log(new Date())
  });
 */
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
    screen.debug(screen.getByTestId('table'));
  });

  it('button generate should be disabled if there are no emulated certificates', () => {
    expect(screen.getByRole('button', { name: /bulkGenerate/ })).toBeDisabled();
  });

  it('should show loader after button generate was clicked', () => {
    userEvent.click(screen.getAllByRole('checkbox')[0]);
    userEvent.click(screen.getByTestId('emulate'));

    userEvent.click(screen.getByRole('button', { name: /bulkGenerate/ }));

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render new table', async () => {
    userEvent.click(screen.getAllByRole('checkbox')[0]);
    userEvent.click(screen.getByTestId('emulate'));

    userEvent.click(screen.getByRole('button', { name: /bulkGenerate/ }));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(await screen.findByText('HOR123232')).toBeInTheDocument();
  });
});
