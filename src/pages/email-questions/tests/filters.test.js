import React from 'react';
import { shallow } from 'enzyme';
import * as reactRedux from 'react-redux';

import Filters from '../filters/filters';
import ComponentFilterSearch from '../../../components/filters-components/filter-search';
import ComponentFilterMultiplePicker from '../../../components/filters-components/filter-multiple-picker';

let wrapper;
let spyOnUseDispatch;
let mockDispatch;
let spyOnUseSelector;
const selector = 'test';
describe('Testing filters', () => {
  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');

    mockDispatch = jest.fn();
  });

  afterEach(() => {
    wrapper = null;
  });
  describe('Filter in orders tests', () => {
    beforeEach(() => {
      mockDispatch = jest.fn();

      spyOnUseSelector.mockImplementation(() => ({
        filters: {
          filters: ['test'],
          search: 'test'
        }
      }));
      spyOnUseDispatch.mockReturnValue(mockDispatch);
    });

    it('should render', () => {
      wrapper = shallow(<Filters />);

      expect(wrapper).toBeDefined();
    });
    it('Should return correct search selector', () => {
      const wrapper = shallow(<Filters />);
      const result = wrapper
        .find(ComponentFilterSearch)
        .props()
        .selectorFunc(selector);
      expect(result).toStrictEqual({ search: selector });
    });

    it('Should return correct multiple selector', () => {
      const wrapper = shallow(<Filters />);
      const result = wrapper
        .find(ComponentFilterMultiplePicker)
        .at(0)
        .props()
        .selectorFunc(selector);
      expect(result).toStrictEqual({ filters: selector });
    });
  });
});
