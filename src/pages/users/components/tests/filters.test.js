import React, { useEffect } from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as reactRedux from 'react-redux';

import Filters from '../users-filters/UsersFilters';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
let spyOnUseDispatch;
let mockDispatch;
let spyOnUseSelector;

let mockClearOrderFilters = jest.fn();
let mockSetCurrentPage = jest.fn();
let mockSetOrderFilter = jest.fn();
let mockSetOrderSortLabel = jest.fn();
let mockSetOrderSort = jest.fn();

jest.mock('../../../../redux/orders/orders.actions', () => ({
  __esModule: true,
  clearOrderFilters: () => mockClearOrderFilters(),
  setOrderFilter: () => mockSetOrderFilter(),
  setOrderSortLabel: () => mockSetOrderSortLabel(),
  setOrderSort: () => mockSetOrderSort()
}));

jest.mock('../../../../redux/table/table.actions', () => ({
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
    it('should render', () => {
      spyOnUseDispatch.mockImplementation(() => jest.fn());
      spyOnUseSelector.mockReturnValue({
        filters: { paymentStatus: ['test'] }
      });
      wrapper = shallow(<Filters />);
    });
  });
});
