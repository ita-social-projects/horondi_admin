import React from 'react';
import { StaticRouter, Route, Switch } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import constructorEdit from '../constructor-edit';
import mockStore from './mockStore';

configure({ adapter: new Adapter() });

describe('constructor-edit tests', () => {
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
  });

  afterEach(() => {
    jest.restoreAllMocks();
    spyOnUseSelector.mockClear();
  });

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
