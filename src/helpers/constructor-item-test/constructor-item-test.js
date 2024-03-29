import React from 'react';
import * as redux from 'react-redux';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Switch } from 'react-router';
import configureStore from 'redux-mock-store';
import { initialState } from './constructor-item-test.variables';

const { Provider } = redux;

jest.mock('react-router-dom', () => ({
  useHistory: () => ({ block: () => null })
}));

const mockUseSelector = jest.spyOn(redux, 'useSelector');
const mockUseDispatch = jest.spyOn(redux, 'useDispatch');
mockUseDispatch.mockImplementation(() => jest.fn());

const mockStore = configureStore();
const store = mockStore(initialState);

export const constructorItemAddTest = (itemName, component) => {
  describe(`${itemName}-add test`, () => {
    beforeEach(() => {
      render(<Provider store={store}>{component}</Provider>);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('Should render constructor-form', () => {
      const container = screen.getByTestId('constructor-form-container');
      expect(container).toBeInTheDocument();
      mockUseSelector.mockReturnValueOnce({ loading: true });
    });

    test('Should render LoadingBar', () => {
      const loadingBar = screen.getByRole('progressbar');
      expect(loadingBar).toBeInTheDocument();
    });
  });
};

export const constructorItemEditTest = (itemName, component, entries) => {
  const itemKey = itemName.toLowerCase();

  describe(`${itemName}-edit test`, () => {
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
      const container = screen.getByTestId('constructor-form-container');
      expect(container).toBeInTheDocument();
      mockUseSelector.mockReturnValueOnce({ loading: true });
    });

    test('Should render LoadingBar', () => {
      const loadingBar = screen.getByRole('progressbar');
      expect(loadingBar).toBeInTheDocument();
      mockUseSelector.mockReturnValueOnce({ [itemKey]: null });
    });

    test('Should render empty container if item does not exist', () => {
      const container = screen.queryByTestId('constructor-form-container');
      expect(container).toBeNull();
    });
  });
};
