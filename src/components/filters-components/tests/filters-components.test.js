import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import * as reactRedux from 'react-redux';

import ComponentFilterClear from '../filter-clear/component-filter-clear';
import ComponentFilterSinglePicker from '../filter-single-picker';
import filterLabels from '../../../configs/filter-labels';
import { sortLabel } from '../../../configs/sort';
import ComponentFilterMultiplePicker from '../filter-multiple-picker';
import buttonTitles from '../../../configs/button-titles';
import { paymentStatusFilterObj } from '../../../utils/order';
import ComponentFilterSearch from '../filter-search';
import ComponentFilterRadioPicker from '../filter-radio-picker/component-filter-radio-picker';
import ComponentFilterDateRangePicker from '../filter-date-range-picker';

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

jest.mock('../../../redux/orders/orders.actions', () => ({
  __esModule: true,
  clearOrderFilters: () => mockClearOrderFilters(),
  setOrderFilter: () => mockSetOrderFilter(),
  setOrderSortLabel: () => mockSetOrderSortLabel(),
  setOrderSort: () => mockSetOrderSort()
}));

let props;
let handler;

const filters = { paymentStatus: ['test'], search: '' };
const sortValue = 'test';

const paymentOptions = [...paymentStatusFilterObj()];

describe('Testing filters components', () => {
  beforeEach(() => {
    handler = jest.fn();
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');

    mockDispatch = jest.fn();

    spyOnUseDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    wrapper = null;
    handler = null;
    mockClearOrderFilters = null;
    mockSetCurrentPage = null;
    mockSetOrderFilter = null;
    mockSetOrderSortLabel = null;
    mockSetOrderSort = null;
  });

  describe('Clear filter', () => {
    it('Should render', () => {
      wrapper = mount(
        <ComponentFilterClear actionClearFilters={mockClearOrderFilters} />
      );

      expect(wrapper).toBeDefined();
    });
  });

  describe('Single picker filter', () => {
    it('Should render', () => {
      wrapper = mount(
        <ComponentFilterSinglePicker
          setFilterValue={mockSetOrderSort}
          actionSetLabel={mockSetOrderSortLabel}
          value={sortValue}
          options={filterLabels.orders.sortLabels}
          label={sortLabel}
        />
      );

      expect(wrapper).toBeDefined();
    });
  });

  describe('multiple picker filter', () => {
    it('Should render', () => {
      wrapper = mount(
        <ComponentFilterMultiplePicker
          setFilterValue={mockSetOrderSort}
          selectorFunc={(selector) => ({ paymentStatus: selector })}
          value={filters.paymentStatus}
          options={paymentOptions}
          label={buttonTitles.PAYMENT_STATUS}
        />
      );

      expect(wrapper).toBeDefined();
    });
  });

  describe('multiple picker filter', () => {
    it('Should render', () => {
      wrapper = mount(
        <ComponentFilterSearch
          setFilterValue={mockSetOrderFilter}
          value={filters.search}
          selectorFunc={(selector) => ({ search: selector })}
        />
      );

      expect(wrapper).toBeDefined();
    });
  });
  describe('radio picker filter', () => {
    it('Should render', () => {
      wrapper = mount(
        <ComponentFilterRadioPicker
          setFilterValue={mockSetOrderSort}
          actionSetLabel={mockSetOrderSortLabel}
          value={sortValue}
          options={filterLabels.orders.sortLabels}
          label={sortLabel}
          selectorFunc={(selector) => ({ search: selector })}
        />
      );

      expect(wrapper).toBeDefined();
    });
  });

  describe('DateRangePicker filter', () => {
    it('Should render with date', () => {
      wrapper = mount(
        <ComponentFilterDateRangePicker
          setFilterValue={mockSetOrderFilter}
          filters={filters}
        />
      );
      expect(wrapper).toBeDefined();
    });
  });
});
