import React from 'react';
import * as redux from 'react-redux';

import { SaveButton } from '../../../buttons';
import DeleteButton from '../../../buttons/delete-button';
import SizeForm from '../index';
import { sizeList, id, size } from './size-form.variables';
import { sizeDefaultProps } from '../../../../utils/size-helpers';

jest.mock('../../../../hooks/form-dialog/use-unsaved-changes-handler');

const mockSetFieldValue = jest.fn();
const mockSubmit = jest.fn();

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: () => ({
    values: { additionalPriceType: 'ABSOLUTE' },
    handleSubmit: mockSubmit,
    handleChange: jest.fn(),
    touched: {},
    errors: {},
    setFieldValue: mockSetFieldValue
  })
}));

describe('Size form tests', () => {
  const mockUseDispatch = jest.spyOn(redux, 'useDispatch');
  const mockUseSelector = jest.spyOn(redux, 'useSelector');
  let wrapper;

  beforeEach(() => {
    mockUseDispatch.mockImplementation(() => jest.fn());
    mockUseSelector.mockReturnValue({ loading: false, list: sizeList });
    wrapper = shallow(<SizeForm />);
  });

  afterEach(() => {
    wrapper.unmount();
    mockUseDispatch.mockClear();
    mockUseSelector.mockClear();
  });

  it('Should render a SaveButton component', () => {
    expect(wrapper.exists(SaveButton)).toBe(true);
  });

  it("Should render a DeleteButton component if in 'edit' mode", () => {
    wrapper = shallow(<SizeForm isEdit />);
    expect(wrapper.exists(DeleteButton)).toBe(true);
  });

  it('Checkbox', () => {
    wrapper = mount(<SizeForm />);
    const checkbox = wrapper.find('label input[type="checkbox"]');
    checkbox.props().onChange({ target: { checked: true } });
    expect(mockSetFieldValue).toHaveBeenCalledTimes(1);
  });

  it('Should have default props', () => {
    expect(SizeForm.defaultProps).toBeDefined();
    expect(SizeForm.defaultProps.id).toBe(sizeDefaultProps.id);
    expect(SizeForm.defaultProps.size).toEqual(sizeDefaultProps.size);
  });

  it('Should have props', () => {
    wrapper = mount(<SizeForm />);
    expect(wrapper.props().id).toBe(sizeDefaultProps.id);
    expect(wrapper.props().size).toEqual(sizeDefaultProps.size);
    wrapper = mount(<SizeForm id={id} size={size} />);

    expect(wrapper.props().id).toBe(id);
    expect(wrapper.props().size).toEqual(size);
  });
});
