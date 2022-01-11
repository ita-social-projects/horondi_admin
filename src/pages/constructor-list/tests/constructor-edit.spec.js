import React from 'react';
import { StaticRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { mount } from 'enzyme';
import constructorEdit from '../constructor-edit';
import mockStore from './mockStore';

jest.mock('react-redux');

let wrapper;
const mockDispatch = jest.fn();

useSelector.mockImplementation(() => mockStore);
useDispatch.mockReturnValue(mockDispatch);

describe('constructor-edit tests', () => {
  test('Should render constructor-edit', () => {
    wrapper = mount(
      <StaticRouter
        store={mockStore}
        location='/constructor-list/60eadfb9e913fc288294bd9'
      >
        <Switch>
          <Route
            path='/constructor-list/:id'
            exact
            component={constructorEdit}
          />
        </Switch>
      </StaticRouter>
    );

    expect(wrapper).toBeDefined();
  });
});
