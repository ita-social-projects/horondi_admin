import React from 'react';
import * as redux from 'react-redux';
import { mount } from 'enzyme';
import PositionForm from '../index';
import { mockPosition } from './position-form.variables';

const mockSetFieldValue = jest.fn();
const mockSubmit = jest.fn();
const mockChange = jest.fn();
const mockBlur = jest.fn();
const mockUseDispatchFn = jest.fn();

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: () => ({
    values: {},
    handleSubmit: mockSubmit,
    handleChange: mockChange,
    setFieldValue: mockSetFieldValue,
    handleBlur: mockBlur,
    touched: {},
    errors: {}
  })
}));

jest.mock('../../../../hooks/form-dialog/use-unsaved-changes-handler');

describe('Basics form tests', () => {
  const mockUseDispatch = jest.spyOn(redux, 'useDispatch');
  const mockUseSelector = jest.spyOn(redux, 'useSelector');
  let component;

  beforeEach(() => {
    mockUseDispatch.mockImplementation(() => mockUseDispatchFn);
    mockUseSelector.mockImplementation(() => mockPosition);

    component = mount(<PositionForm />);
  });
  afterEach(() => {
    mockUseSelector.mockClear();
    mockUseDispatch.mockClear();
  });

  it('Should simulate submit button', () => {
    component.find('SaveButton').prop('onClickHandler')();

    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  it('Should call DispatchFn', () => {
    component.find('button').at(1).props().onClick();

    expect(mockUseDispatchFn).toHaveBeenCalledTimes(1);
  });

  it('Should render input', () => {
    expect(component.find('input')).toHaveLength(1);
  });

  it('should call setFieldValue for checkbox', () => {
    component.find('CheckboxOptions').props().options[0].handler();

    expect(mockSetFieldValue).toHaveBeenCalledWith('available', true);
  });
});
