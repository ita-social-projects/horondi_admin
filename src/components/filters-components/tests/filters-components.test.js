import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import * as reactRedux from 'react-redux';

import { Select } from '@material-ui/core';
import { DateRangePicker as DateRangeSelector } from 'rsuite';

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
// import DateRangePicker from '../date-range-picker';
// import OptionPicker from '../option-picker';
// import OptionsPicker from '../options-picker';
// import Search from '../search';
// import { config } from '../../../configs';

Enzyme.configure({ adapter: new Adapter() });

// const { submitKey } = config;

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

  // xdescribe('DateRangePicker filter', () => {
  //   it('Should render with date', () => {
  //     props = { dateFrom: new Date(), dateTo: new Date() };

  //     wrapper = mount(<DateRangePicker {...props} />);
  //     expect(wrapper).toBeDefined();
  //   });

  //   it('Should render without date', () => {
  //     props = { dateFrom: undefined, dateTo: undefined };

  //     wrapper = mount(<DateRangePicker {...props} />);

  //     expect(wrapper).toBeDefined();
  //   });

  //   it('Should call setDateHander', () => {
  //     const value = ['test'];
  //     const label = 'test';
  //     props = { options: [{ value, label }], handler, value };
  //     wrapper = mount(<DateRangePicker {...props} />);
  //     wrapper.find(DateRangeSelector).props().onChange('test');

  //     expect(handler.mock.calls.length).toBe(1);
  //   });
  // });

  // xdescribe('OptionPicker filter', () => {
  //   it('Should render', () => {
  //     props = { options: ['test'] };

  //     wrapper = mount(<OptionPicker {...props} />);

  //     expect(wrapper).toBeDefined();
  //   });

  //   it('Should call setOptionHandler', () => {
  //     props = { options: [{ value: 'test' }], handler };

  //     wrapper = mount(<OptionPicker {...props} />);
  //     wrapper
  //       .find(Select)
  //       .props()
  //       .onChange({ target: { value: 'test' } });
  //     wrapper
  //       .find(Select)
  //       .props()
  //       .onChange({ target: { value: 'not test' } });

  //     expect(handler.mock.calls.length).toBe(1);
  //   });
  // });

  // xdescribe('OptionsPicker filter', () => {
  //   beforeEach(() => {
  //     const value = ['test'];
  //     const label = 'test';
  //     props = { options: [{ value, label }], handler, value };
  //   });

  //   it('Should render', () => {
  //     wrapper = mount(<OptionsPicker {...props} />);

  //     expect(wrapper).toBeDefined();
  //   });

  //   it('Should call setOptionsHandler', () => {
  //     wrapper = mount(<OptionsPicker {...props} />);
  //     wrapper
  //       .find(Select)
  //       .props()
  //       .onChange({ target: { value: 'test' } });
  //     wrapper
  //       .find(Select)
  //       .props()
  //       .onChange({ target: { value: undefined } });

  //     expect(handler.mock.calls.length).toBe(1);
  //   });
  // });

  // xdescribe('Search filter', () => {
  //   it('Should render', () => {
  //     wrapper = mount(<Search />);

  //     expect(wrapper).toBeDefined();
  //   });

  //   it('Should submit on keyPress', () => {
  //     props = { handler };
  //     wrapper = mount(<Search {...props} />);
  //     act(() => {
  //       wrapper.find(InputBase).props().onKeyPress({ key: submitKey });
  //       wrapper.find(InputBase).props().onKeyPress({ key: null });
  //     });
  //     expect(handler.mock.calls.length).toBe(1);
  //   });

  //   it('Should handle search on icon click ', () => {
  //     props = { handler };

  //     wrapper = mount(<Search {...props} />);
  //     wrapper.find(IconButton).props().onClick();

  //     expect(handler).toHaveBeenCalled();
  //   });
  // });
});
