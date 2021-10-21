import React from 'react';
import { mount } from 'enzyme';
import { useDispatch, useSelector } from 'react-redux';

import { elementsStore, option } from './mockStore.js';
import ConstructorListAccordion from '../constructor-list-accordion/constructor-list-accordion.js';

jest.mock('react-redux');

const mockDispatch = jest.fn();

useDispatch.mockReturnValue(mockDispatch);
useSelector.mockReturnValue(elementsStore);

describe('constructor-details tests', () => {
  let wrapper;

  test('Should render constructor-accordion isRestrictions:false', () => {
    wrapper = mount(
      <ConstructorListAccordion
        option={option}
        expanded='element1'
        handleChange={jest.fn()}
      />
    );
    expect(wrapper).toBeDefined();
  });

  test('Should render constructor-accordion isRestrictions:true', () => {
    wrapper = mount(
      <ConstructorListAccordion
        option={{ ...option, isRestrictions: true }}
        expanded='element1'
        handleChange={jest.fn()}
      />
    );
    expect(wrapper).toBeDefined();
  });

  test('Should simulate checkbox click', () => {
    wrapper = mount(
      <ConstructorListAccordion
        option={option}
        expanded='element1'
        handleChange={jest.fn()}
      />
    );
    wrapper.find('input').at(0).simulate('click');
    expect(wrapper).toBeDefined();
  });
});
