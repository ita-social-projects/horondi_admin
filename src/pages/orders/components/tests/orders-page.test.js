import React, { useEffect } from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as reactRedux from 'react-redux';
import { act } from 'react-dom/test-utils';
import IconButton from '@material-ui/core/IconButton';
import { DateRangePicker as DateRangeSelector } from 'rsuite';
import { Select } from '@material-ui/core';

import ContainerFilters from '../../../../components/container-filters';
import FilterDateRangePicker from '../filter-date-range-picker';
import FilterSortPicker from '../filter-sort-picker';
import FilterPaymentStatusesPicker from '../filter-payment-statuses-picker';
import FilterOrderStatusesPicker from '../filter-order-statuses-picker';
import FilterSearch from '../filter-search';
import FilterClear from '../filter-clear';
import filterLabels from '../../../../configs/filter-labels';

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

    spyOnUseDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    wrapper = null;
    mockClearOrderFilters = jest.fn();
    mockSetCurrentPage = jest.fn();
    mockSetOrderFilter = jest.fn();
    mockSetOrderSortLabel = jest.fn();
    mockSetOrderSort = jest.fn();
  });
  describe('Clear filter', () => {
    it('Should render', () => {
      spyOnUseSelector.mockImplementation(() => null);
      wrapper = mount(
        <ContainerFilters>
          <FilterClear key={FilterClear.toString()} />
        </ContainerFilters>
      );
      expect(wrapper).toBeDefined();
    });

    it('Should dispatch clearFilters', () => {
      spyOnUseSelector.mockImplementation(() => null);
      wrapper = mount(
        <ContainerFilters>
          <FilterClear key={FilterClear.toString()} />
        </ContainerFilters>
      );

      wrapper.find('button').props().onClick();

      expect(mockSetCurrentPage).toHaveBeenCalled();
      expect(mockClearOrderFilters).toHaveBeenCalled();
    });
  });
  describe('Search filter', () => {
    it('Should render', () => {
      spyOnUseSelector.mockImplementation(() => ({
        filters: { search: 'test' }
      }));

      wrapper = mount(
        <ContainerFilters>
          <FilterSearch key={FilterSearch.toString()} />
        </ContainerFilters>
      );
      expect(wrapper).toBeDefined();
    });
    it('Should dispatch setSearchFilter', () => {
      spyOnUseSelector.mockImplementation(() => ({
        filters: { search: 'test' }
      }));

      wrapper = mount(
        <ContainerFilters>
          <FilterSearch key={FilterSearch.toString()} />
        </ContainerFilters>
      );
      wrapper.find(IconButton).props().onClick();

      expect(mockSetCurrentPage).toHaveBeenCalled();
      expect(mockSetOrderFilter).toHaveBeenCalled();
    });
  });

  describe('Order Statuses Picker filter', () => {
    it('Should render', () => {
      spyOnUseSelector.mockImplementation(() => ({
        filters: { search: 'test', status: ['test'] }
      }));

      wrapper = mount(
        <ContainerFilters>
          <FilterOrderStatusesPicker
            key={FilterOrderStatusesPicker.toString()}
          />
        </ContainerFilters>
      );
      expect(wrapper).toBeDefined();
    });
    it('Should dispatch setOrderStatusFilter', () => {
      wrapper = mount(
        <ContainerFilters>
          <FilterOrderStatusesPicker
            key={FilterOrderStatusesPicker.toString()}
          />
        </ContainerFilters>
      );
      wrapper
        .find(Select)
        .props()
        .onChange({ target: { value: 'test' } });

      expect(mockSetCurrentPage).toHaveBeenCalled();
      expect(mockSetOrderFilter).toHaveBeenCalled();
    });
  });

  describe('Payment Statuses Picker filter', () => {
    it('Should render', () => {
      spyOnUseSelector.mockImplementation(() => ({
        filters: { search: 'test', paymentStatus: ['test'] }
      }));

      wrapper = mount(
        <ContainerFilters>
          <FilterPaymentStatusesPicker
            key={FilterPaymentStatusesPicker.toString()}
          />
        </ContainerFilters>
      );

      expect(wrapper).toBeDefined();
    });
    it('Should dispatch setPaymentStatusFilter', () => {
      wrapper = mount(
        <ContainerFilters>
          <FilterPaymentStatusesPicker
            key={FilterPaymentStatusesPicker.toString()}
          />
        </ContainerFilters>
      );
      wrapper
        .find(Select)
        .props()
        .onChange({ target: { value: 'test' } });

      console.log(mockSetCurrentPage.mock.calls.length);
      expect(mockSetCurrentPage).toHaveBeenCalled();
      expect(mockSetOrderFilter).toHaveBeenCalled();
    });
  });
  describe('Sort Picker filter', () => {
    it('Should render', () => {
      wrapper = mount(
        <ContainerFilters>
          <FilterSortPicker key={FilterSortPicker.toString()} />
        </ContainerFilters>
      );
      expect(wrapper).toBeDefined();
    });

    it('Should dispatch setSortFilter', () => {
      wrapper = mount(
        <ContainerFilters>
          <FilterSortPicker key={FilterSortPicker.toString()} />
        </ContainerFilters>
      );
      wrapper
        .find(Select)
        .props()
        .onChange({
          target: { value: filterLabels.orders.sortLabels[0].value }
        });

      expect(mockSetCurrentPage).toHaveBeenCalled();
      expect(mockSetOrderSortLabel).toHaveBeenCalled();
      expect(mockSetOrderSort).toHaveBeenCalled();
    });
  });

  describe('Date Range Picker filter', () => {
    it('Should render with date', () => {
      spyOnUseSelector.mockImplementation(() => ({
        filters: { dateFrom: new Date(), dateTo: new Date() }
      }));

      wrapper = mount(
        <ContainerFilters>
          <FilterDateRangePicker key={FilterDateRangePicker.toString()} />
        </ContainerFilters>
      );
      expect(wrapper).toBeDefined();
    });

    it('Should dispatch setDateRangeFilter', () => {
      wrapper = mount(
        <ContainerFilters>
          <FilterDateRangePicker key={FilterDateRangePicker.toString()} />
        </ContainerFilters>
      );
      wrapper.find(DateRangeSelector).props().onChange('test');

      expect(mockSetCurrentPage).toHaveBeenCalled();
      expect(mockSetOrderFilter).toHaveBeenCalled();
    });

    it('Should render FilterDateRangePicker without date', () => {
      spyOnUseSelector.mockImplementation(() => ({
        filters: { dateFrom: undefined, dateTo: undefined }
      }));
      wrapper = mount(
        <ContainerFilters>
          <FilterDateRangePicker key={FilterDateRangePicker.toString()} />
        </ContainerFilters>
      );
      expect(wrapper).toBeDefined();
    });
  });
});
