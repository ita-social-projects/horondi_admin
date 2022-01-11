import React from 'react';
import * as reactRedux from 'react-redux';
import { Paper, Grid } from '@material-ui/core';
import LoadingBar from '../../../loading-bar';
import BasicsForm from '../index';
import ImageUploadContainer from '../../../../containers/image-upload-container';
import MaterialsContainer from '../../../../containers/materials-container';
import CheckboxOptions from '../../../checkbox-options';
import { config } from '../../../../configs';
import { mockMaterial, files, target } from './basics-form.variables';
import FileReaderMock from '../../../../../__mocks__/fileReaderMock';

const mockSetFieldValue = jest.fn();
const mockSubmit = jest.fn();
const mockChange = jest.fn();
const mockBlur = jest.fn();
const mockSetUpload = jest.fn();
const mockSetBasicImage = jest.fn();

const { GO_BACK_TITLE, SAVE_TITLE } = config.buttonTitles;

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: () => ({
    values: {},
    handleSubmit: mockSubmit,
    handleChange: mockChange,
    touched: {
      basicImage: 'image',
      additionalPrice: 1
    },
    errors: {
      basicImage: 'image',
      additionalPrice: 1
    },
    setFieldValue: mockSetFieldValue,
    handleBlur: mockBlur
  })
}));
jest.mock('../../../../hooks/form-dialog/use-unsaved-changes-handler');
jest.mock('../../../../utils/use-basics-handlers', () => ({
  __esModule: true,
  default: () => ({
    setUpload: mockSetUpload,
    setBasicImage: mockSetBasicImage
  })
}));

const fileReader = new FileReaderMock();
jest.spyOn(window, 'FileReader').mockImplementation(() => fileReader);

describe('Basics form tests', () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let component;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => mockMaterial);

    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');

    spyOnUseDispatch.mockImplementation(() => jest.fn());
    component = mount(<BasicsForm />);
  });
  afterEach(() => {
    component.unmount();
    spyOnUseSelector.mockClear();
    spyOnUseDispatch.mockClear();
  });

  it('should render form component', () => {
    expect(component.find('form').length).toBe(2);
  });

  it('should call preventDefault method', () => {
    const event = {
      preventDefault: () => {}
    };
    jest.spyOn(event, 'preventDefault');
    component.find('form').at(0).simulate('submit', event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should render CheckboxOptions component', () => {
    const wrapper = component.find(CheckboxOptions);
    expect(wrapper).toHaveLength(1);
  });

  it('should render MaterialsContainer component', () => {
    const wrapper = component.find(MaterialsContainer);
    expect(wrapper).toHaveLength(1);
  });

  it('Should render 2 buttons and 6 inputs', () => {
    expect(component.find('input')).toHaveLength(6);
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
  });

  it('should render Paper component', () => {
    const wrapper = component.find(Paper);
    expect(wrapper.exists(Paper)).toBeDefined();
  });

  it('should render ImageUploadPreviewContainer component', () => {
    const wrapper = component.find(ImageUploadContainer);
    expect(wrapper.exists(ImageUploadContainer)).toBeDefined();
  });

  it('Should upload image', () => {
    const imageContainer = component.find(ImageUploadContainer);
    const handler = imageContainer.prop('handler');
    handler(files);
    expect(mockSetUpload).toHaveBeenCalledTimes(1);
    expect(mockSetUpload).toHaveBeenCalledWith(files[0]);
  });

  it('Should test FileReader ', async () => {
    fileReader.result = 'file content';
    const imageContainer = component.find(ImageUploadContainer);
    const handler = imageContainer.prop('handler');
    handler(files);

    fileReader.onload(target);
    expect(fileReader.readAsDataURL).toHaveBeenCalled();
    expect(fileReader.readAsDataURL).toHaveBeenCalledWith(files[0]);
  });

  it('should call setFieldValue for checkbox', () => {
    component.find('CheckboxOptions').props().options[0].handler();
    expect(mockSetFieldValue).toHaveBeenCalledWith('available', true);
  });

  it('Loading bar should be visible', () => {
    mockMaterial.loading = true;
    component = mount(<BasicsForm />);
    const loadingBar = component.find(LoadingBar);
    expect(loadingBar).toBeDefined();
  });
});
