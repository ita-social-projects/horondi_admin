import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mount } from 'enzyme';
import { StaticRouter, Route, Switch } from 'react-router-dom';

import { mockStore } from './mockStore';
import ConstructorModelDetails from '../constructor-details';
import LoadingBar from '../../../components/loading-bar';

jest.mock('react-redux');
let wrapper;
const mockDispatch = jest.fn();

useSelector.mockImplementation(() => mockStore);
useDispatch.mockReturnValue(mockDispatch);
describe('constructor-details tests', () => {
  beforeEach(() => {
    wrapper = mount(
      <StaticRouter
        store={mockStore}
        location='/constructor-model/60eadfb9e913fc288294bd9'
      >
        <Switch>
          <Route
            path='/constructor-model/:id'
            exact
            component={ConstructorModelDetails}
          />
        </Switch>
      </StaticRouter>
    );
  });

  test('Should render constructor-details', () => {
    expect(wrapper).toBeDefined();
  });
  test('Should render loading bar', () => {
    useSelector.mockImplementation(() => ({
      ...mockStore,
      loading: true
    }));
    wrapper = mount(
      <StaticRouter
        store={mockStore}
        location='/constructor-model/60eadfb9e913fc288294bd9'
      >
        <Switch>
          <Route
            path='/constructor-model/:id'
            exact
            component={ConstructorModelDetails}
          />
        </Switch>
      </StaticRouter>
    );
    expect(wrapper.find(LoadingBar)).toBeDefined();
  });
  test('Should render constructor-details without model', () => {
    useSelector.mockImplementation(() => ({ ...mockStore, model: null }));
    wrapper = mount(
      <StaticRouter store={mockStore} location='/constructor-model/1'>
        <Switch>
          <Route
            path='/constructor-model/:id'
            exact
            component={ConstructorModelDetails}
          />
        </Switch>
      </StaticRouter>
    );
    expect(wrapper).toBeDefined();
  });
});
