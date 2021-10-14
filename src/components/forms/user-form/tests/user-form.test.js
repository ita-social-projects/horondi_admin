import React from 'react';
import * as reactRedux from 'react-redux';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TextField } from '@material-ui/core';

import UserForm from '../index';
import ImageUploadContainer from '../../../../containers/image-upload-container';
import { config } from '../../../../configs';
import { files, target } from './user.form.variables';
import { SaveButton } from '../../../buttons';
import FileReaderMock from '../../../../../__mocks__/fileReaderMock';

const mockSetFieldValue = jest.fn();
const mockSubmit = jest.fn();
const mockChange = jest.fn();
const mockBlur = jest.fn();
const mockSetUpload = jest.fn();
const mockSetUserImage = jest.fn();

const { GO_BACK_TITLE, SAVE_TITLE } = config.buttonTitles;

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: () => ({
    values: {},
    handleSubmit: mockSubmit,
    handleChange: mockChange,
    touched: {
      userFirstName: 'a',
      userLastName: 'a',
      email: 'aaaa',
      phoneNumber: '3650',
      country: '12',
      region: '12',
      city: '12',
      street: '12',
      buildingNumber: 'aaaa',
      appartment: 'aaaa',
      zipcode: '12'
    },
    errors: {
      userFirstName: 'a',
      userLastName: 'a',
      email: 'aaaa',
      phoneNumber: '3650',
      country: '12',
      region: '12',
      city: '12',
      street: '12',
      buildingNumber: 'aaaa',
      appartment: 'aaaa',
      zipcode: '12'
    },
    setFieldValue: mockSetFieldValue,
    handleBlur: mockBlur
  })
}));
jest.mock('../../../../hooks/form-dialog/use-unsaved-changes-handler');
jest.mock('../../../../utils/use-user-handlers', () => ({
  __esModule: true,
  default: () => ({
    setUpload: mockSetUpload,
    setUserImage: mockSetUserImage
  })
}));

const fileReader = new FileReaderMock();
jest.spyOn(window, 'FileReader').mockImplementation(() => fileReader);

describe('User form tests', () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let component;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');

    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');

    spyOnUseDispatch.mockImplementation(() => jest.fn());
    component = mount(<UserForm />);
  });
  afterEach(() => {
    component.unmount();
    spyOnUseSelector.mockClear();
    spyOnUseDispatch.mockClear();
  });

  it('should render form component', () => {
    expect(component.find('form').length).toBe(1);
  });

  it('should call preventDefault method', () => {
    const event = {
      preventDefault: () => {}
    };
    jest.spyOn(event, 'preventDefault');
    component.find('form').at(0).simulate('submit', event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('Should render 11 components of TextField type', () => {
    expect(component.find(TextField)).toHaveLength(11);
  });

  it('should render ImageUploadContainer component', () => {
    const wrapper = component.find(ImageUploadContainer);
    expect(wrapper).toHaveLength(1);
  });

  it(`Should render go-back button with '${GO_BACK_TITLE}' label`, () => {
    expect(component.find('button').at(0).text()).toBe(GO_BACK_TITLE);
  });
  it(`Should render save button with '${SAVE_TITLE}' label`, () => {
    expect(component.find('button').at(1).text()).toBe(SAVE_TITLE);
  });

  it('Should upload image', () => {
    const imageContainer = component.find(ImageUploadContainer);
    const handler = imageContainer.prop('handler');
    handler(files);
    expect(mockSetUpload).toHaveBeenCalledTimes(1);
    expect(mockSetUpload).toHaveBeenCalledWith(files[0]);
  });

  it('Should test FileReader ', () => {
    fileReader.result = 'file content';
    const imageContainer = component.find(ImageUploadContainer);
    const handler = imageContainer.prop('handler');
    handler(files);

    fileReader.onload(target);
    expect(fileReader.readAsDataURL).toHaveBeenCalled();
    expect(fileReader.readAsDataURL).toHaveBeenCalledWith(files[0]);
  });
  it('Should simulate submit button', () => {
    component.find(SaveButton).prop('onClickHandler')();
    expect(mockSubmit).toHaveBeenCalled();
  });
});
