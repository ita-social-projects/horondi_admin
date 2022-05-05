import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { screen, render, fireEvent } from '@testing-library/react';
import PromoCodePage from '../promo-code-page';
import { theme } from '../../../components/app/app-theme/app.theme';
import TableContainerRow from '../../../containers/table-container-row';
import TableContainerGenerator from '../../../containers/table-container-generator';
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
  currentPage: 1
};

useSelector.mockImplementation(() => mockStore);

const themeValue = theme('light');
const dispatch = jest.fn();

useDispatch.mockImplementation(() => dispatch);
let wrapper;

describe('PromoCodePage component tests', () => {
  beforeEach(() => {
    wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <ThemeProvider theme={themeValue}>
            <PromoCodePage />
          </ThemeProvider>
        </BrowserRouter>
      </MockedProvider>
    );
  });
  afterEach(() => {
    jest.restoreAllMocks();
    wrapper = null;
  });

  it('Should render PromoCodePage', () => {
    expect(wrapper).toBeDefined();
  });
  it('Component TableContainerRow should exist', async () => {
    setTimeout(() => {
      expect(wrapper.exists(TableContainerRow)).toBe(true);
    }, 1000);
  });
  it('Component TableContainerGenerator should exist', () => {
    setTimeout(() => {
      expect(wrapper.exists(TableContainerGenerator)).toBe(true);
    }, 1000);
  });
});

describe('PromoCodePage component test with loading', () => {
  it('test Loader in PromoCodePage component', () => {
    wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <ThemeProvider theme={themeValue}>
            <PromoCodePage />
          </ThemeProvider>
        </BrowserRouter>
      </MockedProvider>
    );

    expect(wrapper.exists(LoadingBar)).toBe(true);
  });
  it('test PromoCodePage component without items', () => {
    wrapper = mount(
      <MockedProvider mocks={mocksWithoutPromocodes} addTypename={false}>
        <BrowserRouter>
          <ThemeProvider theme={themeValue}>
            <PromoCodePage />
          </ThemeProvider>
        </BrowserRouter>
      </MockedProvider>
    );
    expect(wrapper).toBeTruthy();
  });

  it('test delete btn ', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <ThemeProvider theme={themeValue}>
            <PromoCodePage />
          </ThemeProvider>
        </BrowserRouter>
      </MockedProvider>
    );
    const btnDelete = await screen.findAllByTitle('Видалити');
    const test2 = await screen.findByText('test2');
    await fireEvent.click(btnDelete[0]);
    await expect(test2).toBeInTheDocument();
  });
});
