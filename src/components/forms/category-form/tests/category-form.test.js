import React from 'react';
import PropTypes from 'prop-types';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as reactRedux from 'react-redux';
import CategoryForm from '../index';
import ImageUploadContainer from '../../../../containers/image-upload-container';
import { config } from '../../../../configs';
import { mockCategory, mockId, mockIsEdit } from './category-form.variables';

configure({ adapter: new Adapter() });

const { GO_BACK_TITLE, SAVE_TITLE } = config.buttonTitles;

const mockSetFieldValue = jest.fn();
const mockSubmit = jest.fn();
const mockChange = jest.fn();
const mockBlur = jest.fn();

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

describe('test СategoryForm', () => {
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  let wrapper;

  beforeEach(() => {
    useDispatchMock.mockImplementation(() => jest.fn());
    wrapper = mount(
      <CategoryForm category={mockCategory} id={mockId} edit={mockIsEdit} />
    );
  });

  afterEach(() => {
    wrapper.unmount();
    useDispatchMock.mockClear();
  });

  it('Should render CategoryForm component', () => {
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

  it('Should render two  buttons and two inputs', () => {
    expect(wrapper.find('input')).toHaveLength(2);
    expect(wrapper.find('button')).toHaveLength(2);
  });

  it('Should simulate change event', () => {
    wrapper.find('input').at(1).simulate('change');
    expect(mockChange).toHaveBeenCalledTimes(1);
  });

  it('Should simulate blur event', () => {
    wrapper.find('input').at(1).simulate('blur');
    expect(mockBlur.mock.calls.length).toBe(1);
  });

  it('Should simulate form submit', () => {
    wrapper.find('form').simulate('submit');
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  it('Should simulate submit button', () => {
    wrapper.find('button').at(1).simulate('click');
    expect(mockChange.mock.calls.length).toEqual(1);
  });

  it('Should simulate back button', () => {
    wrapper.find('button').at(0).simulate('click');
    expect(mockChange).toHaveBeenCalledTimes(1);
  });

  it('should render ImageUploadContainer component', () => {
    const wrap = wrapper.find(ImageUploadContainer);
    expect(wrap.exists(ImageUploadContainer)).toBeDefined();
    expect(wrap.exists(ImageUploadContainer)).toBe(true);
  });

  // it('should call onChange prop', () => {
  //     const event = {
  //         preventDefault() {
  //         },
  //         target: {value: 'the-value'}
  //     };
  //     wrapper.find(ImageUploadContainer).prop('handler');
  //     expect(handler).toHaveBeenCalledTimes(1);
  // });

  // it('should call handleImageLoad', () => {
  //     const event = {
  //         preventDefault() {
  //         },
  //         target: {value: 'the-value'}
  //     };
  //     wrapper.find(ImageUploadContainer).find('input').props().onChange(event);;
  //     expect(handleImageLoad).toHaveBeenCalledTimes(1);
  // });

  it('Should have appropriate prop types', () => {
    expect(CategoryForm.propTypes.id).toBe(PropTypes.string);
    expect(CategoryForm.propTypes.edit).toBe(PropTypes.bool);
  });

  it('Should have default props', () => {
    expect(CategoryForm.defaultProps).toBeDefined();
    expect(CategoryForm.defaultProps.id).toBe('');
    expect(CategoryForm.defaultProps.values).toEqual({});
    expect(CategoryForm.defaultProps.errors).toEqual({});
    expect(CategoryForm.defaultProps.touched).toEqual({});
    expect(CategoryForm.defaultProps.category._id).toBe('');
    expect(CategoryForm.defaultProps.edit).toBeFalsy();
    expect(CategoryForm.defaultProps.category.code).toBe('');
  });
});
