import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactsEdit from '../contacts-edit';
import LoadingBar from '../../../../components/loading-bar';

jest.mock('react-redux');

const dispatch = jest.fn();

useDispatch.mockImplementation(() => dispatch);
useSelector.mockImplementation(() => ({ loading: false, contact: null }));
describe('<ContactsEdit/>', () => {
  it('should render contacts-edit', () => {
    const component = mount(<ContactsEdit match={{ params: '123' }} />);
    expect(component).toBeDefined();
  });
  it('should render loading', () => {
    useSelector.mockImplementation(() => ({ loading: true, contact: null }));
    const component = mount(<ContactsEdit match={{ params: '123' }} />);
    expect(component.find(LoadingBar)).toBeDefined();
  });
});
