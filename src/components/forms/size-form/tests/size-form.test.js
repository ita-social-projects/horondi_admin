import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as redux from 'react-redux';
import { MenuItem } from '@material-ui/core';

import { BackButton, SaveButton } from '../../../buttons';
import LoadingBar from '../../../loading-bar';
import SizeForm from '../index';
import { sizeList, id, size } from './size-form.variables';
import { config } from '../../../../configs';
import { sizeDefaultProps } from '../../../../utils/size-helpers';

configure({ adapter: new Adapter() });

const labels = config.labels.sizeLabels;

const mockAddSize = jest.fn();
const mockUpdateSize = jest.fn();

jest.mock('../../../../redux/sizes/sizes.actions', () => ({
  __esModule: true,
  default: () => ({
    addSize: mockAddSize,
    updateSize: mockUpdateSize
  })
}));
jest.mock('../../../../hooks/form-dialog/use-unsaved-changes-handler');

const mockSetFieldValue = jest.fn();
const mockSubmit = jest.fn();

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useFormik: () => ({
    values: {},
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
    mockUseSelector.mockReturnValue({ loading: false, sizesList: sizeList });
    wrapper = shallow(<SizeForm />);
  });

  afterEach(() => {
    wrapper.unmount();
    mockUseDispatch.mockClear();
    mockUseSelector.mockClear();
  });

  it('Should render LoadingBar', () => {
    mockUseSelector.mockReturnValue({ loading: true });
    wrapper = shallow(<SizeForm />);
    expect(wrapper.exists(LoadingBar)).toBe(true);
  });

  it('Should render BackButton and SaveButton components', () => {
    expect(wrapper.exists(BackButton)).toBe(true);
    expect(wrapper.exists(SaveButton)).toBe(true);
  });

  it('Should render unique Model', () => {
    expect(wrapper.find('#modelId').find(MenuItem).length).toBe(2);
  });

  it('Should simulate onchange click event on Select', () => {
    const selectValue = 'Гаманець шкіряний з гобеленом';

    wrapper
      .find('#modelId')
      .props()
      .onChange({
        target: {
          value: selectValue,
          name: labels.en.modelName
        }
      });

    expect(mockSetFieldValue).toHaveBeenCalledTimes(1);

    const sizeValue = 'XXL';

    wrapper
      .find('#name')
      .props()
      .onChange({ target: { value: sizeValue, name: labels.en.name } });

    expect(mockSetFieldValue).toHaveBeenCalledTimes(2);
  });

  it('Checkbox', () => {
    wrapper = mount(<SizeForm />);
    const checkbox = wrapper.find('label input[type="checkbox"]');
    checkbox.props().onChange({ target: { checked: true } });
    expect(mockSetFieldValue).toHaveBeenCalledTimes(3);
  });

  it('Should simulate onsubmit on Form', () => {
    const preventDefault = () => {};
    const mockedEvent = { preventDefault };
    wrapper.find('form').props().onSubmit(mockedEvent);
    expect(mockSubmit).toHaveBeenCalledTimes(0);
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
