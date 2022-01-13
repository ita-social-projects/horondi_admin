import React from 'react';
import { mount } from 'enzyme';
import { useDispatch } from 'react-redux';
import { FormControl, Grid, InputLabel, Select } from '@material-ui/core';
import * as reactRedux from 'react-redux';
import { StandardButton } from '../../../../components/buttons';
import CategoryDelete from '../category-delete';
import store from './store';

const mockStore = store;

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector) => selector(mockStore),
  useDispatch: () => jest.fn()
}));

describe('Categories test', () => {
  const mockHolder = jest.fn();
  let wrapper;
  jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    wrapper = mount(<CategoryDelete />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should render DialogWindow page', () => {
    expect(wrapper).toBeDefined();
  });
  it('Should render Grid', () => {
    expect(wrapper.exists(Grid)).toBe(true);
  });
  it('Should render FormControl', () => {
    expect(wrapper.exists(FormControl)).toBe(true);
  });
  it('Should render InputLabel', () => {
    expect(wrapper.exists(InputLabel)).toBe(true);
  });
  it('Should render Select', () => {
    expect(wrapper.exists(Select)).toBe(true);
  });
  it('Should render StandardButton', () => {
    expect(wrapper.exists(StandardButton)).toBe(true);
  });
  it('Button is working', () => {
    useDispatch.mockReturnValue(mockHolder);
    const wrapper = mount(<CategoryDelete />);
    wrapper.find(StandardButton).simulate('click');
    expect(mockHolder.mock.calls.length).toEqual(1);
  });
});
