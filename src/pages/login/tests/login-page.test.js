import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as redux from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import {
  Avatar,
  Typography,
  Button,
  TextField,
  FormControl
} from '@material-ui/core';
import LoadingBar from '../../../components/loading-bar';
import LoginPage from '../index';
import { LOGIN, mockStore } from './variables';

configure({ adapter: new Adapter() });

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => jest.fn(),
  useDispatch: () => mockDispatch
}));

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: () => ({
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    values: {},
    touched: {},
    errors: {}
  })
}));

describe('Login page', () => {
  const mockUseDispatch = jest.spyOn(redux, 'useDispatch');
  const mockUseSelector = jest.spyOn(redux, 'useSelector');
  const mockHandleClick = jest.fn();
  let component;

  beforeEach(() => {
    mockUseDispatch.mockImplementation(() => jest.fn());
    mockUseSelector.mockImplementation((callback) => callback(mockStore));
    component = mount(<LoginPage />);
  });

  afterEach(() => {
    component.unmount();
    mockUseDispatch.mockClear();
    mockUseSelector.mockClear();
  });

  it('Should exist', () => {
    expect(component).toMatchSnapshot();
    expect(component.exists());
  });

  it('Should render only 1 component of each type: Avatar, Typography, TextField ', () => {
    expect(component.find(Avatar)).toHaveLength(1);
    expect(component.find(Typography)).toHaveLength(1);
    expect(component.find(TextField)).toHaveLength(1);
  });

  it('Should render 2 components FormControl', () => {
    expect(component.find(FormControl)).toHaveLength(2);
  });

  it(`Should render Button with '${LOGIN}' label`, () => {
    expect(component.find(Button).text()).toBe(LOGIN);
  });

  it('Should run handleClickShowPassword when click on the IconButton', () => {
    const button = component.find(IconButton);
    button.props().onClick = mockHandleClick();
    button.simulate('click');
    expect(mockHandleClick.mock.calls.length).toEqual(1);
  });

  it('Should render LoadingBar when loading is true', () => {
    mockStore.Auth.loading = true;
    const wrapper = mount(<LoginPage />);
    expect(wrapper.exists(LoadingBar)).toBe(true);
  });
});
