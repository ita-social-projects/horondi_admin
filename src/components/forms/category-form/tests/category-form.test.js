import React from 'react';
import PropTypes from 'prop-types';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as reactRedux from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import CategoryForm from '../index';
import { config } from '../../../../configs';
import { mockCategory, mockId, mockIsEdit } from './category-form.variables';

const { GO_BACK_TITLE, SAVE_TITLE } = config.buttonTitles;

configure({ adapter: new Adapter() });

const mockSetFieldValue = jest.fn();

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: () => ({
    values: {},
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
    touched: {},
    errors: {},
    setFieldValue: mockSetFieldValue,
    handleBlur: jest.fn()
  })
}));

describe('test СategoryForm', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
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
    useSelectorMock.mockClear();
  });

  it('Should render CategoryForm component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('form')).toHaveLength(1);
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

  it('Button click', () => {
    const { getAllByRole } = render(<CategoryForm />);
    const button = fireEvent.click(getAllByRole('button')[0]);
    expect(button).toBeTruthy();
  });

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
