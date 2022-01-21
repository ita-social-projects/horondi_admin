import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateCertificate from '../create-certificate';

describe('test CreateCertificate component', () => {
  it('should change quantity in appropriate h5', () => {
    const { getAllByRole } = render(<CreateCertificate />);
    fireEvent.click(getAllByRole('checkbox')[0]);
    const h5 = screen.getByTestId('quantity');
    fireEvent.click(screen.getByTestId('increment'));

    expect(h5).toHaveTextContent('2');
    fireEvent.click(screen.getByTestId('decrement'));
    expect(h5).toHaveTextContent('1');
  });

  it('should render table component', () => {
    const { getAllByRole } = render(<CreateCertificate />);
    const input = document.querySelector('.MuiInputBase-input');

    expect(screen.getByTestId('generate')).toHaveAttribute('disabled');

    userEvent.click(getAllByRole('checkbox')[0]);
    fireEvent.change(input, { target: { value: 'john.dee@someemail.com' } });
    fireEvent.focusOut(input);
    userEvent.click(screen.getByTestId('generate'));

    expect(screen.getByTestId('table')).toBeInTheDocument();
  });
});
