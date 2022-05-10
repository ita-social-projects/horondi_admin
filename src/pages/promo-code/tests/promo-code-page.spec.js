import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { screen, render, fireEvent } from '@testing-library/react';
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

  it('should render PromoCodePage', () => {
    expect(wrapper).toBeDefined();
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

  it('test adit btn ', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <ThemeProvider theme={themeValue}>
            <PromoCodePage />
          </ThemeProvider>
        </BrowserRouter>
      </MockedProvider>
    );
    const aditBtn = await screen.findAllByTitle('Редагувати');
    const test2 = await screen.findByText('test2');
    await fireEvent.click(aditBtn[0]);
    await expect(test2).toBeInTheDocument();
  });
});
