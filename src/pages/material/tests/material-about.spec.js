import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import MaterialAbout from '../material-about';
import { mockCurrentType, mockMaterialBlock } from './material-about.variables';

const mockSnackBar = jest.fn();
jest.mock('react-redux');
jest.mock('../material-page.styles', () => ({
  useStyles: () => ({})
}));
jest.mock('../../../utils/use-success-snackbar', () => ({
  __esModule: true,
  default: () => ({
    openSuccessSnackbar: mockSnackBar
  })
}));

const dispatch = jest.fn();

useDispatch.mockImplementation(() => dispatch);

describe('MaterialAbout component tests, ', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <MockedProvider mocks={mockMaterialBlock} addTypename={false}>
          <MaterialAbout currentType={mockCurrentType} />
        </MockedProvider>
      </BrowserRouter>
    );
  });
  it('Should have table field "Дії"', async () => {
    const textElement = await screen.findByText(/Дії/i);
    expect(textElement).toBeInTheDocument();
  });

  it('Should handle delete action', async () => {
    const button = await screen.findByTestId('del_btn');
    fireEvent.click(button);
    expect(mockSnackBar).toHaveBeenCalledTimes(1);
  });
});
