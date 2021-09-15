import React from 'react';
import * as reactRedux from 'react-redux';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act, fireEvent, render } from '@testing-library/react';
import ClosureForm from '../index';
import ImageUploadContainer from '../../../../containers/image-upload-container';

import { files, target } from './mockClosures';

configure({ adapter: new Adapter() });

const mockSetFieldValue = jest.fn();
const mockSubmit = jest.fn();
const mockChange = jest.fn();
const mockBlur = jest.fn();
const mockSetUpload = jest.fn();
const mockSetClosureImage = jest.fn();

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
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    block: () => () => null
  })
}));
jest.mock('../../../../utils/use-closures-handlers', () => ({
  __esModule: true,
  default: () => ({
    setUpload: mockSetUpload,
    setClosuresImage: mockSetClosureImage
  })
}));

jest.spyOn(global, 'FileReader').mockImplementation(function () {
  this.readAsDataURL = jest.fn();
  this.onload = jest.fn();
});

describe('closure form tests', () => {
  const mockUseSelector = jest.spyOn(reactRedux, 'useSelector');
  let spyOnUseDispatch;
  let component;

  beforeEach(() => {
    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');
    mockUseSelector.mockReturnValue({ exchangeRate: 27 });
    spyOnUseDispatch.mockImplementation(() => jest.fn());

    component = mount(<ClosureForm />);
  });
  afterEach(() => {
    component.unmount();
    spyOnUseDispatch.mockClear();
  });

  it('Should upload image', () => {
    const imageContainer = component.find(ImageUploadContainer);
    const handler = imageContainer.prop('handler');
    handler(files);
    expect(mockSetUpload).toHaveBeenCalledTimes(1);
    expect(mockSetUpload).toHaveBeenCalledWith(files[0]);
  });

  it('Should test FileReader ', () => {
    const reader = FileReader.mock.instances[0];
    reader.onload(target);
    expect(reader.readAsDataURL).toHaveBeenCalled();
    expect(reader.readAsDataURL).toHaveBeenCalledWith(files[0]);
  });

  it('Should update checkboxes checked value on click', () => {
    const { getByRole } = render(<ClosureForm />);
    act(() => {
      fireEvent.click(getByRole('checkbox'));
    });
    expect(mockSetFieldValue).toHaveBeenCalled();
  });

  it('Should click onsubmit button', () => {
    const event = { preventDefault: () => {} };
    jest.spyOn(event, 'preventDefault');
    component.find('form').simulate('submit', event);
    expect(event.preventDefault).toBeCalled();
  });
});
