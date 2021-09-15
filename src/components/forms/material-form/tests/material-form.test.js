import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as redux from 'react-redux';
import Select from '@material-ui/core/Select';
import LanguagePanel from '../../language-panel';
import { BackButton, SaveButton } from '../../../buttons';
import LoadingBar from '../../../loading-bar';
import MaterialForm from '../index';
import { id, material, defaultProps } from './material-form.variables';

configure({ adapter: new Adapter() });

const mockCreateMaterial = jest.fn();

jest.mock('../../../../utils/use-material-handlers', () => ({
  __esModule: true,
  default: () => ({
    createMaterial: mockCreateMaterial
  })
}));
jest.mock('../../../../hooks/form-dialog/use-unsaved-changes-handler');
jest.mock('../../../../hooks/forms/use-changed-values-checker', () => ({
  __esModule: true,
  default: () => true
}));

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

describe('Material form tests', () => {
  const mockUseDispatch = jest.spyOn(redux, 'useDispatch');
  const mockUseSelector = jest.spyOn(redux, 'useSelector');
  let wrapper;

  beforeEach(() => {
    mockUseDispatch.mockImplementation(() => jest.fn());
    mockUseSelector.mockReturnValue({ loading: false });
    wrapper = shallow(<MaterialForm id={id} material={material} />);
  });

  afterEach(() => {
    wrapper.unmount();
    mockUseDispatch.mockClear();
    mockUseSelector.mockClear();
  });

  it('Should render LoadingBar', () => {
    mockUseSelector.mockReturnValue({ loading: true });
    wrapper = shallow(<MaterialForm id={id} material={material} />);
    expect(wrapper.exists(LoadingBar)).toBe(true);
  });

  it('Should render component form', () => {
    expect(wrapper.exists('form')).toBe(true);
  });

  it('Should render two LanguagePanel components', () => {
    expect(wrapper.find(LanguagePanel)).toHaveLength(2);
  });

  it('Should render BackButton and SaveButton components', () => {
    expect(wrapper.exists(BackButton)).toBe(true);
    expect(wrapper.exists(SaveButton)).toBe(true);
  });

  it('Should simulate click event on CheckboxOptions', () => {
    wrapper.find('CheckboxOptions').props().options[0].handler();
    expect(mockSetFieldValue).toHaveBeenCalledTimes(1);
  });

  it('Should simulate click event on ColorBar', () => {
    wrapper.find('ColorsBar').props().onColorChange(material.colors);
    expect(mockSetFieldValue).toHaveBeenCalledTimes(2);
  });

  it('Should simulate onchange click event on Select', () => {
    wrapper
      .find(Select)
      .props()
      .onChange({ target: { value: 'PATTERN' } });
    expect(mockSetFieldValue).toHaveBeenCalledTimes(3);
    expect(mockSetFieldValue).toHaveBeenNthCalledWith(3, 'purpose', 'PATTERN');
  });

  it('Should simulate submit event', () => {
    const preventDefault = () => {};
    const mockedEvent = { preventDefault };
    wrapper.find('form').props().onSubmit(mockedEvent);
    expect(mockSubmit).toHaveBeenCalledTimes(0);
  });

  it('Should have default props', () => {
    expect(MaterialForm.defaultProps).toBeDefined();
    expect(MaterialForm.defaultProps.id).toBe(defaultProps.id);
    expect(MaterialForm.defaultProps.values).toEqual(defaultProps.values);
    expect(MaterialForm.defaultProps.errors).toEqual(defaultProps.errors);
    expect(MaterialForm.defaultProps.touched).toEqual(defaultProps.touched);
    expect(MaterialForm.defaultProps.match).toEqual(defaultProps.match);
    expect(MaterialForm.defaultProps.material).toEqual(defaultProps.material);
  });
});
