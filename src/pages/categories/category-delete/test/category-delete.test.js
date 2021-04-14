import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';
import * as reactRedux from 'react-redux';
import { StandardButton } from '../../../../components/buttons';
import CategoryDelete from '../category-delete';
import store from './store';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = store;

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector) => selector(mockStore),
  useDispatch: () => jest.fn()
}));

describe('Categories test', () => {
  let store;
  const mockHolder = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<CategoryDelete/>);
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
    wrapper.find(StandardButton).simulate('click');
    expect(mockHolder.mock.calls.length).toEqual(1);
  });
});
