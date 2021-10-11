import React from 'react';
import * as reactRedux from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount } from 'enzyme';
import mockStore from './mockStore';
import ConstructorModelDetails from '../constructor-details';

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
      <BrowserRouter>
        <ConstructorModelDetails />
        );
      </BrowserRouter>
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
    spyOnUseSelector.mockClear();
  });

  test.skip('Should render constructor-details', () => {
    expect(wrapper).toBeDefined();
  });
});
