import React from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import Enzyme, { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as reactRedux from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Paper, Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { render, fireEvent, act } from '@testing-library/react';
import LoadingBar from '../../../loading-bar';
import CheckboxOptions from '../../../checkbox-options';
import ImageUploadPreviewContainer from '../../../../containers/image-upload-container/image-upload-previewContainer';
import mockStore from './mockStore';
import LanguagePanel from '../../language-panel';
import { BackButton, SaveButton } from '../../../buttons';
import PatternForm from '../pattern-form';
import { config } from '../../../../configs';

configure({ adapter: new Adapter() });
const { GO_BACK_TITLE, SAVE_TITLE } = config.buttonTitles;

const mockSetFieldValue = jest.fn();
jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: () => ({
    values: {},
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
    touched: {},
    errors: {},
    setFieldValue: mockSetFieldValue
  })
}));

describe('pattern form tests', () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;
  let component;
  let getState;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => mockStore);

    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');

    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);
    component = mount(<PatternForm />);
  });
  afterEach(() => {
    jest.restoreAllMocks();
    spyOnUseSelector.mockClear();
    component.unmount();
  });

  it('should render form component', () => {
    const wrapper = component.find('form');
    expect(wrapper.length).toBe(1);
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

  it('Should render pattern-form', () => {
    expect(component).toBeDefined();
    expect(component).toHaveLength(1);
  });

  it('useSelector hook should be called', () => {
    getState = reactRedux.useSelector(mockStore);
    expect(getState).toEqual(mockStore);
    expect(spyOnUseSelector).toHaveBeenCalled();
  });

  it('useEffect hook shoud work out', () => {
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('Should update checkboxes checked value on click', () => {
    const { getAllByRole } = render(<PatternForm />);

    act(() => {
      fireEvent.click(getAllByRole('checkbox')[0]);
    });

    act(() => {
      fireEvent.click(getAllByRole('checkbox')[1]);
    });
    expect(mockSetFieldValue).toHaveBeenCalled();
  });

  it('Should have appropriate prop types', () => {
    expect(PatternForm.propTypes.id).toBe(PropTypes.string);
    expect(PatternForm.propTypes.isEdit).toBe(PropTypes.bool);
  });

  it('Loading bar should be not vissible', () => {
    expect(component.exists(LoadingBar)).toBe(false);
  });

  it('Loading bar should be vissible', () => {
    mockStore.loading = true;
    component = mount(<PatternForm />);
    const loadingBar = component.find(LoadingBar);
    expect(component.exists(LoadingBar)).toBeDefined();
    expect(component.exists(LoadingBar)).toBe(true);
    expect(loadingBar).toHaveLength(1);
  });
});
