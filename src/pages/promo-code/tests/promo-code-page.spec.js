import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { screen, render, fireEvent } from '@testing-library/react';
import { push } from 'connected-react-router';
import PromoCodePage from '../promo-code-page';
import { theme } from '../../../components/app/app-theme/app.theme';
import LoadingBar from '../../../components/loading-bar';
import { mocks, mocksWithoutPromocodes } from './promo-code-page-variables';

jest.mock('react-redux');
jest.mock('../promo-code-page.styles', () => ({
  useStyles: () => ({})
}));

jest.mock('connected-react-router', () => ({
  push: jest.fn()
}));

const mockStore = {
  rowsPerPage: 10,
  currentPage: 0
};

useSelector.mockImplementation(() => mockStore);

const mockOpenSuccessSnackbar = jest.fn();
jest.mock('../../../utils/use-success-snackbar', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    openSuccessSnackbar: mockOpenSuccessSnackbar
  }))
}));

const themeValue = theme('light');
const dispatch = jest.fn();

useDispatch.mockImplementation(() => dispatch);

describe('PromoCodePage component test with loading', () => {
  it('test PromoCodePage component without items starting with LoadingBur', () => {
    const noDataWrapper = render(
      <MockedProvider mocks={mocksWithoutPromocodes} addTypename={false}>
        <BrowserRouter>
          <ThemeProvider theme={themeValue}>
            <PromoCodePage />
          </ThemeProvider>
        </BrowserRouter>
      </MockedProvider>
    );
    expect(noDataWrapper).toContain(LoadingBar);
  });

  it('test delete and edit btn', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <ThemeProvider theme={themeValue}>
            <PromoCodePage />
          </ThemeProvider>
        </BrowserRouter>
      </MockedProvider>
    );
    const btnDelete = await screen.findByTestId('del_1');
    fireEvent.click(btnDelete);
    expect(mockOpenSuccessSnackbar).toHaveBeenCalled();
    const editBtn = await screen.findByTestId('edit_1');
    fireEvent.click(editBtn);
    expect(dispatch).toHaveBeenCalledWith(push());
  });
});
