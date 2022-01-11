import React from 'react';
import { mount } from 'enzyme';
import { useDispatch, useSelector } from 'react-redux';

import { restrictionsStore } from './mockStore.js';
import ConstructorListRestrictions from '../constructor-list-pockets/constructor-list-restrictions/constructor-list-restrictions';

jest.mock('react-redux');

const mockDispatch = jest.fn();
useDispatch.mockReturnValue(mockDispatch);
useSelector.mockImplementation(() => restrictionsStore);
const setRestrictionsToAdd = jest.fn();

describe('constructor-details tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ConstructorListRestrictions
        setRestrictionsToAdd={setRestrictionsToAdd}
        restrictionsToAdd={[]}
      />
    );
    wrapper.find('button').at(0).simulate('click');
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
