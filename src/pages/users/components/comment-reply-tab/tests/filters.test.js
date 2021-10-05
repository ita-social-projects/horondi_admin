import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as reactRedux from 'react-redux';

import Filters from '../filters/filters';
import ComponentFilterSearch from '../../../../../components/filters-components/filter-search';
import ComponentFilterMultiplePicker from '../../../../../components/filters-components/filter-multiple-picker';
import ComponentFilterRadioPicker from '../../../../../components/filters-components/filter-radio-picker';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
let spyOnUseDispatch;
let mockDispatch;
let spyOnUseSelector;
const selector = 'test';

let mockClearOrderFilters = jest.fn();
let mockSetCurrentPage = jest.fn();
let mockSetOrderFilter = jest.fn();
let mockSetOrderSortLabel = jest.fn();
let mockSetOrderSort = jest.fn();

jest.mock('../../../../../redux/orders/orders.actions', () => ({
  __esModule: true,
  clearOrderFilters: () => mockClearOrderFilters(),
  setOrderFilter: () => mockSetOrderFilter(),
  setOrderSortLabel: () => mockSetOrderSortLabel(),
  setOrderSort: () => mockSetOrderSort()
}));

jest.mock('../../../../../redux/table/table.actions', () => ({
  __esModule: true,
  setCurrentPage: () => mockSetCurrentPage()
}));

describe('Testing filters', () => {
  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');

    mockDispatch = jest.fn();
  });

  afterEach(() => {
    wrapper = null;
    mockClearOrderFilters = jest.fn();
    mockSetCurrentPage = jest.fn();
    mockSetOrderFilter = jest.fn();
    mockSetOrderSortLabel = jest.fn();
    mockSetOrderSort = jest.fn();
  });
  describe('Filter in orders tests', () => {
    beforeEach(() => {
      mockDispatch = jest.fn();

      spyOnUseSelector.mockImplementation(() => ({
        filters: {
          show: 'test',
          sortLabel: 'test'
        },
        filtersUser: {
          show: 'test',
          sortLabel: 'test',
          typeComment: 'test'
        },
        filtersReplyUser: {
          show: 'test',
          sortLabel: 'test',
          typeComment: 'test'
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
      expect(result).toStrictEqual({ show: selector });
    });

    it('Should return correct radio selector', () => {
      const wrapper = shallow(<Filters />);
      const result = wrapper
        .find(ComponentFilterRadioPicker)
        .at(0)
        .props()
        .selectorFunc(selector);
      expect(result).toStrictEqual({ typeComment: selector });
    });
  });
});
