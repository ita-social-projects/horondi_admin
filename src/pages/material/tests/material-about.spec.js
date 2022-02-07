import React from 'react';
import { render, screen } from '@testing-library/react';
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
  it('Should have table field "Текст"', async () => {
    render(
      <BrowserRouter>
        <MockedProvider mocks={mockMaterialBlock} addTypename={false}>
          <MaterialAbout />
        </MockedProvider>
      </BrowserRouter>
    );
    await new Promise((resolve) => setTimeout(resolve, 0));

    const input = screen.getByText(/Текст/i);

    expect(input).toBeInTheDocument();
  });
});
