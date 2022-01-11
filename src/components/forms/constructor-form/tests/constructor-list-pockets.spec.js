import React from 'react';
import { mount } from 'enzyme';
import { useDispatch, useSelector } from 'react-redux';

import { restrictionsStore, restrictionsToAdd } from './mockStore.js';
import ConstructorListPockets from '../constructor-list-pockets/constructor-list-pockets.js';

jest.mock('react-redux');

const mockDispatch = jest.fn();
const handleChange = jest.fn();
const setRestrictionsToAdd = jest.fn();

useDispatch.mockReturnValue(mockDispatch);
useSelector.mockReturnValue(restrictionsStore);

describe('constructor-details tests', () => {
  let wrapper;

  test('Should render constructor-pockets when restrictionsToAdd doesn`t exists', () => {
    wrapper = mount(
      <ConstructorListPockets
        handleChange={handleChange}
        restrictionsToAdd={[]}
        setRestrictionsToAdd={setRestrictionsToAdd}
        expanded='pocket'
      />
    );
    expect(wrapper).toBeDefined();
  });

  test('Should render constructor-pockets when restrictionsToAdd exists', () => {
    wrapper = mount(
      <ConstructorListPockets
        handleChange={handleChange}
        restrictionsToAdd={restrictionsToAdd}
        setRestrictionsToAdd={setRestrictionsToAdd}
        expanded='pocket'
      />
    );

    expect(wrapper).toBeDefined();
  });

  test('Should render constructor-pockets when restrictionsToAdd exists', () => {
    wrapper = mount(
      <ConstructorListPockets
        handleChange={handleChange}
        restrictionsToAdd={restrictionsToAdd}
        setRestrictionsToAdd={setRestrictionsToAdd}
        expanded='pocket'
      />
    );

    wrapper.find('CustomizedDeleteIcon').props().onClickHandler();
    expect(wrapper).toBeDefined();
  });
});
