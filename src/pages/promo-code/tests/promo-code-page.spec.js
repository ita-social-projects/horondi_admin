import React from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import PromoCodePage from '../promo-code-page';
import { theme } from '../../../components/app/app-theme/app.theme';
import { promoCodes } from './promo-code-page.variables';
import TableContainerRow from '../../../containers/table-container-row';
import TableContainerGenerator from '../../../containers/table-container-generator';
import LoadingBar from '../../../components/loading-bar';

jest.mock('react-redux');
jest.mock('@apollo/client');
jest.mock('../promo-code-page.styles', () => ({
  useStyles: () => ({})
}));
jest.mock('connected-react-router', () => ({
  push: jest.fn()
}));

const themeValue = theme('light');
const dispatch = jest.fn();
const useQueryData = {
  data: promoCodes,
  loading: false,
  refetch: () => {}
};

useMutation.mockImplementation(() => [jest.fn()]);
useDispatch.mockImplementation(() => dispatch);
useQuery.mockImplementation(() => ({
  ...useQueryData
}));
let wrapper;

describe('PromoCodePage component tests', () => {
  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <ThemeProvider theme={themeValue}>
          <PromoCodePage />
        </ThemeProvider>
      </BrowserRouter>
    );
  });
  afterEach(() => {
    jest.restoreAllMocks();
    wrapper = null;
  });

  it('Should render PromoCodePage', () => {
    expect(wrapper).toBeDefined();
  });
  it('Component TableContainerRow should exist', () => {
    expect(wrapper.exists(TableContainerRow)).toBe(true);
  });
  it('Component TableContainerGenerator should exist', () => {
    expect(wrapper.exists(TableContainerGenerator)).toBe(true);
  });
});

describe('PromoCodePage component test with loading', () => {
  it('test Loader in PromoCodePage component', () => {
    useQuery.mockImplementation(() => ({
      ...useQueryData,
      loading: true
    }));
    wrapper = mount(
      <BrowserRouter>
        <ThemeProvider theme={themeValue}>
          <PromoCodePage />
        </ThemeProvider>
      </BrowserRouter>
    );
    expect(wrapper.exists(LoadingBar)).toBe(true);
  });
  it('test PromoCodePage component without items', () => {
    useQuery.mockImplementation(() => ({
      ...useQueryData,
      data: []
    }));
    wrapper = mount(
      <BrowserRouter>
        <ThemeProvider theme={themeValue}>
          <PromoCodePage />
        </ThemeProvider>
      </BrowserRouter>
    );
    expect(wrapper).toBeTruthy();
  });
});
