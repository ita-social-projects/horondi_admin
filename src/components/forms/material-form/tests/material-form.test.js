import React from 'react';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as redux from 'react-redux';
import MaterialForm from '../index';

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
    setFieldValue: mockSetFieldValue
  })
}));

describe('Material form tests', () => {
  const mockUseDispatch = jest.spyOn(redux, 'useDispatch');
  const mockUseSelector = jest.spyOn(redux, 'useSelector');
  let wrapper;
  beforeEach(() => {
    mockUseDispatch.mockImplementation(() => jest.fn());
    // mockUseSelector.mockImplementation(() => false);
    wrapper = mount(<MaterialForm />);
  });
  afterEach(() => {
    wrapper.unmount();
    mockUseDispatch.mockClear();
    // mockUseSelector.mockClear();
  });
  it('Should render component form', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });
});
