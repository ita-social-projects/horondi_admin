import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router';

import { state } from './constructor-page-test.variables';

const mockStore = configureStore();
const store = mockStore(state);

export const constructorPageTest = (itemName, component) => {
  describe(`${itemName}s-page-container test`, () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test(`Should render table with ${itemName}-items`, () => {
      render(
        <Provider store={store}>
          <MemoryRouter>{component}</MemoryRouter>
        </Provider>
      );

      const tableRows = screen.getAllByRole('row');

      expect(tableRows).toHaveLength(2);
    });
  });
};
