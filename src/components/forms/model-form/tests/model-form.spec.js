import React from 'react';
import * as redux from 'react-redux';
import { Paper, TextField, Select, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LanguagePanel from '../../language-panel';
import ImageUploadContainer from '../../../../containers/image-upload-container';
import { BackButton, SaveButton } from '../../../buttons';
import FileReaderMock from '../../../../../__mocks__/fileReaderMock';

import ModelForm from '../index';
import {
  mockId,
  mockIsEdit,
  mockModel,
  mockValues,
  Sizes,
  Categories,
  Table,
  mockTouched,
  mockErrors,
  files,
  target
} from './model-form.variables';

React.useLayoutEffect = React.useEffect;

const mockHandleSubmit = jest.fn();
const mockSetFieldValue = jest.fn();
const mockHandleChange = jest.fn();
const mockHandleBlur = jest.fn();

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: () => ({
    values: mockValues,
    handleSubmit: mockHandleSubmit,
    handleChange: mockHandleChange,
    handleBlur: mockHandleBlur,
    touched: mockTouched,
    errors: mockErrors,
    setFieldValue: mockSetFieldValue
  })
}));
jest.mock('../../../../hooks/form-dialog/use-unsaved-changes-handler');

const mockCreateModel = jest.fn();
const mockSetUpload = jest.fn();
const mockSetModelImage = jest.fn();

jest.mock('../../../../utils/use-model-handlers', () => ({
  __esModule: true,
  default: () => ({
    createModel: mockCreateModel,
    setUpload: mockSetUpload,
    upload: '',
    modelImage: '',
    setModelImage: mockSetModelImage
  })
}));

const fileReader = new FileReaderMock();
jest.spyOn(window, 'FileReader').mockImplementation(() => fileReader);

describe('Model-form tests', () => {
  const mockUseDispatch = jest.spyOn(redux, 'useDispatch');
  const mockUseEffect = jest.spyOn(React, 'useEffect');
  const mockUseSelector = jest.spyOn(redux, 'useSelector');

  let wrapper;

  beforeEach(() => {
    mockUseDispatch.mockImplementation(() => jest.fn());
    mockUseEffect.mockImplementation(() => jest.fn());
    mockUseSelector.mockImplementation((f) => f({ Sizes, Categories, Table }));

    wrapper = shallow(
      <ModelForm model={mockModel} id={mockId} isEdit={mockIsEdit} />
    );
  });

  afterEach(() => {
    wrapper.unmount();

    mockUseDispatch.mockClear();
    mockUseEffect.mockClear();
    mockUseSelector.mockClear();
  });

  it('should render Model-Form component', () => {
    expect(wrapper).toBeDefined();
  });

  it('Should render component form', () => {
    expect(wrapper.exists('form')).toBe(true);
  });

  it(' should call useEffect two times', () => {
    expect(mockUseEffect).toHaveBeenCalledTimes(2);
  });

  it(' should call useSelector twice', () => {
    expect(mockUseSelector).toHaveBeenCalledTimes(2);
  });

  it(' should call useDispatch once', () => {
    expect(mockUseDispatch).toHaveBeenCalledTimes(1);
  });

  it('should find buttons', () => {
    expect(wrapper.find(BackButton)).toHaveLength(1);
    expect(wrapper.find(SaveButton)).toHaveLength(1);
  });

  it('should find checkboxes', () => {
    expect(wrapper.find('CheckboxOptions')).toHaveLength(2);
  });

  it('should find Paper component', () => {
    const wrap = wrapper.find(Paper);
    expect(wrap).toBeDefined();
  });

  it('should find TextField', () => {
    expect(wrapper.find(TextField)).toHaveLength(1);
  });

  it('should find 2 Language panels', () => {
    expect(wrapper.find(LanguagePanel)).toHaveLength(2);
  });

  it('should find Image Container', () => {
    expect(wrapper.find(ImageUploadContainer)).toHaveLength(1);
  });

  it('should simulate change event', () => {
    wrapper.find(TextField).at(0).simulate('change');
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });

  it('Should simulate blur event', () => {
    wrapper.find(LanguagePanel).at(0).simulate('blur');
    expect(mockHandleBlur).toHaveBeenCalledTimes(1);
  });

  it('Should simulate submit button', () => {
    wrapper.find(SaveButton).prop('onClickHandler')();
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('should call preventDefault', () => {
    const event = { preventDefault: () => {} };
    jest.spyOn(event, 'preventDefault');
    wrapper.find('form').simulate('submit', event);
    expect(event.preventDefault).toBeCalled();
  });

  it('should call setFieldValue select', () => {
    wrapper
      .find(Select)
      .simulate('change', { target: { value: 'accessories' } });
    expect(mockSetFieldValue).toHaveBeenCalledWith('category', 'accessories');
  });

  it('should call setFieldValue for Autocomplete', () => {
    const list = Sizes.list.map((size) => size._id);
    wrapper.find(Autocomplete).simulate('change', {}, Sizes.list);
    expect(mockSetFieldValue).toHaveBeenCalledWith('sizes', list);
  });

  it('should call setFieldValue for first checkbox', () => {
    wrapper.find('CheckboxOptions').at(0).props().options[0].handler();
    expect(mockSetFieldValue).toHaveBeenCalledWith('show', false);
  });

  it('should call setFieldValue for second checkbox', () => {
    wrapper.find('CheckboxOptions').at(1).props().options[0].handler();
    expect(mockSetFieldValue).toHaveBeenCalledWith(
      'availableForConstructor',
      true
    );
  });

  it('Should upload image', () => {
    fileReader.result = 'file content';
    const imageContainer = wrapper.find(ImageUploadContainer);
    const handler = imageContainer.prop('handler');
    handler(files);

    fileReader.onload(target);
    expect(fileReader.readAsDataURL).toHaveBeenCalled();
    expect(fileReader.readAsDataURL).toHaveBeenCalledWith(files[0]);
  });

  it('should coverage getOptionLabel in Autocomplete', () => {
    const label = wrapper.find(Autocomplete).props();
    label.getOptionLabel(Sizes.list[0]);
    expect(label).toBeDefined();
  });

  it('should coverage renderInput in AutoComplete', () => {
    const label = wrapper.find(Autocomplete).props();
    label.renderInput(Sizes.list[0]);
    expect(label).toBeDefined();
  });

  it('expect braches', () => {
    const br = shallow(<ModelForm id={mockId} isEdit={false} />);
    expect(br).toBeDefined();
  });
});
