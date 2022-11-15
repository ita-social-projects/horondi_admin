import React from 'react';
import { MemoryRouter, Switch } from 'react-router-dom';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import ConstructorEdit from '../constructor-edit';
import { initialState } from './mockStore';

const { Provider } = redux;
let wrapper;

const mockUseDispatch = jest.spyOn(redux, 'useDispatch');
mockUseDispatch.mockImplementation(() => jest.fn());

const mockStore = configureStore();
const store = mockStore(initialState);

describe('constructor-edit tests', () => {
  test('Should render constructor-edit', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['constructor-list/6366445a0e8c5684b99d4c81']}
          initialIndex={0}
        >
          <Switch>{ConstructorEdit}</Switch>
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper).toBeDefined();
  });
});
