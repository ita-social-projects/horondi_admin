import React from 'react';
import PropTypes from 'prop-types';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as reactRedux from 'react-redux';
import ContactsForm from '../index';
import { config } from '../../../../configs';
import ImageUploadContainer from '../../../../containers/image-upload-container';
import { initialValues } from './contacts-form.variables';

configure({ adapter: new Adapter() });

const { GO_BACK_TITLE, SAVE_TITLE } = config.buttonTitles;

const mockSetFieldValue = jest.fn();
const mockSubmit = jest.fn();
const mockChange = jest.fn();
const mockBlur = jest.fn();
const mockContactSaveHandler = jest.fn();

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: () => ({
    values: {},
    handleSubmit: mockSubmit,
    handleChange: mockChange,
    touched: {
      cartLink: 'test',
      phoneNumber: '095769834',
      email: '123@gmail.com'
    },
    errors: { cartLink: 'error', phoneNumber: 'wrong', email: 'incorrect' },
    setFieldValue: mockSetFieldValue,
    handleBlur: mockBlur
  })
}));
jest.mock('../../../../hooks/form-dialog/use-unsaved-changes-handler');

const mockSetContactsImage = jest.fn();

jest.mock('../../../../utils/contacts-form', () => ({
  __esModule: true,
  setMapImageHandler: () => mockSetContactsImage(),
  setInputsContactHandler: (schedule, address) => [
    { label: schedule, name: 'schedule' },
    { label: address, name: 'address' }
  ]
}));

jest.spyOn(global, 'FileReader').mockImplementation(function () {
  this.readAsDataURL = jest.fn();
  this.onload = jest.fn();
});

describe('test СategoryForm', () => {
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  let wrapper;

  beforeEach(() => {
    useDispatchMock.mockImplementation(() => jest.fn());
    wrapper = mount(
      <ContactsForm
        contactSaveHandler={mockContactSaveHandler}
        initialValues={initialValues}
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
    useDispatchMock.mockClear();
  });

  it('Should render ContactsForm component', () => {
    expect(wrapper).toBeDefined();
  });

  it('Should render component form', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it(`Should render Go back button with '${GO_BACK_TITLE}' label`, () => {
    expect(wrapper.find('button').at(0).text()).toBe(GO_BACK_TITLE);
  });

  it(`Should render Save button with '${SAVE_TITLE}' label`, () => {
    expect(wrapper.find('button').at(1).text()).toBe(SAVE_TITLE);
  });

  it('Should handle uaSelectImageHandler', () => {
    wrapper.find(ImageUploadContainer).at(0).props().handler();
    expect(mockSetContactsImage).toHaveBeenCalled();
  });
  it('Should handle enSelectImageHandler', () => {
    wrapper.find(ImageUploadContainer).at(1).props().handler();
    expect(mockSetContactsImage).toHaveBeenCalledTimes(2);
  });
  it('should call preventDefault', () => {
    const event = { preventDefault: () => {} };
    jest.spyOn(event, 'preventDefault');
    wrapper.find('form').simulate('submit', event);
    expect(event.preventDefault).toBeCalled();
  });
});
