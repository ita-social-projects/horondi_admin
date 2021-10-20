import React from 'react';
import * as reactRedux from 'react-redux';
import { Button } from '@material-ui/core';
import ProductForm from '../product-form';
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

describe('Product-form tests', () => {
  let component;
  let spyOnUseSelector;
  let spyOnUseDispatch;
  const Theme = {
    darkMode: true
  };
  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation((fn) => fn({ Products, Theme }));

    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');
    spyOnUseDispatch.mockImplementation(() => jest.fn());

    component = shallow(<ProductForm isEdit />);
  });

  afterEach(() => {
    component.unmount();
    spyOnUseDispatch.mockClear();
    spyOnUseDispatch.mockClear();
  });

  it('#1 Render the component', () => {
    expect(component.exists(ProductAddImages)).toBe(true);
  });

  it('#2 Render the component', () => {
    const checkboxes = component.find(CheckboxOptions);
    checkboxes.props().options[0].handler();
    checkboxes.props().options[1].handler();
    expect(mockSetFieldValue).toHaveBeenCalledTimes(2);
  });

  it('#3 should submit the form', async () => {
    const submit = component.find(Button);
    submit.simulate('click');
    expect(await spyOnUseDispatch).toHaveBeenCalledTimes(8);
  });
});
