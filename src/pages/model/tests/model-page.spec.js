import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';

import { useSelector, useDispatch } from 'react-redux';
import { theme } from '../../../components/app/app-theme/app.theme';
import ModelPage from '../model-page';
import { config } from '../../../configs';

jest.mock('../filters/filters', () => ({
    __esModule: true,
    default () {
      return <div>filters</div>;
    }
  }));
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));
jest.mock('connected-react-router', () => ({
  push: jest.fn()
}));
const themeValue = theme('light');
const pageTitle = config.titles.modelPageTitles.mainPageTitle;
const { CREATE_MODEL_TITLE } = config.buttonTitles;

useDispatch.mockImplementation(() => mockDispatch);

describe('test model page component', () => {
  it('should render title and button', () => {
    useSelector.mockImplementation(() => ({
      products: [],
      currentPage: 0,
      filter: {
        available: [],
        availableForConstructor: [],
        category: [],
        search: ''
      },
      loading: false
    }));
    render(
      <MockedProvider addTypename={false}>
        <BrowserRouter>
          <ThemeProvider theme={themeValue}>
            <ModelPage />
          </ThemeProvider>
        </BrowserRouter>
      </MockedProvider>
    );
    const addButton = screen.getByText(CREATE_MODEL_TITLE);
    const title = screen.getByText(pageTitle);
    expect(title).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });
  it('should render title and button', () => {
    useSelector.mockImplementation(() => ({
      loading: true,
      filter: {
        available: [],
        availableForConstructor: [],
        category: [],
        search: ''
      }
    }));
    render(
      <MockedProvider addTypename={false}>
        <BrowserRouter>
          <ThemeProvider theme={themeValue}>
            <ModelPage />
          </ThemeProvider>
        </BrowserRouter>
      </MockedProvider>
    );
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
