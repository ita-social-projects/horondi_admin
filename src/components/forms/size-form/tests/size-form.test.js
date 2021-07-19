import React from 'react';
import { configure, mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as redux from 'react-redux';
import { MenuItem } from '@material-ui/core';
import LanguagePanel from '../../language-panel';
import { BackButton, SaveButton } from '../../../buttons';
import LoadingBar from '../../../loading-bar';
import SizeForm from '../index';
import { defaultProps, id, size, sizeList } from './size-form.variables';

configure({ adapter: new Adapter() });

// jest.mock('../../../../utils/use-material-handlers', () => ({
//   __esModule: true,
//   default: () => ({
//     createMaterial: mockSubmitSize
//   })
// }));

const mockSubmitSize = jest.fn();
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
    wrapper = shallow(<SizeForm id={id} size={size} />);
  });

  afterEach(() => {
    wrapper.unmount();
    mockUseDispatch.mockClear();
    mockUseSelector.mockClear();
    mockSetFieldValue.mockClear();
  });

  it('Should render LoadingBar', () => {
    mockUseSelector.mockReturnValue({ loading: true });
    wrapper = shallow(<SizeForm id={id} size={size} />);
    expect(wrapper.exists(LoadingBar)).toBe(true);
  });

  it('Should render component size form', () => {
    expect(wrapper.exists('form')).toBe(true);
  });

  it('Should render BackButton and SaveButton components', () => {
    expect(wrapper.exists(BackButton)).toBe(true);
    expect(wrapper.exists(SaveButton)).toBe(true);
  });

  it('Should simulate submit event', () => {
    const preventDefault = () => {};
    const mockedEvent = { preventDefault };
    wrapper.find('form').props().onSubmit(mockedEvent);
    expect(mockSubmit).toHaveBeenCalledTimes(0);
  });

  it('Should render unique Model', () => {
    expect(wrapper.find('#modelId').find(MenuItem).length).toBe(2);
  });

  it('Should simulate onchange click event on Select', () => {
    expect(mockSetFieldValue).toHaveBeenCalledTimes(0);

    wrapper
      .find('#modelId')
      .props()
      .onChange({ target: { value: 'Гаманець шкіряний з гобеленом' } });

    expect(mockSetFieldValue).toHaveBeenCalledTimes(1);

    wrapper
      .find('#name')
      .props()
      .onChange({ target: { value: 'XXL' } });
    expect(mockSetFieldValue).toHaveBeenCalledTimes(2);
  });

  it('Checkbox', () => {
    wrapper = mount(<SizeForm id={id} size={size} />);

    expect(mockSetFieldValue).toHaveBeenCalledTimes(0);

    wrapper
      .find('input[type="checkbox"]')
      .props()
      .onChange({ target: { checked: true } });

    expect(mockSetFieldValue).toHaveBeenCalledTimes(1);
  });
});
