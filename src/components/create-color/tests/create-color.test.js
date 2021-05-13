import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import * as reactRedux from 'react-redux';
import { ChromePicker } from 'react-color';
import { TextField } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CreateColor from '../create-color';
import LoadingBar from '../../loading-bar';
import SaveButton from '../../buttons/save-button';
import ColorCircle from '../../color-circle';

import { config } from '../../../configs';
import mockStore from './mockStore';

const { mockColorHex } = mockStore;
const componentLabels = config.labels.color;

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
  useSelector: () => ({ loading: false })
}));

const mockSetFieldValue = jest.fn();
const mockSubmit = jest.fn();
jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: () => ({
    values: { colorHex: mockColorHex },
    handleSubmit: mockSubmit,
    handleChange: jest.fn(),
    touched: {},
    errors: {},
    resetForm: jest.fn(),
    setFieldValue: mockSetFieldValue
  })
}));

describe('CreateColor test', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<CreateColor />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should render CreateColor component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find(TextField)).toHaveLength(3);
  });

  it('Should render Form component', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it(`Should render TextField with '${componentLabels.colorHex}' label`, () => {
    expect(wrapper.exists(TextField)).toBe(true);
    expect(wrapper.find(TextField).at(0).prop('label')).toBe(
      componentLabels.colorHex
    );
  });

  it(`Should render TextField with '${componentLabels.name}' label`, () => {
    expect(wrapper.exists(TextField)).toBe(true);
    expect(wrapper.find(TextField).at(1).prop('label')).toBe(
      componentLabels.name
    );
  });

  it(`Should render TextField with '${config.labels.color.simpleName}' label`, () => {
    expect(wrapper.exists(TextField)).toBe(true);
    expect(wrapper.find(TextField).at(2).prop('label')).toBe(
      componentLabels.simpleName
    );
  });

  it('Should render ColorCircle component', () => {
    expect(wrapper.exists(ColorCircle)).toBe(true);
  });

  it('Should render AppBar component', () => {
    expect(wrapper.exists(AppBar)).toBe(true);
  });

  it('Should render SaveButton component', () => {
    expect(wrapper.exists(SaveButton)).toBe(true);
  });

  it('Should handle onFocus and render ChromePicker', () => {
    wrapper.find(TextField).at(0).invoke('onFocus')();
    expect(wrapper.exists(ChromePicker)).toBe(true);
  });

  it('Should handle onClick and set ColorPicker', () => {
    wrapper.find(TextField).at(0).invoke('onFocus')();
    expect(wrapper.exists(ChromePicker)).toBe(true);
    wrapper.find('div').at(6).simulate('click');
    expect(wrapper.exists(ChromePicker)).toBe(false);
  });

  it('Should handle ChromePicker onChange', () => {
    wrapper.find(TextField).at(0).invoke('onFocus')();
    wrapper.find(ChromePicker).invoke('onChange')(mockColorHex);
    expect(mockSetFieldValue).toHaveBeenCalledTimes(1);
  });

  it('Should handle Submit form', () => {
    wrapper.find('form').simulate('submit');
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  it('Should render LoadingBar', () => {
    jest.spyOn(reactRedux, 'useSelector').mockReturnValue({ loading: true });
    wrapper = mount(<CreateColor />);
    expect(wrapper.exists(LoadingBar)).toBe(true);
  });
});
