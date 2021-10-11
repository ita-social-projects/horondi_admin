import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as reactRedux from 'react-redux';
import Router from 'react-router';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount } from 'enzyme';
import mockStore from './mockStore';
import ConstructorEdit from '../constructor-edit';
import LoadingBar from '../../../components/loading-bar';

import { config } from '../../../configs';

const { NO_CONSTRUCTOR_MESSAGE } = config.messages;

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

    wrapper = mount(
      <BrowserRouter>
        <ConstructorEdit
          match={{
            params: { id: '60eadfb9e913fc288294bd9' },
            isExact: true,
            path: '',
            url: ''
          }}
        />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
    spyOnUseSelector.mockClear();
  });

  test.skip('Should render constructor-edit', () => {
    expect(wrapper).toBeDefined();
  });
});
