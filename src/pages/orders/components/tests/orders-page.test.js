import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as reactRedux from 'react-redux';
import ContainerFilters from '../../../../components/container-filters';
import FilterClear from '../filter-clear';
import OrdersPage from '../../orders-page';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
let spyOnUseDispatch;
let mockDispatch;
let spyOnUseSelector;

describe('Testing filters', () => {
  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');

    mockDispatch = jest.fn();

    spyOnUseDispatch.mockReturnValue(mockDispatch);
  });
  afterEach(() => {
    wrapper = null;
  });

  it('Should render FilterClear', () => {
    spyOnUseSelector.mockImplementation(() => null);
    wrapper = mount(<OrdersPage />);
    expect(wrapper).toBeDefined();
  });
});
