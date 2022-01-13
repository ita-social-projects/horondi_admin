import React from 'react';
import { mount } from 'enzyme';
import { DateRangePicker as DateRangeSelector } from 'rsuite';
import { Select } from '@material-ui/core';
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
jest.mock('../../../redux/table/table.actions', () => ({
  __esModule: true,
  setCurrentPage: () => mockSetCurrentPage()
}));

const filters = { paymentStatus: ['test'], search: '' };
const sortValue = 'test';

const paymentOptions = [...paymentStatusFilterObj()];

describe('Testing filters components', () => {
  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');

    mockDispatch = jest.fn();

    spyOnUseDispatch.mockReturnValue(mockDispatch);
  });

  describe('Clear filter', () => {
    afterEach(() => {
      wrapper = null;
      mockClearOrderFilters = jest.fn();
      mockSetCurrentPage = jest.fn();
      mockSetOrderFilter = jest.fn();
      mockSetOrderSortLabel = jest.fn();
      mockSetOrderSort = jest.fn();
    });
    it('Should render', () => {
      wrapper = mount(
        <ComponentFilterClear actionClearFilters={mockClearOrderFilters} />
      );

      expect(wrapper).toBeDefined();
    });

    it('Should dispatch clearFilters', () => {
      wrapper = mount(
        <ComponentFilterClear actionClearFilters={mockClearOrderFilters} />
      );

      wrapper.find('button').props().onClick();

      expect(mockSetCurrentPage).toHaveBeenCalled();
      expect(mockClearOrderFilters).toHaveBeenCalled();
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

    it('Should dispatch', () => {
      wrapper = mount(
        <ComponentFilterSinglePicker
          setFilterValue={mockSetOrderSort}
          actionSetLabel={mockSetOrderSortLabel}
          value={sortValue}
          options={filterLabels.orders.sortLabels}
          label={sortLabel}
        />
      );

      wrapper
        .find(Select)
        .props()
        .onChange({
          target: { value: filterLabels.orders.sortLabels[0].value }
        });

      expect(mockSetCurrentPage).toHaveBeenCalled();
      expect(mockSetOrderSort).toHaveBeenCalled();
      expect(mockSetOrderSortLabel).toHaveBeenCalled();
    });
  });

  describe('Multiple picker filter', () => {
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
    it('Should dispatch', () => {
      wrapper = mount(
        <ComponentFilterMultiplePicker
          setFilterValue={mockSetOrderSort}
          selectorFunc={(selector) => ({ paymentStatus: selector })}
          value={filters.paymentStatus}
          options={paymentOptions}
          label={buttonTitles.PAYMENT_STATUS}
        />
      );

      wrapper
        .find(Select)
        .props()
        .onChange({ target: { value: 'test' } });

      expect(mockSetCurrentPage).toHaveBeenCalled();
      expect(mockSetOrderSort).toHaveBeenCalled();
    });
  });

  describe('search picker filter', () => {
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

    it('Should dispatch', () => {
      wrapper = mount(
        <ComponentFilterSearch
          setFilterValue={mockSetOrderFilter}
          value={filters.search}
          selectorFunc={(selector) => ({ search: selector })}
        />
      );
      wrapper.find('button').props().onClick();

      expect(mockSetCurrentPage).toHaveBeenCalled();
      expect(mockSetOrderFilter).toHaveBeenCalled();
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

    it('Should dispatch', () => {
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

      wrapper
        .find(Select)
        .props()
        .onChange({
          target: { value: filterLabels.orders.sortLabels[0].value }
        });

      expect(mockSetCurrentPage).toHaveBeenCalled();
      expect(mockSetOrderSort).toHaveBeenCalled();
      expect(mockSetOrderSortLabel).toHaveBeenCalled();
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
    it('Should dispatch', () => {
      wrapper = mount(
        <ComponentFilterDateRangePicker
          setFilterValue={mockSetOrderFilter}
          filters={filters}
        />
      );
      wrapper.find(DateRangeSelector).props().onChange('test');

      expect(mockSetCurrentPage).toHaveBeenCalled();
      expect(mockSetOrderFilter).toHaveBeenCalled();
    });
  });
});
