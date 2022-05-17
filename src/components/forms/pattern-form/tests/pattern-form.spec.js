import React from 'react';
import * as redux from 'react-redux';
import { mount, shallow } from 'enzyme';
import PatternForm from '../index';
import {
  mockPattern,
  mockMaterials,
  mockList,
  mockIsEdit
} from './pattern-form.variables';

const mockSetFieldValue = jest.fn();
const mockSubmit = jest.fn();
const mockChange = jest.fn();
const mockBlur = jest.fn();
const mockUseDispatchFn = jest.fn();

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: () => ({
    values: { additionalPriceType: 'ABSOLUTE' },
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
    mockUseSelector.mockImplementation(() => ({
      materialsByPurpose: mockMaterials,
      list: mockList
    }));

    component = mount(
      <PatternForm
        pattern={mockPattern}
        id={mockPattern._id}
        isEdit={mockIsEdit}
      />
    );
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
    const wrapper = shallow(<PatternForm />);
    wrapper.find({ 'data-testid': 'saveButton' }).simulate('click');

    expect(mockUseDispatchFn).toHaveBeenCalledTimes(3);
  });

  it('Should render 10 inputs', () => {
    expect(component.find('input')).toHaveLength(10);
  });

  it('should call setFieldValue for checkbox', () => {
    component.find('CheckboxOptions').props().options[1].handler();

    expect(mockSetFieldValue).toHaveBeenCalledWith('available', true);
  });
});
