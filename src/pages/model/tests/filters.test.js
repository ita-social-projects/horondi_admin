import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as reactRedux from 'react-redux';
import ContainerFilters from '../../../components/container-filters';
import ComponentFilterClear from '../../../components/filters-components/filter-clear';
import ComponentFilterSinglePicker from '../../../components/filters-components/filter-single-picker';
import ComponentFilterSearch from '../../../components/filters-components/filter-search';

import Filters from '../filters/filters';
import ComponentFilterMultiplePicker from '../../../components/filters-components/filter-multiple-picker';

Enzyme.configure({ adapter: new Adapter() });

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
          category: 'test',
          available: 'test',
          availableForConstructor: 'test',
          search: 'test'
        },
        categories: [
          {
            _id: 'testid',
            name: [{ value: 'test' }]
          }
        ]
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
      expect(result).toStrictEqual({ category: selector });
    });

    it('Should return correct search selector', () => {
      const wrapper = shallow(<Filters />);
      const result = wrapper
        .find(ComponentFilterMultiplePicker)
        .at(1)
        .props()
        .selectorFunc(selector);
      expect(result).toStrictEqual({ available: selector });
    });

    it('Should return correct search selector', () => {
      const wrapper = shallow(<Filters />);
      const result = wrapper
        .find(ComponentFilterMultiplePicker)
        .at(2)
        .props()
        .selectorFunc(selector);
      expect(result).toStrictEqual({ availableForConstructor: selector });
    });
  });
});
