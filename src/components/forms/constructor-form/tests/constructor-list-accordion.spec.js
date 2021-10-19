import React from 'react';
import * as reactRedux from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';

import { elementsStore } from './mockStore.js';
import ConstructorListAccordion from '../constructor-list-accordion/constructor-list-accordion.js';

configure({ adapter: new Adapter() });

let elementsToAdd = [];
const setElementsToAdd = (value) => {
  elementsToAdd = value;
};

const option = {
  selector: jest.fn(),
  getItems: jest.fn(),
  setOptionToAdd: setElementsToAdd,
  optionToAdd: elementsToAdd,
  label: 'element1',
  optionName: 'element1',
  isRestrictions: false
};

describe('constructor-details tests', () => {
  let wrapper;
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => elementsStore);

    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');

    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    spyOnUseSelector.mockClear();
  });

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
