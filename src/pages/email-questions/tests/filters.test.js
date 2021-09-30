import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as reactRedux from 'react-redux';

import Filters from '../filters/filters';
import ComponentFilterSearch from '../../../components/filters-components/filter-search';
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
      expect(result).toStrictEqual({ category: selector });
    });
  });
});
