import React from 'react';
import * as reactRedux from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';

import { restrictionsStore } from './mockStore.js';
import ConstructorListRestrictions from '../constructor-list-pockets/constructor-list-restrictions/constructor-list-restrictions';

configure({ adapter: new Adapter() });

describe('constructor-details tests', () => {
  let wrapper;
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;
  let restrictionsToAdd = [];
  const setRestrictionsToAdd = (value) => {
    restrictionsToAdd = value;
  };

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => restrictionsStore);

    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');

    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);

    wrapper = mount(
      <ConstructorListRestrictions
        setRestrictionsToAdd={setRestrictionsToAdd}
        restrictionsToAdd={restrictionsToAdd}
      />
    );
    wrapper.find('button').at(0).simulate('click');
  });

  afterEach(() => {
    jest.restoreAllMocks();
    spyOnUseSelector.mockClear();
  });

  test('Should render constructor-details', () => {
    expect(wrapper).toBeDefined();
  });

  test('Should change position', () => {
    wrapper.find('input').at(2).simulate('change');

    expect(wrapper).toBeDefined();
  });

  test('Should change pocket', () => {
    wrapper.find('input').at(0).simulate('change');

    expect(wrapper).toBeDefined();
  });

  test('Should change checkbox value', () => {
    wrapper.find('input').at(3).simulate('change');
    wrapper.find('input').at(4).simulate('change');
    wrapper.find('input').at(4).simulate('change');

    expect(wrapper).toBeDefined();
  });

  test('Should add restriction', () => {
    wrapper.find('input').at(3).simulate('change');
    wrapper.find('button').at(1).simulate('click');

    expect(wrapper).toBeDefined();
  });
});
