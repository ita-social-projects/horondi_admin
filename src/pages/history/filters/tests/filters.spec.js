import React from 'react';
import { useSelector } from 'react-redux';
import Filters from '../filters';
import ComponentFilterMultiplePicker from '../../../../components/filters-components/filter-multiple-picker';

jest.mock('react-redux');

const mockStore = {
  filters: {
    action: '',
    historyName: '',
    role: '',
    dateFrom: '',
    dateTo: ''
  }
};
useSelector.mockImplementation(() => mockStore);

describe('Filter component tests', () => {
  it('Should render Filter component', () => {
    const component = shallow(<Filters />);
    expect(component.find(ComponentFilterMultiplePicker)).toHaveLength(3);
  });
  it('Should call function inside action component', () => {
    const funcCallback = () => {};
    const component = shallow(<Filters />);
    const actionPicker = component.find(ComponentFilterMultiplePicker).at(0);
    actionPicker.prop('selectorFunc')(funcCallback);
    expect(actionPicker.props().options[0].value).toBe('ADD_EVENT');
  });
});
