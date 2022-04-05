import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from '../product-form';
import { SaveButton } from '../../../buttons';
import { Products } from './product-form.variables';
import ProductAddImages from '../../../../pages/products/product-add/product-add-images';
import CheckboxOptions from '../../../checkbox-options';

const mockSetFieldValue = jest.fn();

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: () => ({
    values: { innerMaterial: 'ssds' },
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
    touched: {},
    errors: {},
    setFieldValue: mockSetFieldValue,
    handleBlur: jest.fn()
  })
}));

jest.mock('react-redux');
jest.mock('connected-react-router', () => ({
  __esModule: true,
  push: jest.fn()
}));

const Theme = {
  darkMode: true
};

useSelector.mockImplementation((fn) => fn({ Products, Theme }));

describe('Product-form tests', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ProductForm isEdit />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('#1 Render the component', () => {
    expect(component.exists(ProductAddImages)).toBe(true);
  });

  it('#2 Find checkboxes options', () => {
    const checkboxes = component.find(CheckboxOptions);
    checkboxes.props().options[0].handler();
    checkboxes.props().options[1].handler();
    expect(mockSetFieldValue).toHaveBeenCalledTimes(2);
  });

  it('#3 should render submit button', () => {
    expect(component.exists(SaveButton)).toBe(true);
  });
});
