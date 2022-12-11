import React from 'react';
import { render, screen } from '@testing-library/react';
import * as redux from 'react-redux';
import RegisterUser from '../register-user';

const mockUseDispatch = jest.spyOn(redux, 'useDispatch');
const mockUseSelector = jest.spyOn(redux, 'useSelector');

describe('HistoryDetails component tests', () => {
  it('Should render backButton component', () => {
    mockUseDispatch.mockImplementation(() => jest.fn());

    mockUseSelector.mockImplementation(() => ({
      loading: false
    }));
    render(<RegisterUser />);
    const button = screen.getByText('Створити');
    expect(button).toBeInTheDocument();
  });
  it('Should render loader', async () => {
    mockUseSelector.mockImplementation(() => ({
      loading: true
    }));
    render(<RegisterUser />);
    const loader = await screen.findByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
