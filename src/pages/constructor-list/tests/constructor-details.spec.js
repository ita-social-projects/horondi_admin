import React from 'react';
import * as reactRedux from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import { StaticRouter, Route, Switch } from 'react-router-dom';

import mockStore from './mockStore';
import ConstructorModelDetails from '../constructor-details';
import LoadingBar from '../../../components/loading-bar';

configure({ adapter: new Adapter() });

describe('constructor-details tests', () => {
  let wrapper;
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => mockStore);

    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');

    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);

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

  afterEach(() => {
    jest.restoreAllMocks();
    spyOnUseSelector.mockClear();
  });

  test('Should render constructor-details', () => {
    expect(wrapper).toBeDefined();
  });
  test('Should render loading bar', () => {
    spyOnUseSelector.mockImplementation(() => ({
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
    spyOnUseSelector.mockImplementation(() => ({ ...mockStore, model: null }));
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
