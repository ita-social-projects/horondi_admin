import React from 'react';
import * as redux from 'react-redux';
import { screen, render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/styles';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import ProductEdit from '../product-edit';
import { theme } from '../../../components/app/app-theme/app.theme';
import { config } from '../../../configs';
import configureStore from '../../../store/store';

const { routes } = config;

const store = configureStore();
const themeValue = theme('light');

describe('Product component tests', () => {
  const mockUseDispatch = jest.spyOn(redux, 'useDispatch');

  beforeEach(() => {
    mockUseDispatch.mockImplementation(() => jest.fn());
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[routes.pathToEditProduct]}>
          <ThemeProvider theme={themeValue}>
            <Route
              path={routes.pathToEditProduct}
              exact
              render={({ match }) => <ProductEdit id={match.params.id} />}
            />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
  });

  it('Should display a Loading Bar', () => {
    const loadingBar = screen.getByRole('progressbar');
    expect(loadingBar).toBeInTheDocument();
  });

  it('Should call useDispatch once', () => {
    expect(mockUseDispatch).toHaveBeenCalledTimes(1);
  });
});
