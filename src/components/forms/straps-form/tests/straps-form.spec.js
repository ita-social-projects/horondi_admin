import React from 'react';
import * as reactRedux from 'react-redux';
import { act, fireEvent, render } from '@testing-library/react';
import ImageUploadContainer from '../../../../containers/image-upload-container';
import FileReaderMock from '../../../../../__mocks__/fileReaderMock';

import {
  files,
  target,
  mockColor,
  Straps,
  mockColorsWithData
} from './straps.form.variables';
import StrapsForm from '../index';
import { SaveButton } from '../../../buttons';

const mockSetFieldValue = jest.fn();
const mockSubmit = jest.fn();
const mockChange = jest.fn();
const mockBlur = jest.fn();
const mockSetUpload = jest.fn();
const mockSetStrapsImage = jest.fn();

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: () => ({
    values: {},
    handleSubmit: mockSubmit,
    handleChange: mockChange,
    touched: {
      labelIdAut: true,
      code: true,
      additionalPrice: true
    },
    errors: { code: true, positions: 'true', additionalPrice: 'true' },
    setFieldValue: mockSetFieldValue,
    handleBlur: mockBlur
  })
}));

jest.mock('../../../../utils/use-straps-handlers', () => ({
  __esModule: true,
  default: () => ({
    setUpload: mockSetUpload,
    setStrapImage: mockSetStrapsImage
  })
}));

jest.mock('../../../../hooks/form-dialog/use-unsaved-changes-handler');

const fileReader = new FileReaderMock();
jest.spyOn(window, 'FileReader').mockImplementation(() => fileReader);

describe('Straps form tests', () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let component;

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => mockColor);
    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');
    spyOnUseDispatch.mockImplementation(() => jest.fn());

    component = mount(<StrapsForm />);
  });
  afterEach(() => {
    component.unmount();

    spyOnUseDispatch.mockClear();
    spyOnUseSelector.mockClear();
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

  it('Should update checkboxes checked value on click', () => {
    const { getByRole } = render(<StrapsForm />);

    act(() => {
      fireEvent.click(getByRole('checkbox'));
    });

    expect(mockSetFieldValue).toHaveBeenCalled();
  });

  it('Should simulate submit button', () => {
    component.find(SaveButton).prop('onClickHandler')();
    expect(mockSubmit).toHaveBeenCalled();
  });

  it('Should update checkboxes checked value on click', () => {
    const { getByRole } = render(<StrapsForm />);

    act(() => {
      fireEvent.click(getByRole('checkbox'));
    });

    expect(mockSetFieldValue).toHaveBeenCalled();
  });

  it('Should click onsubmit button', () => {
    const event = {
      preventDefault: () => {}
    };

    jest.spyOn(event, 'preventDefault');

    component.find('form').simulate('submit', event);

    expect(event.preventDefault).toBeCalled();
  });

  it('Should coverage availableColors', () => {
    jest
      .spyOn(reactRedux, 'useSelector')
      .mockImplementation(() => mockColorsWithData);
    jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => jest.fn());

    component = mount(<StrapsForm />);

    expect(component).toBeDefined();
  });
});
