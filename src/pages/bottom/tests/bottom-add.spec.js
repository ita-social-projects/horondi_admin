import React from 'react';
import * as redux from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import BottomAdd from '../bottom-add/bottom-add';
import { initialState } from '../../../helpers/constructor-item-test/constructor-item-test.variables';

const setupTest = () => {
  const { Provider } = redux;

  const mockUseDispatch = jest.spyOn(redux, 'useDispatch');
  mockUseDispatch.mockImplementation(() => jest.fn());

  describe('Bottom-add test', () => {
    beforeEach(() => {
      const mockStore = configureStore();
      const store = mockStore(initialState);
      render(
        <Provider store={store}>
          <BottomAdd />;
        </Provider>
      );
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

setupTest();
