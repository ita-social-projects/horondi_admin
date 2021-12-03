import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { Select } from '@material-ui/core';
import { DateRangePicker as DateRangeSelector } from 'rsuite';

import Clear from '../clear';
import DateRangePicker from '../date-range-picker';
import OptionPicker from '../option-picker';
import OptionsPicker from '../options-picker';
import Search from '../search';
import { config } from '../../../configs';

Enzyme.configure({ adapter: new Adapter() });

const { submitKey } = config;

let wrapper;
let props;
let handler;

describe('Testing filters', () => {
  beforeEach(() => {
    handler = jest.fn();
  });

  afterEach(() => {
    wrapper = null;
    handler = null;
  });

  describe('Clear filter', () => {
    it('Should render', () => {
      wrapper = mount(<Clear />);

      expect(wrapper).toBeDefined();
    });
  });

  describe('DateRangePicker filter', () => {
    it('Should render with date', () => {
      props = { dateFrom: new Date(), dateTo: new Date() };

      wrapper = mount(<DateRangePicker {...props} />);
      expect(wrapper).toBeDefined();
    });

    it('Should render without date', () => {
      props = { dateFrom: undefined, dateTo: undefined };

      wrapper = mount(<DateRangePicker {...props} />);

      expect(wrapper).toBeDefined();
    });

    it('Should call setDateHander', () => {
      const value = ['test'];
      const label = 'test';
      props = { options: [{ value, label }], handler, value };
      wrapper = mount(<DateRangePicker {...props} />);
      wrapper.find(DateRangeSelector).props().onChange('test');

      expect(handler.mock.calls.length).toBe(1);
    });
  });

  describe('OptionPicker filter', () => {
    it('Should render', () => {
      props = { options: ['test'] };

      wrapper = mount(<OptionPicker {...props} />);

      expect(wrapper).toBeDefined();
    });

    it('Should call setOptionHandler', () => {
      props = { options: [{ value: 'test' }], handler };

      wrapper = mount(<OptionPicker {...props} />);
      wrapper
        .find(Select)
        .props()
        .onChange({ target: { value: 'test' } });
      wrapper
        .find(Select)
        .props()
        .onChange({ target: { value: 'not test' } });

      expect(handler.mock.calls.length).toBe(1);
    });
  });

  describe('OptionsPicker filter', () => {
    beforeEach(() => {
      const value = ['test', 'test2'];
      const label = ['test', 'test2'];
      props = {
        options: [
          { value: value[0], label: label[0] },
          { value: value[1], label: label[1] }
        ],
        handler,
        value
      };
    });

    it('Should render', () => {
      wrapper = mount(<OptionsPicker {...props} />);

      expect(wrapper).toBeDefined();
    });

    it('Should call setOptionsHandler', () => {
      wrapper = mount(<OptionsPicker {...props} />);
      wrapper
        .find(Select)
        .props()
        .onChange({ target: { value: 'test' } });
      wrapper
        .find(Select)
        .props()
        .onChange({ target: { value: undefined } });

      expect(handler.mock.calls.length).toBe(1);
    });

    it('Should separate chosen values by comma', () => {
      wrapper = mount(<OptionsPicker {...props} />);

      const renderValue = wrapper.find(Select).prop('renderValue');
      const selectedValues = props.options.map((opt) => opt.value);

      expect(renderValue(selectedValues)[0]).toEqual('test, ');
    });
  });

  describe('Search filter', () => {
    it('Should render', () => {
      wrapper = mount(<Search />);

      expect(wrapper).toBeDefined();
    });

    it('Should submit on keyPress', () => {
      props = { handler };
      wrapper = mount(<Search {...props} />);
      act(() => {
        wrapper.find(InputBase).props().onKeyPress({ key: submitKey });
        wrapper.find(InputBase).props().onKeyPress({ key: null });
      });
      expect(handler.mock.calls.length).toBe(1);
    });

    it('Should handle search on icon click ', () => {
      props = { handler };

      wrapper = mount(<Search {...props} />);
      wrapper.find(IconButton).props().onClick();

      expect(handler).toHaveBeenCalled();
    });
  });
});
