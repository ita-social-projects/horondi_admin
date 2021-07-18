import React from 'react';
import * as reactRedux from 'react-redux';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Paper, Grid } from '@material-ui/core';
import { render, fireEvent, act } from '@testing-library/react';
import LanguagePanel from '../../language-panel';
import LoadingBar from '../../../loading-bar';
import { BackButton, SaveButton } from '../../../buttons';
import BackForm from '../index';
import ImageUploadPreviewContainer from '../../../../containers/image-upload-container/image-upload-previewContainer';
import CheckboxOptions from '../../../checkbox-options';
import { config } from '../../../../configs';
import {
  mockMaterial,
  mockBack,
  mockId,
  mockEdit,
  event,
  target
} from './back-form.variables';

configure({ adapter: new Adapter() });

const mockSetFieldValue = jest.fn();
const mockSubmit = jest.fn();
const mockChange = jest.fn();
const mockBlur = jest.fn();

const { GO_BACK_TITLE, SAVE_TITLE } = config.buttonTitles;

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: () => ({
    values: {},
    handleSubmit: mockSubmit,
    handleChange: mockChange,
    touched: {},
    errors: {},
    setFieldValue: mockSetFieldValue,
    handleBlur: mockBlur
  })
}));

describe('Back form tests', () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;
  let component;
  let getState;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => mockMaterial);

    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');

    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);
    component = mount(<BackForm />);
  });
  afterEach(() => {
    jest.restoreAllMocks();
    spyOnUseSelector.mockClear();
    component.unmount();
  });

  it('should render form component', () => {
    const wrapper = component.find('form');
    expect(wrapper.length).toBe(2);
  });

  it('should render CheckboxOptions component', () => {
    const wrapper = component.find(CheckboxOptions);
    expect(wrapper.exists(CheckboxOptions)).toBeDefined();
    expect(wrapper.exists(CheckboxOptions)).toBe(true);
    expect(CheckboxOptions).toHaveLength(1);
  });

  it('Should render 2 buttons and 5 inputs', () => {
    expect(component.find('input')).toHaveLength(5);
    expect(component.find('button')).toHaveLength(2);
  });

  it(`Should render go-back button with '${GO_BACK_TITLE}' label`, () => {
    expect(component.find('button').at(0).text()).toBe(GO_BACK_TITLE);
  });

  it(`Should render save button with '${SAVE_TITLE}' label`, () => {
    expect(component.find('button').at(1).text()).toBe(SAVE_TITLE);
  });

  it('should render Grid component', () => {
    const wrapper = component.find(Grid);
    expect(wrapper.exists(Grid)).toBeDefined();
    expect(wrapper.exists(Grid)).toBe(true);
  });

  it('should render Paper component', () => {
    const wrapper = component.find(Paper);
    expect(wrapper.exists(Paper)).toBeDefined();
    expect(wrapper.exists(Paper)).toBe(true);
  });

  it('should render ImageUploadPreviewContainer component', () => {
    const wrapper = component.find(ImageUploadPreviewContainer);
    expect(wrapper.exists(ImageUploadPreviewContainer)).toBeDefined();
    expect(wrapper.exists(ImageUploadPreviewContainer)).toBe(true);
  });

  it('should render FormControl component', () => {
    const wrapper = component.find(FormControl);
    expect(wrapper.exists(FormControl)).toBeDefined();
    expect(wrapper.exists(FormControl)).toBe(true);
  });

  it('should render InputLabel component', () => {
    const wrapper = component.find(InputLabel);
    expect(wrapper.exists(InputLabel)).toBeDefined();
    expect(wrapper.exists(InputLabel)).toBe(true);
  });

  it('should render Select component', () => {
    const wrapper = component.find(Select);
    expect(wrapper.exists(Select)).toBeDefined();
    expect(wrapper.exists(Select)).toBe(true);
  });

  it('should render MenuItem component', () => {
    const wrapper = component.find(MenuItem);
    expect(wrapper.exists(MenuItem)).toBeDefined();
  });

  it('should render LanguagePanel component', () => {
    const wrapper = component.find(LanguagePanel);
    expect(wrapper.exists(LanguagePanel)).toBeDefined();
    expect(wrapper.exists(LanguagePanel)).toBe(true);
    expect(LanguagePanel).toHaveLength(1);
  });

  it('should render BackButton component', () => {
    const wrapper = component.find(BackButton);
    expect(wrapper.exists(BackButton)).toBeDefined();
    expect(wrapper.exists(BackButton)).toBe(true);
    expect(BackButton).toHaveLength(1);
  });

  it('should render SaveButton component', () => {
    const wrapper = component.find(SaveButton);
    expect(wrapper.exists(SaveButton)).toBeDefined();
    expect(wrapper.exists(SaveButton)).toBe(true);
    expect(SaveButton).toHaveLength(1);
  });

  it('Should render back-form', () => {
    expect(component).toBeDefined();
    expect(component).toHaveLength(1);
  });

  it('useSelector hook should be called', () => {
    getState = reactRedux.useSelector(mockMaterial);
    expect(getState).toEqual(mockMaterial);
    expect(spyOnUseSelector).toHaveBeenCalled();
  });

  it('Should have appropriate prop types', () => {
    expect(BackForm.propTypes.id).toBe(PropTypes.string);
    expect(BackForm.propTypes.edit).toBe(PropTypes.bool);
  });

  it('Loading bar should be not vissible', () => {
    expect(component.exists(LoadingBar)).toBe(false);
  });

  it('Loading bar should be vissible', () => {
    mockMaterial.loading = true;
    component = mount(<BackForm />);
    const loadingBar = component.find(LoadingBar);
    expect(component.exists(LoadingBar)).toBeDefined();
    expect(component.exists(LoadingBar)).toBe(true);
    expect(loadingBar).toHaveLength(1);
  });
});
