import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateCertificate from '..';

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
    fireEvent.click(getAllByRole('checkbox')[0]);
    userEvent.type(screen.getByLabelText(/email/i), 'john.dee@someemail.com');
    fireEvent.click(screen.getByTestId('generate'));

    expect(screen.getByTestId('table')).toBeInTheDocument();
  });
});
