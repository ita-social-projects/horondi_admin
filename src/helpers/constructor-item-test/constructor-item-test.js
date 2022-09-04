import React from 'react';
import * as redux from 'react-redux';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Switch } from 'react-router';
import configureStore from 'redux-mock-store';
import { initialState } from './constructor-item-test.variables';

const mockStore = configureStore();
const store = mockStore(initialState);

const { Provider } = redux;
const implementMockedRedux = () => {
  const mockUseDispatch = jest.spyOn(redux, 'useDispatch');
  mockUseDispatch.mockImplementation(() => jest.fn());
};

export const constructorItemAddTest = (component) => {
  implementMockedRedux();

  describe('Bottom-add test', () => {
    beforeEach(() => {
      render(<Provider store={store}>{component}</Provider>);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('Should render constructor-form', () => {
      const container = screen.getByTestId('constructor-form-container');
      expect(container).toBeInTheDocument();
    });
  });
};

export const constructorItemEditTest = (component, entries) => {
  implementMockedRedux();

  describe('Bottom-edit test', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={[entries]} initialIndex={0}>
            <Switch>{component}</Switch>
          </MemoryRouter>
        </Provider>
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('Should render constructor-form', () => {
      screen.debug();
      const container = screen.getByTestId('constructor-form-container');
      expect(container).toBeInTheDocument();
    });
  });
};
